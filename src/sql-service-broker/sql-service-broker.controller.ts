import { decorate, injectable } from "inversify";
import "reflect-metadata";
import { EventEmitter } from "events";
import { LoggerService, ProductService } from "../services/services";
import { SqlServiceBrokerResponse } from "./sql-service-broker-response.model";
import { SqlServiceBrokerDatabaseService } from "./sql-service-broker.database-service";
import { InventoryTransfer } from "../models/models";
import * as Configurations from "../configurations/configurations.json";

// Decorator used to hide the error 'Missing required @injectable annotation in: EventEmitter'
decorate(injectable(), EventEmitter);

@injectable()
export class SqlServiceBrokerController extends EventEmitter {
  constructor(
    private loggerService: LoggerService,
    private sqlServiceBrokerDatabaseService: SqlServiceBrokerDatabaseService,
    private productService: ProductService
  ) {
    super();
  }

  private _inventoryTransferBrokerServiceIsActive: boolean;
  private _zeroBalanceBrokerServiceIsActive: boolean;

  public get inventoryTransferBrokerServiceIsActive(): boolean {
    return this._inventoryTransferBrokerServiceIsActive;
  }

  public set inventoryTransferBrokerServiceIsActive(value: boolean) {
    this._inventoryTransferBrokerServiceIsActive = value;
  }

  public get zeroBalanceBrokerServiceIsActive(): boolean {
    return this._zeroBalanceBrokerServiceIsActive;
  }

  public set zeroBalanceBrokerServiceIsActive(value: boolean) {
    this._zeroBalanceBrokerServiceIsActive = value;
  }

  /**
   * Start to listen the Sql Service Broker
   */
  public async startListeningInventoryTransferQueue(): Promise<void> {
    this.inventoryTransferBrokerServiceIsActive =
      Configurations.server.InventoryTransferBrokerServiceIsActive;
    this.loggerService.info(
      "Start listening Inventory Transfer Broker Service..."
    );
    while (this.inventoryTransferBrokerServiceIsActive) {
      try {
        const brokerMessage =
          await this.sqlServiceBrokerDatabaseService.getBrokerMessages(
            "Emilia_Inventory_Transfer_Receiver_Queue"
          );

        if (!brokerMessage) {
          this.loggerService.info(
            "No inventory transfer broker messages were found."
          );
          continue;
        }

        const brokerData: any = brokerMessage.recordset[0].message_body
          .toString()
          .split("|");

        const brokerResponse: SqlServiceBrokerResponse =
          this.createResponse(brokerMessage);

        brokerResponse.loginId = brokerData[0];
        const transferId: number = parseInt(brokerData[1]);

        const transfers: Array<InventoryTransfer> =
          await this.productService.getInventoryTransfer(transferId);
        // console.dir(transfers);

        if (!transfers || !transfers.length) {
          continue;
        }

        const inventoryTransfer: InventoryTransfer = transfers[0];

        inventoryTransfer.inventoryTransferDetail =
          (await this.productService.getInventoryTransferDetail(
            inventoryTransfer.id
          )) || [];

        brokerResponse.messageBody = JSON.stringify(inventoryTransfer);

        this.createUnprocessedBroadcast(brokerResponse);

        this.emit("SQL_BROKER_MESSAGE", brokerResponse);
      } catch (error) {
        this.loggerService.error(
          `Error getting inventory transfer broker messages. \r\n ${error.message}`
        );
        continue;
      }
    }
  }

  public async startListeningZeroBalanceQueue(): Promise<void> {
    this.zeroBalanceBrokerServiceIsActive =
      Configurations.server.ZeroBalanceBrokerServiceIsActive;
    this.loggerService.info("Start listening Zero Balance Broker Service...");
    while (this.zeroBalanceBrokerServiceIsActive) {
      try {
        const brokerMessage =
          await this.sqlServiceBrokerDatabaseService.getBrokerMessages(
            "Emilia_Zero_Balance_Receiver_Queue"
          );

        if (!brokerMessage) {
          this.loggerService.info(
            "No zero balance broker messages were found."
          );
          continue;
        }

        const brokerData: any =
          brokerMessage.recordset[0].message_body.toString();

        const brokerResponse: SqlServiceBrokerResponse =
          this.createResponse(brokerMessage);

        //const importDate: Date = new Date(brokerData);

        brokerResponse.messageBody = brokerData;

        this.createUnprocessedBroadcast(brokerResponse);

        this.emit("SQL_BROKER_MESSAGE", brokerResponse);
      } catch (error) {
        this.loggerService.error(
          `Error getting zero inventory broker messages. \r\n ${error.message}`
        );

        continue;
      }
    }
  }

  /**
   * Creates a unprocessed broadcast
   * @param brokerResponse The message published by Sql Service Broker
   */
  private async createUnprocessedBroadcast(
    brokerResponse: SqlServiceBrokerResponse
  ): Promise<void> {
    try {
      await this.sqlServiceBrokerDatabaseService.createUnprocessedBroadcast(
        brokerResponse
      );
    } catch (error) {
      this.loggerService.error(
        `Error creating unprocessed broadcast. \r\n${error.message}`
      );
    }
  }

  /**
   * Stop listening the Sql Service Broker
   */
  public stopListening() {
    this.loggerService.info("Stop listening Sql Service Broker...");
    this.inventoryTransferBrokerServiceIsActive = false;
    this.zeroBalanceBrokerServiceIsActive = false;
  }

  // -------------------------------------------------------
  //                PRIVATE METHODS
  // -------------------------------------------------------
  private createResponse(response: any): SqlServiceBrokerResponse {
    //console.dir("response", response);
    const singleResponse: any = response.recordset[0];
    //console.dir("singleResponse", singleResponse);
    const brokerResponse: SqlServiceBrokerResponse =
      new SqlServiceBrokerResponse();

    brokerResponse.conversationId = singleResponse.conversation_handle;
    brokerResponse.messageType = singleResponse.message_type_name;

    return brokerResponse;
  }
}
