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
const xmlParser = require("js2xmlparser");
const Configurations = require("../../configurations/configurations.json");
const models_1 = require("../../models/models");
let CustomerService = class CustomerService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    /**
     * getCustomers
     */
    getCustomers(getCustomersRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let parameters = [
                {
                    name: "SellerCode",
                    value: getCustomersRequest.sellerCode,
                },
            ];
            let customers = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[GetCustomer]`, parameters);
            return customers;
        });
    }
    /**
     * createNewCustomer
     */
    createNewCustomers(newCustomers) {
        return __awaiter(this, void 0, void 0, function* () {
            const parameter = new models_1.ObjectParameter();
            parameter.name = "newCustomersXml";
            parameter.value = xmlParser.parse("newCustomer", newCustomers);
            const response = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[CreateCustomers]`, [parameter]);
            return response;
        });
    }
    /**
     * createCanceledVisits
     */
    createCanceledVisits(canceledVisits) {
        return __awaiter(this, void 0, void 0, function* () {
            const parameter = new models_1.ObjectParameter();
            parameter.name = "canceledVisits";
            parameter.value = xmlParser.parse("canceledVisits", canceledVisits);
            console.log(parameter.value);
            const response = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[CreateCanceledVisits]`, [parameter]);
            return response;
        });
    }
    /**
     * searchCustomerOutOfRoute
     */
    searchCustomerOutOfRoute(searchCustomerOutOfRouteRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let parameters = [
                {
                    name: "SellerCode",
                    value: searchCustomerOutOfRouteRequest.sellerCode,
                },
                {
                    name: "SearchCriteria",
                    value: searchCustomerOutOfRouteRequest.searchCriteria,
                },
            ];
            let customers = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[SearchCustomerOutOfRoute]`, parameters);
            return customers;
        });
    }
    /**
     * getUnpaidBills
     */
    getUnpaidBills(getCustomersRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let parameters = [
                {
                    name: "SellerCode",
                    value: getCustomersRequest.sellerCode,
                },
            ];
            let unpaidBills = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[GetCustomersUnpaidBills]`, parameters);
            return unpaidBills;
        });
    }
    /**
     * getUnpaidBillsDetail
     */
    getUnpaidBillsDetail(getCustomersRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let parameters = [
                {
                    name: "SellerCode",
                    value: getCustomersRequest.sellerCode,
                },
            ];
            let unpaidBills = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[GetCustomersUnpaidBillsDetail]`, parameters);
            return unpaidBills;
        });
    }
    /**
     * Return the array of unpaid bills for the customer
     */
    getUnpaidBillsForCustomerOutOfRoute(sellerCode, customerCode) {
        return __awaiter(this, void 0, void 0, function* () {
            let parameters = [
                {
                    name: "SellerCode",
                    value: sellerCode,
                },
                {
                    name: "CustomerCode",
                    value: customerCode,
                },
            ];
            let unpaidBills = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[GetUnpaidBillsForCustomerOutOfRoute]`, parameters);
            return unpaidBills;
        });
    }
    /**
     * Returns the array of unpaid bills details for the customer
     */
    getUnpaidBillsDetailForCustomerOutOfRoute(sellerCode, customerCode) {
        return __awaiter(this, void 0, void 0, function* () {
            let parameters = [
                {
                    name: "SellerCode",
                    value: sellerCode,
                },
                {
                    name: "CustomerCode",
                    value: customerCode,
                },
            ];
            let unpaidBillsDetail = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[GetUnpaidBillsDetailForCustomerOutOfRoute]`, parameters);
            return unpaidBillsDetail;
        });
    }
};
CustomerService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map