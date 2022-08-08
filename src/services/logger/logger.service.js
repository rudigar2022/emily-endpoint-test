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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
const Winston = require("winston");
const WinstonDailyRotateFile = require("winston-daily-rotate-file");
const Configurations = require("../../configurations/configurations.json");
let LoggerService = class LoggerService {
    /**
     * Default LoggerService Constructor
     */
    constructor() {
        this.logger = Winston.createLogger({
            level: "info",
            levels: Winston.config.npm.levels,
            format: Winston.format.combine(Winston.format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss",
            }), Winston.format.errors({ stack: true }), Winston.format.splat(), Winston.format.json()),
            exitOnError: false,
            silent: false,
            transports: [
                //
                // - Write to all logs with level `info` and below to `combined.log`
                // - Write all logs error (and below) to `error.log`.
                //
                new Winston.transports.File({
                    filename: `logs/${Configurations.winstonLogger.infoFileName}.log`,
                }),
                new WinstonDailyRotateFile({
                    filename: `logs/${Configurations.winstonLogger.errorsFileName}-%DATE%.log`,
                    datePattern: "YYYY-MM-DD",
                }),
            ],
        });
        // If we're not in production then **ALSO** log to the `console`
        // with the colorized simple format.
        //
        if (Configurations.winstonLogger.environment !== "production") {
            this.logger.add(new Winston.transports.Console({
                format: Winston.format.combine(Winston.format.colorize(), Winston.format.simple()),
            }));
        }
    }
    /**
     * debug
     */
    debug(formattedMessage) {
        this.logger.debug(formattedMessage);
    }
    /**
     * verbose
     */
    verbose(formattedMessage) {
        this.logger.verbose(formattedMessage);
    }
    /**
     * info
     */
    info(formattedMessage) {
        this.logger.info(formattedMessage);
    }
    /**
     * warning
     */
    warning(formattedMessage) {
        this.logger.warn(formattedMessage);
    }
    /**
     * error
     */
    error(formattedMessage) {
        this.logger.error(formattedMessage);
    }
};
LoggerService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], LoggerService);
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map