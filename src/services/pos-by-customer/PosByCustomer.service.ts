import { injectable } from "inversify";
import { DatabaseService } from "../database/database.service";
import { ObjectParameter, PosByCustomer } from "../../models/models";
import * as Requests from "../../models/requests/requests";
import * as Configurations from "../../configurations/configurations.json";

@injectable()
export class PosByCustomerService {
  constructor(private databaseService: DatabaseService) {}

  /**
   * getPosByCustomer
   */
  public async getPosByCustomer(
    routeInitializationRequest: Requests.RouteInitialization
  ): Promise<Array<PosByCustomer>> {
    let parameters: Array<ObjectParameter> = [
      {
        name: "SellerCode",
        value: routeInitializationRequest.sellerCode,
      },
    ];

    return this.databaseService.executeDatabaseObject<PosByCustomer>(
      `[${Configurations.database.databaseSchema}].[GetPOSBySeller]`,
      parameters
    );
  }
}
