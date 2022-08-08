import { injectable } from "inversify";
import { DatabaseService } from "../database/database.service";
import * as Requests from "../../models/requests/requests";
import { ObjectParameter, ZeroBalance } from "../../models/models";
import * as Configurations from "../../configurations/configurations.json";

@injectable()
export class ZeroBalanceService {
  constructor(private databaseService: DatabaseService) {}

  /**
   * getZeroBalance
   */
  public async getZeroBalance(
    routeInitializationRequest:
      | Requests.RouteInitialization
      | Requests.ZeroBalanceBySeller
  ): Promise<Array<ZeroBalance>> {
    let parameters: Array<ObjectParameter> = [
      {
        name: "SellerCode",
        value: routeInitializationRequest.sellerCode,
      },
    ];

    let zeroBalance: Array<ZeroBalance> =
      await this.databaseService.executeDatabaseObject<ZeroBalance>(
        `[${Configurations.database.databaseSchema}].[GetZeroBalanceBySeller]`,
        parameters
      );

    return zeroBalance;
  }
}
