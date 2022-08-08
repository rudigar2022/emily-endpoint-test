import { injectable } from "inversify";
import "reflect-metadata";
import * as express from "express";
import * as expressCore from "express-serve-static-core";

import { LoggerService, CustomerService } from "../../services/services";

import * as Models from "../../models/models";
import * as Requests from "../../models/requests/requests";
import * as Responses from "../../models/responses/responses";

@injectable()
export class CustomerController {
  /**
   *
   */
  constructor(
    private loggerService: LoggerService,
    private customerService: CustomerService
  ) {}

  /**
   * prepareCustomerControllerRoutes
   */
  public prepareCustomerControllerRoutes(router: express.Router): void {
    router
      .route("/customer/customeroutofroute")
      .post(
        async (
          request: expressCore.Request,
          response: expressCore.Response
        ) => {
          const customersResponse = new Responses.ProcessResponse<
            Array<Models.Customer>
          >();
          try {
            const searchCustomerOutOfRouteRequest: Requests.CustomerOutOfRoute =
              request.body;

            this.loggerService.info(
              `Searching customer: ${searchCustomerOutOfRouteRequest.searchCriteria} out of route plan for seller: ${searchCustomerOutOfRouteRequest.sellerCode}`
            );

            const customers = await this.customerService.searchCustomerOutOfRoute(
              searchCustomerOutOfRouteRequest
            );

            if (customers && customers.length) {
              await new Promise<void>(async (resolve: () => void) => {
                for (const customer of customers) {
                  customer.unpaidBills = await this.customerService.getUnpaidBillsForCustomerOutOfRoute(
                    searchCustomerOutOfRouteRequest.sellerCode,
                    customer.code
                  );

                  customer.unpaidBillsDetails = await this.customerService.getUnpaidBillsDetailForCustomerOutOfRoute(
                    searchCustomerOutOfRouteRequest.sellerCode,
                    customer.code
                  );
                }

                resolve();
              });
            }

            customersResponse.success = true;
            customersResponse.resource = customers;

            this.loggerService.info(
              `The search customer out of route plan found ${customers.length} matches for Seller: ${searchCustomerOutOfRouteRequest.sellerCode}`
            );

            response.status(200).json(customersResponse);
          } catch (error) {
            customersResponse.success = false;
            customersResponse.errors = [error.message || error];

            response.status(200).json(customersResponse);

            this.loggerService.error(
              `Get customer out of route failed. Error => ${JSON.stringify(
                error.message || error
              )}`
            );
          }
        }
      );
  }
}
