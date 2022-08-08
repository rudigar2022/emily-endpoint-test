import { injectable } from "inversify";
import "reflect-metadata";
import { DatabaseService } from "../database/database.service";

import * as Models from "../../models/models";

import * as xmlParser from "js2xmlparser";

import * as Configurations from "../../configurations/configurations.json";

@injectable()
export class CustomerChangeService {
  constructor(private databaseService: DatabaseService) {}

  public async saveCustomerChanges(
    customerChanges: Array<Models.Customer>
  ): Promise<Array<Models.Customer>> {
    const parameter: Models.ObjectParameter = new Models.ObjectParameter();
    parameter.name = "customerChangesXml";
    parameter.value = xmlParser.parse("customerChanges", customerChanges);

    const response =
      await this.databaseService.executeDatabaseObject<Models.Customer>(
        `[${Configurations.database.databaseSchema}].[CreateCustomerChanges]`,
        [parameter]
      );

    return response;
  }
}
