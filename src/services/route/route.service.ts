import { injectable } from "inversify";
import "reflect-metadata";
import { DatabaseService } from "../database/database.service";

import * as xmlParser from "js2xmlparser";
import {
  RouteLiquidation,
  RouteValidation,
  ObjectParameter,
  ApplicationConfiguration,
  InventoryTransfer,
} from "../../models/models";

import * as Configurations from "../../configurations/configurations.json";
import { SqlServiceBrokerResponse } from "../../sql-service-broker/sql-service-broker-response.model";
import { Enums } from "../../utilities/utilities";

@injectable()
export class RouteService {
  constructor(private databaseService: DatabaseService) {}

  /**
   * Verify if the received seller are enabled to authenticate
   * @param sellerCode The seller that wants to start route
   */
  public async validateRoute(
    sellerCode: string
  ): Promise<Array<RouteValidation>> {
    const parameter: ObjectParameter = new ObjectParameter();
    parameter.name = "Seller_Code";
    parameter.value = sellerCode;

    return this.databaseService.executeDatabaseObject<RouteValidation>(
      `[${Configurations.database.databaseSchema}].[VerifyDocumentsPendingOfSynchronizationToErp]`,
      [parameter]
    );
  }

  /**
   * createRouteLiquidation
   */
  public async createRouteLiquidation(
    routeLiquidation: RouteLiquidation
  ): Promise<void> {
    const parameter: ObjectParameter = new ObjectParameter();
    parameter.name = "RouteLiquidation";
    parameter.value = xmlParser.parse("routeLiquidation", routeLiquidation);

    await this.databaseService.executeDatabaseObject<void>(
      `[${Configurations.database.databaseSchema}].[CreateRouteLiquidation]`,
      [parameter]
    );
  }

  /**
   * async getAppUpdateSettings
   */
  public async getAppUpdateSettings(): Promise<
    Array<ApplicationConfiguration>
  > {
    let configuration: Array<ApplicationConfiguration> =
      await this.databaseService.executeDatabaseObject<ApplicationConfiguration>(
        `[${Configurations.database.databaseSchema}].[GetAppUpdateSettings]`
      );

    return configuration;
  }

  /**
   * getUnprocessedBroadcastByLoginId
   */
  public async getUnprocessedBroadcastByLoginId(
    loginId: string
  ): Promise<Array<SqlServiceBrokerResponse>> {
    let params: Array<ObjectParameter> = [
      {
        name: "LoginId",
        value: loginId,
      } as ObjectParameter,
    ];

    let unprocessedBroadcasts: Array<SqlServiceBrokerResponse> =
      await this.databaseService.executeDatabaseObject<SqlServiceBrokerResponse>(
        `[${Configurations.database.databaseSchema}].[GetUnprocessedBroadcastByLoginId]`,
        params
      );

    return unprocessedBroadcasts;
  }

  /**
   * finalizeBroadcast
   */
  public async finalizeBroadcast(
    message: SqlServiceBrokerResponse
  ): Promise<void> {
    console.log("rd-finalizeBroadcast", message);
    let params: Array<ObjectParameter> = null;
    switch (message.messageType) {
      case Enums.Notification.ZeroBalance:
        params = [
          {
            name: "LoginId",
            value: message.loginId,
          } as ObjectParameter,
          {
            name: "ConversationID",
            value: message.conversationId,
          } as ObjectParameter,
          {
            name: "MessageType",
            value: message.messageType,
          } as ObjectParameter,
        ];
        break;
      case Enums.Notification.InventoryTransfer:
        params = [
          {
            name: "ConversationID",
            value: message.conversationId,
          } as ObjectParameter,
          {
            name: "MessageType",
            value: message.messageType,
          } as ObjectParameter,
        ];
        break;
    }

    await this.databaseService.executeDatabaseObject<ApplicationConfiguration>(
      `[${Configurations.database.databaseSchema}].[CloseBrokerConversation]`,
      params
    );
  }

  /**
   * changeInventoryTransferStatus
   */
  public async changeInventoryTransferStatus(
    inventoryTransfer: InventoryTransfer
  ): Promise<void> {
    let params: Array<ObjectParameter> = [
      {
        name: "InventoryTransferId",
        value: inventoryTransfer.id,
      } as ObjectParameter,
      { name: "InventoryTransferStatus", value: "CLOSED" } as ObjectParameter,
    ];

    await this.databaseService.executeDatabaseObject<ApplicationConfiguration>(
      `[${Configurations.database.databaseSchema}].[Change_Inventory_Transfer_Status]`,
      params
    );
  }
}
