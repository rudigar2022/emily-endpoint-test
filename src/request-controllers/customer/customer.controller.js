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
let CustomerController = class CustomerController {
    /**
     *
     */
    constructor(loggerService, customerService) {
        this.loggerService = loggerService;
        this.customerService = customerService;
    }
    /**
     * prepareCustomerControllerRoutes
     */
    prepareCustomerControllerRoutes(router) {
        router
            .route("/customer/customeroutofroute")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            const customersResponse = new Responses.ProcessResponse();
            try {
                const searchCustomerOutOfRouteRequest = request.body;
                this.loggerService.info(`Searching customer: ${searchCustomerOutOfRouteRequest.searchCriteria} out of route plan for seller: ${searchCustomerOutOfRouteRequest.sellerCode}`);
                const customers = yield this.customerService.searchCustomerOutOfRoute(searchCustomerOutOfRouteRequest);
                if (customers && customers.length) {
                    yield new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                        for (const customer of customers) {
                            customer.unpaidBills = yield this.customerService.getUnpaidBillsForCustomerOutOfRoute(searchCustomerOutOfRouteRequest.sellerCode, customer.code);
                            customer.unpaidBillsDetails = yield this.customerService.getUnpaidBillsDetailForCustomerOutOfRoute(searchCustomerOutOfRouteRequest.sellerCode, customer.code);
                        }
                        resolve();
                    }));
                }
                customersResponse.success = true;
                customersResponse.resource = customers;
                this.loggerService.info(`The search customer out of route plan found ${customers.length} matches for Seller: ${searchCustomerOutOfRouteRequest.sellerCode}`);
                response.status(200).json(customersResponse);
            }
            catch (error) {
                customersResponse.success = false;
                customersResponse.errors = [error.message || error];
                response.status(200).json(customersResponse);
                this.loggerService.error(`Get customer out of route failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        }));
    }
};
CustomerController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [services_1.LoggerService,
        services_1.CustomerService])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map