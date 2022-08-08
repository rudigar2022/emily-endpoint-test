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
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const SocketIo = require("socket.io");
const Os = require("os");
const http = require("http");
const pathModule = require("path");
// Services imports
const services_1 = require("../services/services");
const utilities_1 = require("../utilities/utilities");
const Configurations = require("../configurations/configurations.json");
const controllers_1 = require("../request-controllers/controllers");
const socket_io_controllers_1 = require("../socket-io-controllers/socket-io.controllers");
const sql_service_broker_controller_1 = require("../sql-service-broker/sql-service-broker.controller");
let EmilyServer = class EmilyServer {
    // -------------------------------------------------------------------------
    /**
     * Default EmilyServer constructor
     */
    constructor(loggerService, securityController, routeInitializationController, dataSynchronizationSocketController, customerController, routeController, sqlServiceBrokerController, zeroBalanceController) {
        this.loggerService = loggerService;
        this.securityController = securityController;
        this.routeInitializationController = routeInitializationController;
        this.dataSynchronizationSocketController = dataSynchronizationSocketController;
        this.customerController = customerController;
        this.routeController = routeController;
        this.sqlServiceBrokerController = sqlServiceBrokerController;
        this.zeroBalanceController = zeroBalanceController;
        this.addresses = [];
    }
    /**
     * Retrieves the IP's availables on system
     */
    bindIpAddresses() {
        let self = this;
        for (let k in self.interfaces) {
            for (let k2 in self.interfaces[k]) {
                let address = self.interfaces[k][k2];
                if (address.family === "IPv4" && !address.internal) {
                    self.addresses.push(address.address);
                }
            }
        }
    }
    /**
     * Initialize the EmiliaServer
     */
    initializeEmiliaServer() {
        let self = this;
        self.interfaces = Os.networkInterfaces();
        try {
            self.bindIpAddresses();
            self.app = express();
            self.app.use(bodyParser.json({ limit: "50mb" }));
            self.app.use(bodyParser.urlencoded({
                limit: "50mb",
                extended: true,
                parameterLimit: 50000,
            }));
            self.app.use(cors());
            self.app.options("*", cors());
            // self.app.use(SecurityController.challengeAuthorizer);
            self.app.use(express.static(pathModule.join(__dirname, "../public")));
            self.prepareApiRoutes(self.app, () => {
                // Home Page
                self.app.get("/", controllers_1.SecurityController.challengeAuthorizer, (_request, response) => {
                    response
                        .status(200)
                        .sendFile(pathModule.join(__dirname, "../public/index.html"));
                });
                // Hand Shake (Used by Emilia App)
                self.app.get("/handshake", (_request, response) => {
                    response
                        .status(200)
                        .json({ status: "OK", message: "API running!!!" });
                });
                // Creates the Http Server
                self.server = new http.Server(self.app);
                self.server.listen(Configurations.server.portToListen);
                self.loggerService.info(`Node JS API (${Configurations.server.version}) listening on ${self.addresses} port: ${Configurations.server.portToListen}`);
                // Attach the Http Server to SocketIO
                self.socketIoServer = SocketIo(self.server);
                //Configure SocketIO Connections
                self.socketIoServer.sockets.on(utilities_1.Enums.Socket.OwnEvents.Connection, (socket) => {
                    self.loggerService.info(`Route ${socket.handshake.query.login} connected with socket ID ${socket.id}`);
                    socket.on(utilities_1.Enums.Socket.OwnEvents.Disconnect, () => {
                        self.loggerService.info(`Route ${socket.handshake.query.login} with socket ID ${socket.id} has been lost connection.`);
                    });
                    self.configureEventListeners(socket);
                });
                //Handle Inventory Transfer Message Broker
                if (Configurations.server.useSqlServiceBroker) {
                    self.sqlServiceBrokerController.on("SQL_BROKER_MESSAGE", (brokerMessage) => {
                        self.loggerService.info("Receiving Sql Service Broker Message...");
                        //console.dir(brokerMessage);
                        self.socketIoServer.sockets.emit(brokerMessage.messageType, brokerMessage);
                    });
                    self.sqlServiceBrokerController.startListeningInventoryTransferQueue();
                    self.sqlServiceBrokerController.startListeningZeroBalanceQueue();
                }
            });
        }
        catch (error) {
            self.loggerService.error(`API is not runnig :${error}`);
        }
    }
    /**
     * Prepares the routes that will be used on the API
     * @param app The current instance of Express App
     * @param callback A function used to return to the main process
     */
    prepareApiRoutes(app, callback) {
        let router = express.Router();
        this.securityController.prepareSecurityControllerRoutes(router);
        this.routeInitializationController.prepareRouteSynchronizationControllerRoutes(router);
        this.customerController.prepareCustomerControllerRoutes(router);
        this.routeController.prepareRouteControllerRoutes(router);
        this.dataSynchronizationSocketController.prepareDataSynchronizationSocketControllerRoutes(router);
        this.zeroBalanceController.prepareZeroBalanceControllerRoutes(router);
        app.use(Configurations.server.endpoint, router);
        callback();
    }
    configureEventListeners(socketIo) {
        this.dataSynchronizationSocketController.configureDataSynchronizationHandlers(socketIo);
    }
};
EmilyServer = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [services_1.LoggerService,
        controllers_1.SecurityController,
        controllers_1.RouteInitializationController,
        socket_io_controllers_1.DataSynchronizationSocketController,
        controllers_1.CustomerController,
        controllers_1.RouteController,
        sql_service_broker_controller_1.SqlServiceBrokerController,
        controllers_1.ZeroBalanceController])
], EmilyServer);
exports.EmilyServer = EmilyServer;
//# sourceMappingURL=server.js.map