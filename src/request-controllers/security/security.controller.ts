import { injectable } from "inversify";
import "reflect-metadata";
import * as express from "express";
import * as expressCore from "express-serve-static-core";
import { LoggerService, SecurityService } from "../../services/services";

import * as Models from "../../models/models";
import * as Requests from "../../models/requests/requests";
import * as Responses from "../../models/responses/responses";

import * as Utilities from "../../utilities/utilities";

import * as basicAuth from "express-basic-auth";
import { MobileAccessByRole, UserCredential } from "../../models/models";
import { ProcessResponse } from "../../models/responses/responses";

@injectable()
export class SecurityController {
  /**
   * Default SecurityController constructor
   */
  constructor(
    private loggerService: LoggerService,
    private securityService: SecurityService
  ) {}

  /**
   * Create a middelware route for handle user authentication
   */
  public prepareSecurityControllerRoutes(router: express.Router): void {
    router
      .route("/security/login")
      .post(
        async (
          request: expressCore.Request,
          response: expressCore.Response
        ) => {
          try {
            const authenticateUserRequest: Requests.AuthenticateUser =
              request.body;

            this.loggerService.info(
              `Authenticating user => ${authenticateUserRequest.userId} at ${authenticateUserRequest.companyId}`
            );

            const authenticatedUser = await this.securityService.login(
              authenticateUserRequest
            );

            const authenticatedUserResponse = {
              success: true,
              resource: Utilities.firstOrDefault<Models.AuthenticatedUser>(
                authenticatedUser
              ),
            } as Responses.ProcessResponse<Models.AuthenticatedUser>;

            this.loggerService.info(`User authenticated succesfully.}`);

            response.status(200).json(authenticatedUserResponse);
          } catch (error) {
            response.status(200).json({
              success: false,
              errors: [error.message || error],
            } as Responses.ProcessResponse<Models.AuthenticatedUser>);

            this.loggerService.error(
              `User authentication failed. Error => ${JSON.stringify(
                error.message || error
              )}`
            );
          }
        }
      );

    router
      .route("/security/accesses")
      .post(
        async (
          request: expressCore.Request,
          response: expressCore.Response
        ) => {
          return await this.getAccessesByrole(request, response);
        }
      );
  }

  /**
   * basicCredentialsComparer
   */
  private static basicCredentialsComparer = (
    userName: string,
    password: string
  ): boolean => {
    let userNameMatches = basicAuth.safeCompare(userName, "emilia-user");
    let passwordMatches = basicAuth.safeCompare(password, "emilia-user");

    return userNameMatches && passwordMatches;
  };

  /**
   * challengeAuthorizer
   */
  static challengeAuthorizer = basicAuth({
    authorizer: SecurityController.basicCredentialsComparer,
    challenge: true,
  });

  /**
   * basicAuthorizer
   */
  static basicAuthorizer = basicAuth({
    authorizer: SecurityController.basicCredentialsComparer,
    challenge: false,
  });

  /**
   * getAccessesByrole
   */
  public async getAccessesByrole(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    const userCredentials: UserCredential = request.body;
    const processResponse: ProcessResponse<
      Array<MobileAccessByRole>
    > = new ProcessResponse<Array<MobileAccessByRole>>();

    try {
      this.loggerService.info(
        `Getting accesses by role id: ${userCredentials.roleId}`
      );

      let accessesByRole: Array<MobileAccessByRole> = await this.securityService.getAccessesByRole(
        userCredentials
      );

      processResponse.success = true;
      processResponse.resource = accessesByRole;
    } catch (error) {
      this.loggerService.error(
        `Error getting accesses by role ${userCredentials.roleId}`
      );
      this.loggerService.error(JSON.stringify(error));

      processResponse.success = false;
      processResponse.errors = [error.message || error];
    }

    response.status(200).json(processResponse);
  }
}
