import { injectable } from "inversify";
import "reflect-metadata";
import * as express from "express";
import * as expressCore from "express-serve-static-core";
import { LoggerService, RouteService } from "../../services/services";

import * as Models from "../../models/models";
import * as Responses from "../../models/responses/responses";
import { ProcessResponse } from "../../models/responses/responses";
import { SqlServiceBrokerResponse } from "../../sql-service-broker/sql-service-broker-response.model";
import { UserCredential } from "../../models/models";

@injectable()
export class RouteController {
  constructor(
    private loggerService: LoggerService,
    private routeService: RouteService
  ) {}

  /**
   * prepareRouteControllerRoutes
   */
  public prepareRouteControllerRoutes(router: express.Router): void {
    router
      .route("/route/liquidation")
      .post(
        async (
          request: expressCore.Request,
          response: expressCore.Response
        ) => {
          await this.createRouteLiquidation(request, response);
        }
      );

    router
      .route("/route/unprocessed-broadcast")
      .post(
        async (
          request: expressCore.Request,
          response: expressCore.Response
        ) => {
          await this.getUnprocessedBroadcastByLoginId(request, response);
        }
      );
  }

  private async createRouteLiquidation(
    request: expressCore.Request,
    response: expressCore.Response
  ): Promise<void> {
    const processResponse: Responses.ProcessResponse<void> = new Responses.ProcessResponse<void>();
    try {
      const routeLiquidation: Models.RouteLiquidation = request.body;

      this.loggerService.info(
        `Creating route liquidation for seller => ${routeLiquidation.sellerCode}`
      );

      await this.routeService.createRouteLiquidation(routeLiquidation);

      processResponse.success = true;

      this.loggerService.info(
        `The Create Route Liquidation process has finished completed...`
      );

      response.status(200).json(processResponse);
    } catch (error) {
      this.loggerService.error(
        `Create route liquidation failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );

      processResponse.success = false;
      processResponse.errors = [error.message || error];

      response.status(200).json(processResponse);
    }
  }

  /**
   * getUnprocessedBroadcastByLoginId
   * @param request HttpRequest
   * @param response HttpResponse
   */
  private async getUnprocessedBroadcastByLoginId(
    request: expressCore.Request,
    response: expressCore.Response
  ): Promise<void> {
    const userCredentials: UserCredential = request.body;
    const processResponse: ProcessResponse<
      Array<SqlServiceBrokerResponse>
    > = new ProcessResponse<Array<SqlServiceBrokerResponse>>();

    try {
      this.loggerService.info(
        `Getting unprocessed broadcast for => ${userCredentials.loginId}`
      );

      let unprocessedBroadcasts: Array<SqlServiceBrokerResponse> = await this.routeService.getUnprocessedBroadcastByLoginId(
        userCredentials.loginId
      );

      processResponse.success = true;
      processResponse.resource = unprocessedBroadcasts;
    } catch (error) {
      this.loggerService.error(
        `Error getting unprocessed broadcasts for user ${userCredentials.loginId}`
      );
      this.loggerService.error(JSON.stringify(error));

      processResponse.success = false;
      processResponse.errors = [error.message || error];
    }

    response.status(200).json(processResponse);
  }
}
