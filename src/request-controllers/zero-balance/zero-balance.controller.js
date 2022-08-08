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
const services_1 = require("../../services/services");
const Responses = require("../../models/responses/responses");
let ZeroBalanceController = class ZeroBalanceController {
    /**
   *
   */
    constructor(loggerService, zeroBalanceService) {
        this.loggerService = loggerService;
        this.zeroBalanceService = zeroBalanceService;
    }
    prepareZeroBalanceControllerRoutes(router) {
        router
            .route("/zeroBalance/getZeroBalanceBySeller")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            const zeroBalanceResponse = new Responses.ProcessResponse();
            try {
                const zeroBalanceBySellerRequest = request.body;
                this.loggerService.info(`Seller : ${zeroBalanceBySellerRequest.sellerCode}`);
                const zeroBalance = yield this.zeroBalanceService.getZeroBalance(zeroBalanceBySellerRequest);
                zeroBalanceResponse.success = true;
                zeroBalanceResponse.resource = zeroBalance;
                this.loggerService.info(`Zero balance found ${zeroBalance.length} for Seller: ${zeroBalanceBySellerRequest.sellerCode}`);
                response.status(200).json(zeroBalanceResponse);
            }
            catch (error) {
                zeroBalanceResponse.success = false;
                zeroBalanceResponse.errors = [error.message || error];
                response.status(200).json(zeroBalanceResponse);
                this.loggerService.error(`Get Zero Balance failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        }));
    }
};
ZeroBalanceController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [services_1.LoggerService,
        services_1.ZeroBalanceService])
], ZeroBalanceController);
exports.ZeroBalanceController = ZeroBalanceController;
//# sourceMappingURL=zero-balance.controller.js.map