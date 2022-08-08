import { injectable } from "inversify";
import "reflect-metadata";
import { DatabaseService } from "../database/database.service";

import * as Requests from "../../models/requests/requests";
import * as Models from "../../models/models";

import * as xmlParser from "js2xmlparser";

import * as Configurations from "../../configurations/configurations.json";

@injectable()
export class SurveyService {
  constructor(public databaseService: DatabaseService) {}

  /**
   * getSurveys
   */
  public async getSurveys(
    getSurveysRequest: Requests.RouteInitialization
  ): Promise<Array<Models.Survey>> {
    let parameters: Array<Models.ObjectParameter> = [
      {
        name: "SellerCode",
        value: getSurveysRequest.sellerCode,
      },
    ];

    let customers: Array<Models.Survey> =
      await this.databaseService.executeDatabaseObject<Models.Survey>(
        `[${Configurations.database.databaseSchema}].[GetSurveys]`,
        parameters
      );

    return customers;
  }

  /**
   * getSurveyQuestions
   */
  public async getSurveyQuestions(
    getSurveyQuestionsRequest: Requests.RouteInitialization
  ): Promise<Array<Models.SurveyQuestion>> {
    let parameters: Array<Models.ObjectParameter> = [
      {
        name: "SellerCode",
        value: getSurveyQuestionsRequest.sellerCode,
      },
    ];

    let questions: Array<Models.SurveyQuestion> =
      await this.databaseService.executeDatabaseObject<Models.SurveyQuestion>(
        `[${Configurations.database.databaseSchema}].[GetQuestions]`,
        parameters
      );

    return questions;
  }

  /**
   * getSurveyAnswers
   */
  public async getSurveyAnswers(
    getSurveyQuestionsRequest: Requests.RouteInitialization
  ): Promise<Array<Models.SurveyAnswer>> {
    let parameters: Array<Models.ObjectParameter> = [
      {
        name: "SellerCode",
        value: getSurveyQuestionsRequest.sellerCode,
      },
    ];

    let answers: Array<Models.SurveyAnswer> =
      await this.databaseService.executeDatabaseObject<Models.SurveyAnswer>(
        `[${Configurations.database.databaseSchema}].[GetAnswers]`,
        parameters
      );

    return answers;
  }

  /**
   * synchronizeSurveys
   */
  public async synchronizeSurveys(
    surveysProcessed: Array<Models.SurveyProcessed>
  ): Promise<Array<Models.SurveyProcessed>> {
    const parameter: Models.ObjectParameter = new Models.ObjectParameter();
    parameter.name = "processedSurveys";
    parameter.value = xmlParser.parse("processedSurveys", surveysProcessed);

    const response =
      await this.databaseService.executeDatabaseObject<Models.SurveyProcessed>(
        `[${Configurations.database.databaseSchema}].[AddProcessedSurvey]`,
        [parameter]
      );

    return response;
  }
}
