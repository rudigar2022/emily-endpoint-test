import { injectable } from "inversify";
import "reflect-metadata";
import { DatabaseService } from "../database/database.service";

import * as Models from "../../models/models";
import * as Requests from "../../models/requests/requests";

import * as Configurations from "../../configurations/configurations.json";

@injectable()
export class ConfigurationService {
  constructor(private databaseService: DatabaseService) {}

  /**
   * getSystemConfigurations
   */
  public async getSystemConfigurations(): Promise<Array<Models.Configuration>> {
    let configurations: Array<Models.Configuration> =
      await this.databaseService.executeDatabaseObject<Models.Configuration>(
        `[${Configurations.database.databaseSchema}].[GetSystemConfigurations]`
      );

    return configurations;
  }

  /**
   * getBranchOffice
   */
  public async getBranchOffice(
    getBranchOfficeRequest: Requests.RouteInitialization
  ): Promise<Array<Models.BranchOffice>> {
    let parameters: Array<Models.ObjectParameter> = [
      {
        name: "SellerCode",
        value: getBranchOfficeRequest.sellerCode,
      },
    ];

    let offices: Array<Models.BranchOffice> =
      await this.databaseService.executeDatabaseObject<Models.BranchOffice>(
        `[${Configurations.database.databaseSchema}].[GetBranchOfficeBySeller]`,
        parameters
      );

    return offices;
  }
}
