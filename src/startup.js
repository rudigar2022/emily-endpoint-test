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
const Os = require("os");
const Cluster = require("cluster");
const Configurations = require("./configurations/configurations.json");
const server_1 = require("./server/server");
const services_1 = require("./services/services");
const ioc_1 = require("./ioc/ioc");
let Startup = class Startup {
    constructor(server, loggerService) {
        this.server = server;
        this.loggerService = loggerService;
    }
    /**
     * initializeServerInstance
     */
    initializeServerInstance() {
        // When the server are configured for use Cluster
        if (Configurations.server.useCluster) {
            if (Cluster.isMaster) {
                //let numReqs = 0;
                const messageHandler = (_msg) => {
                    // if (msg.cmd && msg.cmd === 'notifyRequest') {
                    //   numReqs += 1;
                    // }
                };
                this.loggerService.info(`Master ${process.pid} is running`);
                // setInterval(() => {
                //   this.loggerService.info(`numReqs = ${numReqs}`);
                // }, 1000);
                // Fork worker
                for (let i = 0; i < Os.cpus().length; i++) {
                    Cluster.fork().on('message', messageHandler);
                }
                Cluster.on('exit', (worker, code, signal) => {
                    this.loggerService.warning(`Worker ${worker.process.pid} died. Code: ${code} Signal: ${signal}`);
                    this.loggerService.info(`Starting new Worker`);
                    Cluster.fork().on('message', messageHandler);
                });
            }
            else {
                this.loggerService.info(`Worker started ID: ${process.pid}`);
                this.server.initializeEmiliaServer();
            }
        }
        else {
            // When the server are configured for NOT use Cluster
            this.server.initializeEmiliaServer();
        }
    }
};
Startup = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [server_1.EmilyServer,
        services_1.LoggerService])
], Startup);
exports.Startup = Startup;
// --------------- Refister server instance -----------------
ioc_1.IoCContainer.registerInstances();
ioc_1.IoCContainer.container
    .bind(Startup)
    .toSelf()
    .inSingletonScope();
// --------------- Resolve server instance ------------------
let startup = ioc_1.IoCContainer.container.get(Startup);
startup.initializeServerInstance();
//# sourceMappingURL=startup.js.map