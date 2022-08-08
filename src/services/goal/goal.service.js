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
const database_service_1 = require("../database/database.service");
const models_1 = require("../../models/models");
const Configurations = require("../../configurations/configurations.json");
let GoalService = class GoalService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    /**
     * getGoalGeneralBySellerCode
     * * Obtiene las metas generales del vendedor
     * @param routeInitializationRequest Requests.RouteInitialization
     * @returns Promise Array GoalGeneral: Listado de metas generales para el vendedor
     */
    getGoalGeneralBySellerCode(routeInitializationRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let parameters = [
                {
                    name: "SellerCode",
                    value: routeInitializationRequest.sellerCode,
                },
            ];
            return this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[GetGoalGeneralBySeller]`, parameters);
        });
    }
    /**
     * getGoalPosByAirTimeBySellerCode
     * * Obtiene las metas por tiemp de aire del vendedor
     * @param routeInitializationRequest Requests.RouteInitialization
     * @returns Promise Array GoalPosByAirTime: Listado de metas por tiempo de aire para el vendedor
     */
    getGoalPosByAirTimeBySellerCode(routeInitializationRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let parameters = [
                {
                    name: "SellerCode",
                    value: routeInitializationRequest.sellerCode,
                },
            ];
            return this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[GetGoalPosByAirTimeBySeller]`, parameters);
        });
    }
    /**
     * synchronizeGoalGeneralOfOrders
     */
    synchronizeGoalGeneralOfOrders(records) {
        return __awaiter(this, void 0, void 0, function* () {
            const parameter = new models_1.ObjectParameter();
            parameter.name = "json";
            parameter.value = JSON.stringify(records);
            const response = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[AddGoalGeneralOfOrders]`, [parameter]);
            return response;
        });
    }
    /**
     * synchronizeGoalPosByAirTimeOfOrders
     */
    synchronizeGoalPosByAirTimeOfOrders(records) {
        return __awaiter(this, void 0, void 0, function* () {
            const parameter = new models_1.ObjectParameter();
            parameter.name = "json";
            parameter.value = JSON.stringify(records);
            const response = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[AddGoalPosByAirTimeOfOrders]`, [parameter]);
            return response;
        });
    }
};
GoalService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], GoalService);
exports.GoalService = GoalService;
//# sourceMappingURL=goal.service.js.map