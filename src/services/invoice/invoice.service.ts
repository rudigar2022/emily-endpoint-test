import { injectable } from "inversify";
import "reflect-metadata";
import { DatabaseService } from "../database/database.service";

import * as xmlParser from "js2xmlparser";
import { SaleDocument, ObjectParameter } from "../../models/models";

import * as Configurations from "../../configurations/configurations.json";

@injectable()
export class InvoiceService {
  constructor(public databaseService: DatabaseService) {}

  /**
   * synchronizeInvoices
   */
  public async synchronizeInvoices(
    invoices: Array<SaleDocument>
  ): Promise<Array<SaleDocument>> {
    const parameter: ObjectParameter = new ObjectParameter();
    parameter.name = "invoicesXml";
    parameter.value = xmlParser.parse("invoices", invoices);

    const response =
      await this.databaseService.executeDatabaseObject<SaleDocument>(
        `[${Configurations.database.databaseSchema}].[CreateInvoices]`,
        [parameter]
      );

    return response;
  }
}
