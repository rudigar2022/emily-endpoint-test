import { injectable } from "inversify";
import "reflect-metadata";
import { DatabaseService } from "../database/database.service";

import * as Requests from "../../models/requests/requests";
import * as Models from "../../models/models";

import * as Configurations from "../../configurations/configurations.json";

@injectable()
export class ProductService {
  constructor(public databaseService: DatabaseService) {}

  /**
   * getProducts
   */
  public async getProducts(
    getProductsRequest: Requests.RouteInitialization
  ): Promise<Array<Models.Product>> {
    let parameters: Array<Models.ObjectParameter> = [
      {
        name: "SellerCode",
        value: getProductsRequest.sellerCode,
      },
    ];

    let products: Array<Models.Product> =
      await this.databaseService.executeDatabaseObject<Models.Product>(
        `[${Configurations.database.databaseSchema}].[GetProducts]`,
        parameters
      );

    return products;
  }

  /**
   * getSerialNumbers
   */
  public async getSerialNumbers(
    getSerialNumbersRequest: Requests.RouteInitialization
  ): Promise<Array<Models.ProductSerialNumber>> {
    let parameters: Array<Models.ObjectParameter> = [
      {
        name: "SellerCode",
        value: getSerialNumbersRequest.sellerCode,
      },
    ];

    let products: Array<Models.ProductSerialNumber> =
      await this.databaseService.executeDatabaseObject<Models.ProductSerialNumber>(
        `[${Configurations.database.databaseSchema}].[GetInventorySerial]`,
        parameters
      );

    return products;
  }

  public async getInventoryTransfer(
    inventoryTransferId: number
  ): Promise<Array<any>> {
    let parameters: Array<Models.ObjectParameter> = [
      {
        name: "InventoryTransferID",
        value: inventoryTransferId,
      },
    ];

    let products: Array<any> =
      await this.databaseService.executeDatabaseObject<any>(
        `[${Configurations.database.databaseSchema}].[GetInventoryTransferById]`,
        parameters
      );

    return products;
  }

  public async getInventoryTransferDetail(
    inventoryTransferId: number
  ): Promise<Array<any>> {
    let parameters: Array<Models.ObjectParameter> = [
      {
        name: "InventoryTransferID",
        value: inventoryTransferId,
      },
    ];

    let products: Array<any> =
      await this.databaseService.executeDatabaseObject<any>(
        `[${Configurations.database.databaseSchema}].[GetInventoryTransferDetailByTransferId]`,
        parameters
      );

    return products;
  }
}
