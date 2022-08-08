"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
const database_service_1 = require("../database/database.service");
const Models = require("../../models/models");
const xmlParser = require("js2xmlparser");
const Configurations = require("../../configurations/configurations.json");
let SurveyService = class SurveyService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    /**
     * getSurveys
     */
    getSurveys(getSurveysRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let parameters = [
                {
                    name: "SellerCode",
                    value: getSurveysRequest.sellerCode,
                },
            ];
            let customers = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[GetSurveys]`, parameters);
            return customers;
        });
    }
    /**
     * getSurveyQuestions
     */
    getSurveyQuestions(getSurveyQuestionsRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let parameters = [
                {
                    name: "SellerCode",
                    value: getSurveyQuestionsRequest.sellerCode,
                },
            ];
            let questions = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[GetQuestions]`, parameters);
            return questions;
        });
    }
    /**
     * getSurveyAnswers
     */
    getSurveyAnswers(getSurveyQuestionsRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let parameters = [
                {
                    name: "SellerCode",
                    value: getSurveyQuestionsRequest.sellerCode,
                },
            ];
            let answers = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[GetAnswers]`, parameters);
            return answers;
        });
    }
    /**
     * synchronizeSurveys
     */
    synchronizeSurveys(surveysProcessed) {
        return __awaiter(this, void 0, void 0, function* () {
            const parameter = new Models.ObjectParameter();
            parameter.name = "processedSurveys";
            parameter.value = xmlParser.parse("processedSurveys", surveysProcessed);
            const response = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[AddProcessedSurvey]`, [parameter]);
            return response;
        });
    }
};
SurveyService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SurveyService);
exports.SurveyService = SurveyService;
//# sourceMappingURL=survey.service.js.map