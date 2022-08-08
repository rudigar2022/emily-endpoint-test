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
const Configurations = require("../../configurations/configurations.json");
const logger_service_1 = require("../logger/logger.service");
let DatabaseService = class DatabaseService {
    /**
     * Default DabaseService constructor
     */
    constructor(loggerService) {
        this.loggerService = loggerService;
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
     * Execute an object on Database
     * @param objectName The object's name to execute
     * @param objectParammeters An array of data if the Database Object to execute use parameters
     */
    executeDatabaseObject(objectName, objectParammeters) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.loggerService.info(`Init execution for ${objectName}`);
                // Prepare objects to use
                let requestWithError = false;
                let results = [];
                let request = yield this.openRequest();
                request.stream = true;
                request.verbose =
                    Configurations.server.verboseDatabaseRequest || false;
                // Prepare parameters
                if (objectParammeters) {
                    objectParammeters.forEach((parameter) => {
                        request.input(parameter.name, parameter.value);
                    });
                }
                // Prepare handlers
                request.on("row", (row) => {
                    results.push(row);
                });
                request.on("error", (error) => {
                    this.loggerService.error(`Execution of ${objectName} failed. Error => ${JSON.stringify(error)}`);
                    requestWithError = true;
                    reject(error);
                });
                request.on("done", () => {
                    if (!requestWithError) {
                        this.loggerService.info(`Execution of ${objectName} completed...`);
                        resolve(results);
                    }
                });
                // Execute object
                yield request.execute(objectName);
            }
            catch (error) {
                this.loggerService.error(`Execution intent of ${objectName} failed. Error => ${JSON.stringify(error)}`);
                reject(error);
            }
        }));
    }
};
DatabaseService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map