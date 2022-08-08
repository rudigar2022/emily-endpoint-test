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
const models_1 = require("../../models/models");
const Configurations = require("../../configurations/configurations.json");
const utilities_1 = require("../../utilities/utilities");
let RouteService = class RouteService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    /**
     * Verify if the received seller are enabled to authenticate
     * @param sellerCode The seller that wants to start route
     */
    validateRoute(sellerCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const parameter = new models_1.ObjectParameter();
            parameter.name = "Seller_Code";
            parameter.value = sellerCode;
            return this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[VerifyDocumentsPendingOfSynchronizationToErp]`, [parameter]);
        });
    }
    /**
     * createRouteLiquidation
     */
    createRouteLiquidation(routeLiquidation) {
        return __awaiter(this, void 0, void 0, function* () {
            const parameter = new models_1.ObjectParameter();
            parameter.name = "RouteLiquidation";
            parameter.value = xmlParser.parse("routeLiquidation", routeLiquidation);
            yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[CreateRouteLiquidation]`, [parameter]);
        });
    }
    /**
     * async getAppUpdateSettings
     */
    getAppUpdateSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            let configuration = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[GetAppUpdateSettings]`);
            return configuration;
        });
    }
    /**
     * getUnprocessedBroadcastByLoginId
     */
    getUnprocessedBroadcastByLoginId(loginId) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = [
                {
                    name: "LoginId",
                    value: loginId,
                },
            ];
            let unprocessedBroadcasts = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[GetUnprocessedBroadcastByLoginId]`, params);
            return unprocessedBroadcasts;
        });
    }
    /**
     * finalizeBroadcast
     */
    finalizeBroadcast(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("rd-finalizeBroadcast", message);
            let params = null;
            switch (message.messageType) {
                case utilities_1.Enums.Notification.ZeroBalance:
                    params = [
                        {
                            name: "LoginId",
                            value: message.loginId,
                        },
                        {
                            name: "ConversationID",
                            value: message.conversationId,
                        },
                        {
                            name: "MessageType",
                            value: message.messageType,
                        },
                    ];
                    break;
                case utilities_1.Enums.Notification.InventoryTransfer:
                    params = [
                        {
                            name: "ConversationID",
                            value: message.conversationId,
                        },
                        {
                            name: "MessageType",
                            value: message.messageType,
                        },
                    ];
                    break;
            }
            yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[CloseBrokerConversation]`, params);
        });
    }
    /**
     * changeInventoryTransferStatus
     */
    changeInventoryTransferStatus(inventoryTransfer) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = [
                {
                    name: "InventoryTransferId",
                    value: inventoryTransfer.id,
                },
                { name: "InventoryTransferStatus", value: "CLOSED" },
            ];
            yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[Change_Inventory_Transfer_Status]`, params);
        });
    }
};
RouteService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], RouteService);
exports.RouteService = RouteService;
//# sourceMappingURL=route.service.js.map