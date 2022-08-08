import { injectable } from "inversify";
import "reflect-metadata";
import { DatabaseService } from "../database/database.service";

import * as Requests from "../../models/requests/requests";

import * as Configurations from "../../configurations/configurations.json";
import {
  AuthenticatedUser,
  MobileAccessByRole,
  ObjectParameter,
  UserCredential,
} from "../../models/models";

@injectable()
export class SecurityService {
  constructor(private databaseService: DatabaseService) {}

  /**
   * Login a user into the company database
   */
  public async login(
    receivedCredentials: Requests.AuthenticateUser
  ): Promise<Array<AuthenticatedUser>> {
    let parameters: Array<ObjectParameter> = [
      {
        name: "UserId",
        value: receivedCredentials.userId,
      },
      { name: "CompanyId", value: receivedCredentials.companyId },
      {
        name: "DeviceId",
        value: receivedCredentials.deviceId,
      },
    ];

    let results: Array<AuthenticatedUser> =
      await this.databaseService.executeDatabaseObject<AuthenticatedUser>(
        `[${Configurations.database.databaseSchema}].[AuthenticateUser]`,
        parameters
      );

    return results;
  }

  /**
   * getAccessesByRole
   */
  public async getAccessesByRole(
    userCredentials: UserCredential
  ): Promise<Array<MobileAccessByRole>> {
    let parameters: Array<ObjectParameter> = [
      {
        name: "RoleId",
        value: userCredentials.roleId,
      },
    ];

    return await this.databaseService.executeDatabaseObject<MobileAccessByRole>(
      `[${Configurations.database.databaseSchema}].[GetMobileAccessesByRole]`,
      parameters
    );
  }
}
