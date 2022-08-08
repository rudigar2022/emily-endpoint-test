import { DatabaseService } from "../database/database.service";
import { injectable } from "inversify";
import { Receipt, ObjectParameter, CreditNote } from "../../models/models";

import * as xmlParser from "js2xmlparser";

import * as Configurations from "../../configurations/configurations.json";

@injectable()
export class PaymentService {
  constructor(public databaseService: DatabaseService) {}

  /**
   * async synchronizeInvoices
   */
  public async synchronizeReceipts(
    receipts: Array<Receipt>
  ): Promise<Array<Receipt>> {
    const parameter: ObjectParameter = new ObjectParameter();
    parameter.name = "receiptsXml";
    parameter.value = xmlParser.parse("receipts", receipts);

    const response = await this.databaseService.executeDatabaseObject<Receipt>(
      `[${Configurations.database.databaseSchema}].[CreateReceipts]`,
      [parameter]
    );

    return response;
  }

  /**
   * synchronizeCreditNotes
   */
  public async synchronizeCreditNotes(
    creditNotes: Array<CreditNote>
  ): Promise<Array<CreditNote>> {
    const parameter: ObjectParameter = new ObjectParameter();
    parameter.name = "creditNotes";
    parameter.value = xmlParser.parse("creditNotes", creditNotes);

    const response =
      await this.databaseService.executeDatabaseObject<CreditNote>(
        `[${Configurations.database.databaseSchema}].[CreateCreditNotes]`,
        [parameter]
      );

    return response;
  }
}
