import { injectable } from "inversify";
import "reflect-metadata";
import { DatabaseService } from "../database/database.service";

import * as Requests from "../../models/requests/requests";
import * as Models from "../../models/models";

import * as Configurations from "../../configurations/configurations.json";

@injectable()
export class SequenceService {
  constructor(public databaseService: DatabaseService) {}

  /**
   * getSequences
   */
  public async getSequences(
    getSequencesRequest: Requests.RouteInitialization
  ): Promise<Array<Models.Sequence>> {
    let parameters: Array<Models.ObjectParameter> = [
      {
        name: "SellerCode",
        value: getSequencesRequest.sellerCode,
      },
    ];

    let sequences: Array<Models.Sequence> =
      await this.databaseService.executeDatabaseObject<Models.Sequence>(
        `[${Configurations.database.databaseSchema}].[GetSequences]`,
        parameters
      );

    return sequences;
  }
}
