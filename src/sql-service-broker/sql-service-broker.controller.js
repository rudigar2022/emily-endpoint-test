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
const events_1 = require("events");
const services_1 = require("../services/services");
const sql_service_broker_response_model_1 = require("./sql-service-broker-response.model");
const sql_service_broker_database_service_1 = require("./sql-service-broker.database-service");
const Configurations = require("../configurations/configurations.json");
// Decorator used to hide the error 'Missing required @injectable annotation in: EventEmitter'
inversify_1.decorate(inversify_1.injectable(), events_1.EventEmitter);
let SqlServiceBrokerController = class SqlServiceBrokerController extends events_1.EventEmitter {
    constructor(loggerService, sqlServiceBrokerDatabaseService, productService) {
        super();
        this.loggerService = loggerService;
        this.sqlServiceBrokerDatabaseService = sqlServiceBrokerDatabaseService;
        this.productService = productService;
    }
    get inventoryTransferBrokerServiceIsActive() {
        return this._inventoryTransferBrokerServiceIsActive;
    }
    set inventoryTransferBrokerServiceIsActive(value) {
        this._inventoryTransferBrokerServiceIsActive = value;
    }
    get zeroBalanceBrokerServiceIsActive() {
        return this._zeroBalanceBrokerServiceIsActive;
    }
    set zeroBalanceBrokerServiceIsActive(value) {
        this._zeroBalanceBrokerServiceIsActive = value;
    }
    /**
     * Start to listen the Sql Service Broker
     */
    startListeningInventoryTransferQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            this.inventoryTransferBrokerServiceIsActive =
                Configurations.server.InventoryTransferBrokerServiceIsActive;
            this.loggerService.info("Start listening Inventory Transfer Broker Service...");
            while (this.inventoryTransferBrokerServiceIsActive) {
                try {
                    const brokerMessage = yield this.sqlServiceBrokerDatabaseService.getBrokerMessages("Emilia_Inventory_Transfer_Receiver_Queue");
                    if (!brokerMessage) {
                        this.loggerService.info("No inventory transfer broker messages were found.");
                        continue;
                    }
                    const brokerData = brokerMessage.recordset[0].message_body
                        .toString()
                        .split("|");
                    const brokerResponse = this.createResponse(brokerMessage);
                    brokerResponse.loginId = brokerData[0];
                    const transferId = parseInt(brokerData[1]);
                    const transfers = yield this.productService.getInventoryTransfer(transferId);
                    // console.dir(transfers);
                    if (!transfers || !transfers.length) {
                        continue;
                    }
                    const inventoryTransfer = transfers[0];
                    inventoryTransfer.inventoryTransferDetail =
                        (yield this.productService.getInventoryTransferDetail(inventoryTransfer.id)) || [];
                    brokerResponse.messageBody = JSON.stringify(inventoryTransfer);
                    this.createUnprocessedBroadcast(brokerResponse);
                    this.emit("SQL_BROKER_MESSAGE", brokerResponse);
                }
                catch (error) {
                    this.loggerService.error(`Error getting inventory transfer broker messages. \r\n ${error.message}`);
                    continue;
                }
            }
        });
    }
    startListeningZeroBalanceQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            this.zeroBalanceBrokerServiceIsActive =
                Configurations.server.ZeroBalanceBrokerServiceIsActive;
            this.loggerService.info("Start listening Zero Balance Broker Service...");
            while (this.zeroBalanceBrokerServiceIsActive) {
                try {
                    const brokerMessage = yield this.sqlServiceBrokerDatabaseService.getBrokerMessages("Emilia_Zero_Balance_Receiver_Queue");
                    if (!brokerMessage) {
                        this.loggerService.info("No zero balance broker messages were found.");
                        continue;
                    }
                    const brokerData = brokerMessage.recordset[0].message_body.toString();
                    const brokerResponse = this.createResponse(brokerMessage);
                    //const importDate: Date = new Date(brokerData);
                    brokerResponse.messageBody = brokerData;
                    this.createUnprocessedBroadcast(brokerResponse);
                    this.emit("SQL_BROKER_MESSAGE", brokerResponse);
                }
                catch (error) {
                    this.loggerService.error(`Error getting zero inventory broker messages. \r\n ${error.message}`);
                    continue;
                }
            }
        });
    }
    /**
     * Creates a unprocessed broadcast
     * @param brokerResponse The message published by Sql Service Broker
     */
    createUnprocessedBroadcast(brokerResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sqlServiceBrokerDatabaseService.createUnprocessedBroadcast(brokerResponse);
            }
            catch (error) {
                this.loggerService.error(`Error creating unprocessed broadcast. \r\n${error.message}`);
            }
        });
    }
    /**
     * Stop listening the Sql Service Broker
     */
    stopListening() {
        this.loggerService.info("Stop listening Sql Service Broker...");
        this.inventoryTransferBrokerServiceIsActive = false;
        this.zeroBalanceBrokerServiceIsActive = false;
    }
    // -------------------------------------------------------
    //                PRIVATE METHODS
    // -------------------------------------------------------
    createResponse(response) {
        //console.dir("response", response);
        const singleResponse = response.recordset[0];
        //console.dir("singleResponse", singleResponse);
        const brokerResponse = new sql_service_broker_response_model_1.SqlServiceBrokerResponse();
        brokerResponse.conversationId = singleResponse.conversation_handle;
        brokerResponse.messageType = singleResponse.message_type_name;
        return brokerResponse;
    }
};
SqlServiceBrokerController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [services_1.LoggerService,
        sql_service_broker_database_service_1.SqlServiceBrokerDatabaseService,
        services_1.ProductService])
], SqlServiceBrokerController);
exports.SqlServiceBrokerController = SqlServiceBrokerController;
//# sourceMappingURL=sql-service-broker.controller.js.map