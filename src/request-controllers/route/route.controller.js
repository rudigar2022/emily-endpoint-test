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
const services_1 = require("../../services/services");
const Responses = require("../../models/responses/responses");
const responses_1 = require("../../models/responses/responses");
let RouteController = class RouteController {
    constructor(loggerService, routeService) {
        this.loggerService = loggerService;
        this.routeService = routeService;
    }
    /**
     * prepareRouteControllerRoutes
     */
    prepareRouteControllerRoutes(router) {
        router
            .route("/route/liquidation")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.createRouteLiquidation(request, response);
        }));
        router
            .route("/route/unprocessed-broadcast")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getUnprocessedBroadcastByLoginId(request, response);
        }));
    }
    createRouteLiquidation(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const processResponse = new Responses.ProcessResponse();
            try {
                const routeLiquidation = request.body;
                this.loggerService.info(`Creating route liquidation for seller => ${routeLiquidation.sellerCode}`);
                yield this.routeService.createRouteLiquidation(routeLiquidation);
                processResponse.success = true;
                this.loggerService.info(`The Create Route Liquidation process has finished completed...`);
                response.status(200).json(processResponse);
            }
            catch (error) {
                this.loggerService.error(`Create route liquidation failed. Error => ${JSON.stringify(error.message || error)}`);
                processResponse.success = false;
                processResponse.errors = [error.message || error];
                response.status(200).json(processResponse);
            }
        });
    }
    /**
     * getUnprocessedBroadcastByLoginId
     * @param request HttpRequest
     * @param response HttpResponse
     */
    getUnprocessedBroadcastByLoginId(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCredentials = request.body;
            const processResponse = new responses_1.ProcessResponse();
            try {
                this.loggerService.info(`Getting unprocessed broadcast for => ${userCredentials.loginId}`);
                let unprocessedBroadcasts = yield this.routeService.getUnprocessedBroadcastByLoginId(userCredentials.loginId);
                processResponse.success = true;
                processResponse.resource = unprocessedBroadcasts;
            }
            catch (error) {
                this.loggerService.error(`Error getting unprocessed broadcasts for user ${userCredentials.loginId}`);
                this.loggerService.error(JSON.stringify(error));
                processResponse.success = false;
                processResponse.errors = [error.message || error];
            }
            response.status(200).json(processResponse);
        });
    }
};
RouteController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [services_1.LoggerService,
        services_1.RouteService])
], RouteController);
exports.RouteController = RouteController;
//# sourceMappingURL=route.controller.js.map