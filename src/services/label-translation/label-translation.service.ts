import { injectable } from "inversify";
import * as Configurations from "../../configurations/configurations.json";
import { LabelTranslation } from "../../models/models";
import { DatabaseService } from "../database/database.service";

@injectable()
export class LabelTranslationService {
  constructor(private databaseService: DatabaseService) {}

  /**
   * getLabelTranslation
   */
  public async getLabelTranslation(): Promise<Array<LabelTranslation>> {
    return this.databaseService.executeDatabaseObject<LabelTranslation>(
      `[${Configurations.database.databaseSchema}].[GeLabelTranslation]`
    );
  }
}
