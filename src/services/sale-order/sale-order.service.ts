import { injectable } from "inversify";
import "reflect-metadata";
import { DatabaseService } from "../database/database.service";

import * as xmlParser from "js2xmlparser";
import { SaleDocument, ObjectParameter } from "../../models/models";

import * as Configurations from "../../configurations/configurations.json";

@injectable()
export class SaleOrderService {
  constructor(public databaseService: DatabaseService) {}

  /**
   * synchronizeSalesOrders
   */
  public async synchronizeSalesOrders(
    salesOrders: Array<SaleDocument>
  ): Promise<Array<SaleDocument>> {
    const parameter: ObjectParameter = new ObjectParameter();
    parameter.name = "salesOrders";
    parameter.value = xmlParser.parse("salesOrders", salesOrders);

    const response =
      await this.databaseService.executeDatabaseObject<SaleDocument>(
        `[${Configurations.database.databaseSchema}].[CreateSalesOrders]`,
        [parameter]
      );

    return response;
  }
}
