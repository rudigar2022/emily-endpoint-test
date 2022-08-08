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
let SocketIoBaseController = class SocketIoBaseController {
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    /**
     * Configure a listener for a specific Socket IO event and register the respective handler
     * @param socket The socket that are connected to the server
     * @param request The name of the event that will be executed on Socket IO
     * @param response The name of the event that will be returned by Socket IO 'emit' function
     * @param handler A Service or Controller method that will handle the Socket IO event execution
     */
    addListener(socket, request, response, handler) {
        socket.on(request, (data) => __awaiter(this, void 0, void 0, function* () {
            this.loggerService.info(`Executing ${request} for route ${socket.handshake.query.login}...`);
            try {
                let result = yield handler(data);
                socket.emit(response, result);
                this.loggerService.info(`${request} execution completed for ${socket.handshake.query.login}`);
            }
            catch (error) {
                this.loggerService.error(`${request} execution failed for ${socket.handshake.query.login}`);
                this.loggerService.error(JSON.stringify(error));
            }
        }));
    }
};
SocketIoBaseController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [services_1.LoggerService])
], SocketIoBaseController);
exports.SocketIoBaseController = SocketIoBaseController;
//# sourceMappingURL=socket-io-base.controller.js.map