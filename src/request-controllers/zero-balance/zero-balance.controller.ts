import { injectable } from "inversify";
import { LoggerService, ZeroBalanceService } from "../../services/services";
import * as express from "express";
import * as expressCore from "express-serve-static-core";
import * as Models from "../../models/models";
import * as Requests from "../../models/requests/requests";
import * as Responses from "../../models/responses/responses";

@injectable()
export class ZeroBalanceController{
    /**
   *
   */
  constructor(
    private loggerService: LoggerService,
    private zeroBalanceService: ZeroBalanceService
  ) {}

  public prepareZeroBalanceControllerRoutes(router: express.Router): void {
    router
      .route("/zeroBalance/getZeroBalanceBySeller")
      .post(
        async (
          request: expressCore.Request,
          response: expressCore.Response
        ) => {
          const zeroBalanceResponse = new Responses.ProcessResponse<
            Array<Models.ZeroBalance>
          >();
          try {
            const zeroBalanceBySellerRequest: Requests.ZeroBalanceBySeller =
              request.body;

            this.loggerService.info(
              `Seller : ${zeroBalanceBySellerRequest.sellerCode}`
            );

            const zeroBalance = await this.zeroBalanceService.getZeroBalance(
              zeroBalanceBySellerRequest
            );            

            zeroBalanceResponse.success = true;
            zeroBalanceResponse.resource = zeroBalance;

            this.loggerService.info(
              `Zero balance found ${zeroBalance.length} for Seller: ${zeroBalanceBySellerRequest.sellerCode}`
            );

            response.status(200).json(zeroBalanceResponse);
          } catch (error) {
            zeroBalanceResponse.success = false;
            zeroBalanceResponse.errors = [error.message || error];

            response.status(200).json(zeroBalanceResponse);

            this.loggerService.error(
              `Get Zero Balance failed. Error => ${JSON.stringify(
                error.message || error
              )}`
            );
          }
        }
      );
  }
}