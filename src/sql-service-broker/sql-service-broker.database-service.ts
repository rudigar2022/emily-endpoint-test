import { injectable } from "inversify";
import "reflect-metadata";
import * as mssql from "mssql";

import * as Configurations from "../configurations/configurations.json";
import { SqlServiceBrokerResponse } from "./sql-service-broker-response.model";

@injectable()
export class SqlServiceBrokerDatabaseService {
  private connectionConfiguration: mssql.config =
    Configurations.database.driverConfiguration;

  private dbPool: mssql.ConnectionPool;

  constructor() {
    this.dbPool = new mssql.ConnectionPool(this.connectionConfiguration);
  }

  /**
   * Open a Database Request with the current Connection Pool
   */
  private async openRequest(): Promise<mssql.Request> {
    if (!this.dbPool || !this.dbPool.connected) {
      await this.dbPool.connect();
    }

    return new mssql.Request(this.dbPool);
  }

  /**
   * getBrokerMessages
   */
  public async getBrokerMessages(
    queue: string,
    messagesCount: number = 1,
    timeout: number = 5000
  ): Promise<any> {
    try {
      const query: string = `WAITFOR (  
            RECEIVE TOP (@count)
              conversation_group_id,
              conversation_handle,
              message_sequence_number,
              message_body, 
              message_type_id,
              message_type_name,
              priority,
              queuing_order,
              service_contract_id,
              service_contract_name,
              service_id,
              service_name,
              status,
              validation
            FROM [${queue}]  
          ), TIMEOUT @timeout`;

      const request: mssql.Request = await this.openRequest();

      request.input("count", mssql.TYPES.Int, messagesCount);
      request.input("timeout", mssql.TYPES.Int, timeout);

      return new Promise<any>(
        (resolve: (response: any) => void, reject: (reason: Error) => void) => {
          request.query<any>(
            query,
            (error?: Error, results?: mssql.IResult<any>) => {
              if (error) {
                reject(error);
                return;
              }

              if (!results || !results.recordset || !results.recordset.length) {
                resolve(null);
                return;
              }

              resolve(results);
            }
          );
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * createUnprocessedBroadcast
   */
  public async createUnprocessedBroadcast(
    brokerMessage: SqlServiceBrokerResponse
  ): Promise<void> {
    const request: mssql.Request = await this.openRequest();

    request.verbose = Configurations.server.verboseDatabaseRequest;

    request.input("LoginID", brokerMessage.loginId);
    request.input("ConversationID", brokerMessage.conversationId);
    request.input("MessageType", brokerMessage.messageType);
    request.input("MessageBody", brokerMessage.messageBody);
    request.input("MessageStatus", "NEW");

    await request.execute(
      `[${Configurations.database.databaseSchema}].[CreateUnprocessedBroadcast]`
    );
  }
}
