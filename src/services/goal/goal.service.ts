import { injectable } from "inversify";
import { DatabaseService } from "../database/database.service";
import * as Requests from "../../models/requests/requests";
import {
  ObjectParameter,
  GoalGeneral,
  GoalPosByAirTime,
  GoalCurrent,
} from "../../models/models";
import * as Configurations from "../../configurations/configurations.json";

@injectable()
export class GoalService {
  constructor(private databaseService: DatabaseService) {}

  /**
   * getGoalGeneralBySellerCode
   * * Obtiene las metas generales del vendedor
   * @param routeInitializationRequest Requests.RouteInitialization
   * @returns Promise Array GoalGeneral: Listado de metas generales para el vendedor
   */
  public async getGoalGeneralBySellerCode(
    routeInitializationRequest: Requests.RouteInitialization
  ): Promise<Array<GoalGeneral>> {
    let parameters: Array<ObjectParameter> = [
      {
        name: "SellerCode",
        value: routeInitializationRequest.sellerCode,
      },
    ];
    return this.databaseService.executeDatabaseObject<GoalGeneral>(
      `[${Configurations.database.databaseSchema}].[GetGoalGeneralBySeller]`,
      parameters
    );
  }

  /**
   * getGoalPosByAirTimeBySellerCode
   * * Obtiene las metas por tiemp de aire del vendedor
   * @param routeInitializationRequest Requests.RouteInitialization
   * @returns Promise Array GoalPosByAirTime: Listado de metas por tiempo de aire para el vendedor
   */
  public async getGoalPosByAirTimeBySellerCode(
    routeInitializationRequest: Requests.RouteInitialization
  ): Promise<Array<GoalPosByAirTime>> {
    let parameters: Array<ObjectParameter> = [
      {
        name: "SellerCode",
        value: routeInitializationRequest.sellerCode,
      },
    ];
    return this.databaseService.executeDatabaseObject<GoalPosByAirTime>(
      `[${Configurations.database.databaseSchema}].[GetGoalPosByAirTimeBySeller]`,
      parameters
    );
  }

  /**
   * synchronizeGoalGeneralOfOrders
   */
  public async synchronizeGoalGeneralOfOrders(
    records: Array<GoalCurrent>
  ): Promise<Array<GoalCurrent>> {
    const parameter: ObjectParameter = new ObjectParameter();
    parameter.name = "json";
    parameter.value = JSON.stringify(records);

    const response =
      await this.databaseService.executeDatabaseObject<GoalCurrent>(
        `[${Configurations.database.databaseSchema}].[AddGoalGeneralOfOrders]`,
        [parameter]
      );

    return response;
  }

  /**
   * synchronizeGoalPosByAirTimeOfOrders
   */
  public async synchronizeGoalPosByAirTimeOfOrders(
    records: Array<GoalCurrent>
  ): Promise<Array<GoalCurrent>> {
    const parameter: ObjectParameter = new ObjectParameter();
    parameter.name = "json";
    parameter.value = JSON.stringify(records);

    const response =
      await this.databaseService.executeDatabaseObject<GoalCurrent>(
        `[${Configurations.database.databaseSchema}].[AddGoalPosByAirTimeOfOrders]`,
        [parameter]
      );

    return response;
  }
}
