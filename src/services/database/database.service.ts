import { injectable } from "inversify";
import "reflect-metadata";
import * as mssql from "mssql";

import * as Configurations from "../../configurations/configurations.json";

import * as Models from "../../models/models";
import { LoggerService } from "../logger/logger.service";

@injectable()
export class DatabaseService {
  private connectionConfiguration: mssql.config =
    Configurations.database.driverConfiguration;
  private dbPool: mssql.ConnectionPool;

  /**
   * Default DabaseService constructor
   */
  constructor(private loggerService: LoggerService) {
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
   * Execute an object on Database
   * @param objectName The object's name to execute
   * @param objectParammeters An array of data if the Database Object to execute use parameters
   */
  public executeDatabaseObject<ResponseType>(
    objectName: string,
    objectParammeters?: Array<Models.ObjectParameter>
  ): Promise<Array<ResponseType>> {
    return new Promise<Array<ResponseType>>(
      async (
        resolve: (results: Array<ResponseType>) => void,
        reject: (reason: any) => void
      ) => {
        try {
          this.loggerService.info(`Init execution for ${objectName}`);

          // Prepare objects to use
          let requestWithError: boolean = false;
          let results: Array<ResponseType> = [];
          let request: mssql.Request = await this.openRequest();
          request.stream = true;
          request.verbose =
            Configurations.server.verboseDatabaseRequest || false;

          // Prepare parameters
          if (objectParammeters) {
            objectParammeters.forEach((parameter: any) => {
              request.input(parameter.name, parameter.value);
            });
          }

          // Prepare handlers
          request.on("row", (row) => {
            results.push(row);
          });

          request.on("error", (error: any) => {
            this.loggerService.error(
              `Execution of ${objectName} failed. Error => ${JSON.stringify(
                error
              )}`
            );

            requestWithError = true;
            reject(error);
          });

          request.on("done", () => {
            if (!requestWithError) {
              this.loggerService.info(
                `Execution of ${objectName} completed...`
              );

              resolve(results);
            }
          });

          // Execute object
          await request.execute(objectName);
        } catch (error) {
          this.loggerService.error(
            `Execution intent of ${objectName} failed. Error => ${JSON.stringify(
              error
            )}`
          );

          reject(error);
        }
      }
    );
  }
}
