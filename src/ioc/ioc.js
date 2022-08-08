"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var IoCContainer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
// Services imports
const services_1 = require("../services/services");
const server_1 = require("../server/server");
const controllers_1 = require("../request-controllers/controllers");
const socket_io_controllers_1 = require("../socket-io-controllers/socket-io.controllers");
const sql_service_broker_database_service_1 = require("../sql-service-broker/sql-service-broker.database-service");
const sql_service_broker_controller_1 = require("../sql-service-broker/sql-service-broker.controller");
let IoCContainer = IoCContainer_1 = class IoCContainer {
    /**
     * registerInstances
     */
    static registerInstances() {
        // <Services>
        IoCContainer_1.container
            .bind(services_1.DatabaseService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("DatabaseService")
            .to(services_1.DatabaseService);
        IoCContainer_1.container
            .bind(services_1.LoggerService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("LoggerService")
            .to(services_1.LoggerService);
        IoCContainer_1.container
            .bind(services_1.SecurityService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("SecurityService")
            .to(services_1.SecurityService);
        IoCContainer_1.container
            .bind(services_1.ProductService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("ProductService")
            .to(services_1.ProductService);
        IoCContainer_1.container
            .bind(services_1.CustomerService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("CustomerService")
            .to(services_1.CustomerService);
        IoCContainer_1.container
            .bind(services_1.SequenceService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("SequenceService")
            .to(services_1.SequenceService);
        IoCContainer_1.container
            .bind(services_1.ConfigurationService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("ConfigurationService")
            .to(services_1.ConfigurationService);
        IoCContainer_1.container
            .bind(services_1.SurveyService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("SurveyService")
            .to(services_1.SurveyService);
        IoCContainer_1.container
            .bind(services_1.SaleOrderService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("SaleOrderService")
            .to(services_1.SaleOrderService);
        IoCContainer_1.container
            .bind(services_1.InvoiceService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("InvoiceService")
            .to(services_1.InvoiceService);
        IoCContainer_1.container
            .bind(services_1.CustomerChangeService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("CustomerChangeService")
            .to(services_1.CustomerChangeService);
        IoCContainer_1.container
            .bind(services_1.RouteService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container.bind("RouteService").to(services_1.RouteService);
        IoCContainer_1.container
            .bind(services_1.PaymentService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("PaymentService")
            .to(services_1.PaymentService);
        IoCContainer_1.container
            .bind(services_1.PromoService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container.bind("PromoService").to(services_1.PromoService);
        IoCContainer_1.container
            .bind(services_1.ZeroBalanceService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("ZeroBalanceService")
            .to(services_1.ZeroBalanceService);
        IoCContainer_1.container
            .bind(services_1.PosByCustomerService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("PosByCustomerService")
            .to(services_1.PosByCustomerService);
        IoCContainer_1.container
            .bind(services_1.GoalService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container.bind("GoalService").to(services_1.GoalService);
        IoCContainer_1.container
            .bind(services_1.LabelTranslationService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("LabelTranslationService")
            .to(services_1.LabelTranslationService);
        // </Services>
        // <Controllers>
        IoCContainer_1.container
            .bind(controllers_1.SecurityController)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("SecurityController")
            .to(controllers_1.SecurityController);
        IoCContainer_1.container
            .bind(controllers_1.RouteInitializationController)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("RouteInitializationController")
            .to(controllers_1.RouteInitializationController);
        IoCContainer_1.container
            .bind(socket_io_controllers_1.SocketIoBaseController)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("SocketIoBaseController")
            .to(socket_io_controllers_1.SocketIoBaseController);
        IoCContainer_1.container
            .bind(socket_io_controllers_1.DataSynchronizationSocketController)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("DataSynchronizationSocketController")
            .to(socket_io_controllers_1.DataSynchronizationSocketController);
        IoCContainer_1.container
            .bind(controllers_1.CustomerController)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("CustomerController")
            .to(controllers_1.CustomerController);
        IoCContainer_1.container
            .bind(controllers_1.RouteController)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("RouteController")
            .to(controllers_1.RouteController);
        IoCContainer_1.container
            .bind(controllers_1.ZeroBalanceController)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("ZeroBalanceController")
            .to(controllers_1.ZeroBalanceController);
        // </Controllers>
        // <SqlServiceBroker>
        IoCContainer_1.container
            .bind(sql_service_broker_database_service_1.SqlServiceBrokerDatabaseService)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("SqlServiceBrokerDatabaseService")
            .to(sql_service_broker_database_service_1.SqlServiceBrokerDatabaseService);
        IoCContainer_1.container
            .bind(sql_service_broker_controller_1.SqlServiceBrokerController)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container
            .bind("SqlServiceBrokerController")
            .to(sql_service_broker_controller_1.SqlServiceBrokerController);
        // </SqlServiceBroker>
        //<server>
        IoCContainer_1.container
            .bind(server_1.EmilyServer)
            .toSelf()
            .inSingletonScope();
        IoCContainer_1.container.bind("EmilyServer").to(server_1.EmilyServer);
        //</server>
    }
};
IoCContainer.container = new inversify_1.Container();
IoCContainer = IoCContainer_1 = __decorate([
    inversify_1.injectable()
], IoCContainer);
exports.IoCContainer = IoCContainer;
//# sourceMappingURL=ioc.js.map