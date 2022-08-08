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
const mssql = require("mssql");
const Configurations = require("../configurations/configurations.json");
let SqlServiceBrokerDatabaseService = class SqlServiceBrokerDatabaseService {
    constructor() {
        this.connectionConfiguration = Configurations.database.driverConfiguration;
        this.dbPool = new mssql.ConnectionPool(this.connectionConfiguration);
    }
    /**
     * Open a Database Request with the current Connection Pool
     */
    openRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.dbPool || !this.dbPool.connected) {
                yield this.dbPool.connect();
            }
            return new mssql.Request(this.dbPool);
        });
    }
    /**
     * getBrokerMessages
     */
    getBrokerMessages(queue, messagesCount = 1, timeout = 5000) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `WAITFOR (  
            RECEIVE TOP (@count)
              conversation_group_id,
              conversation_handle,
              message_sequence_number,
              message_body, 
              message_type_id,
              message_type_name,
              priority,
              queuing_order,
              service_contract_id,
              service_contract_name,
              service_id,
              service_name,
              status,
              validation
            FROM [${queue}]  
          ), TIMEOUT @timeout`;
                const request = yield this.openRequest();
                request.input("count", mssql.TYPES.Int, messagesCount);
                request.input("timeout", mssql.TYPES.Int, timeout);
                return new Promise((resolve, reject) => {
                    request.query(query, (error, results) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        if (!results || !results.recordset || !results.recordset.length) {
                            resolve(null);
                            return;
                        }
                        resolve(results);
                    });
                });
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    /**
     * createUnprocessedBroadcast
     */
    createUnprocessedBroadcast(brokerMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.openRequest();
            request.verbose = Configurations.server.verboseDatabaseRequest;
            request.input("LoginID", brokerMessage.loginId);
            request.input("ConversationID", brokerMessage.conversationId);
            request.input("MessageType", brokerMessage.messageType);
            request.input("MessageBody", brokerMessage.messageBody);
            request.input("MessageStatus", "NEW");
            yield request.execute(`[${Configurations.database.databaseSchema}].[CreateUnprocessedBroadcast]`);
        });
    }
};
SqlServiceBrokerDatabaseService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], SqlServiceBrokerDatabaseService);
exports.SqlServiceBrokerDatabaseService = SqlServiceBrokerDatabaseService;
//# sourceMappingURL=sql-service-broker.database-service.js.map