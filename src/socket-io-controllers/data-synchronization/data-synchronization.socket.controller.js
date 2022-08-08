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
const Responses = require("../../models/responses/responses");
const socket_io_base_controller_1 = require("../socket-io-base-controller/socket-io-base.controller");
const services_1 = require("../../services/services");
const utilities_1 = require("../../utilities/utilities");
let DataSynchronizationSocketController = class DataSynchronizationSocketController {
    constructor(socketIoBaseController, customerService, loggerService, surveyService, saleOrderService, invoiceService, customerChangesService, paymentService, routeService, goalService) {
        this.socketIoBaseController = socketIoBaseController;
        this.customerService = customerService;
        this.loggerService = loggerService;
        this.surveyService = surveyService;
        this.saleOrderService = saleOrderService;
        this.invoiceService = invoiceService;
        this.customerChangesService = customerChangesService;
        this.paymentService = paymentService;
        this.routeService = routeService;
        this.goalService = goalService;
    }
    /**
     * configureDataSynchronizationHandlers
     */
    configureDataSynchronizationHandlers(socket) {
        this.socketIoBaseController.addListener(socket, utilities_1.Enums.Socket.Request.DataSinchronization, utilities_1.Enums.Socket.Response.DataSinchronizationResult, (dataToSynchronize) => {
            return this.synchronizeRouteDocuments(dataToSynchronize, socket.handshake.query.login);
        });
        this.socketIoBaseController.addListener(socket, utilities_1.Enums.Socket.Request.CloseInventoryTransfer, utilities_1.Enums.Socket.Response.CloseInventoryTransferResponse, (message) => {
            // console.dir(message);
            return this.closeBrokerConversation(message);
        });
        this.socketIoBaseController.addListener(socket, utilities_1.Enums.Socket.Request.CloseZeroBalance, utilities_1.Enums.Socket.Response.CloseZeroBalanceResponse, (message) => {
            // console.dir(message);
            return this.closeBrokerConversation(message);
        });
    }
    /**
     * prepareDataSynchronizationSocketControllerRoutes
     */
    prepareDataSynchronizationSocketControllerRoutes(router) {
        router
            .route("/synchronization/synchronizeroutedocuments")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            var dataToSynchronize = request.body;
            var synchronizationResponse = yield this.synchronizeRouteDocuments(dataToSynchronize, dataToSynchronize.login);
            response.status(200).json(synchronizationResponse);
        }));
    }
    /**
     * synchronizeRouteDocuments
     */
    synchronizeRouteDocuments(dataToSynchronize, loginId) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Creates a new empty response
             */
            const processResponse = new Responses.ProcessResponse();
            /**
             * Creates an empty data to return
             */
            let dataResponse;
            /**
             * Try synchronize data to the Database
             */
            try {
                /**
                 * Used for search the process that needs to be executed
                 * based on data type that wants to be synchronized
                 */
                switch (dataToSynchronize.dataType) {
                    case utilities_1.Enums.RouteData.Customers:
                        dataResponse = yield this.synchronizeNewCustomers(dataToSynchronize);
                        break;
                    case utilities_1.Enums.RouteData.Survey:
                        dataResponse = yield this.synchronizeSurveysProcessed(dataToSynchronize);
                        break;
                    case utilities_1.Enums.RouteData.SaleOrder:
                        dataResponse = yield this.synchronizeSalesOrders(dataToSynchronize);
                        break;
                    case utilities_1.Enums.RouteData.Invoice:
                        dataResponse = yield this.synchronizeInvoices(dataToSynchronize);
                        break;
                    case utilities_1.Enums.RouteData.VisitCanceled:
                        dataResponse = yield this.synchronizeCanceledVisits(dataToSynchronize);
                        break;
                    case utilities_1.Enums.RouteData.CustomerChange:
                        dataResponse = yield this.synchronizeCustomerChanges(dataToSynchronize);
                        break;
                    case utilities_1.Enums.RouteData.UnpaidBills:
                        dataResponse = yield this.synchronizeReceipts(dataToSynchronize);
                        break;
                    case utilities_1.Enums.RouteData.CreditNote:
                        dataResponse = yield this.synchronizeCreditNotes(dataToSynchronize);
                        break;
                    case utilities_1.Enums.RouteData.GoalGeneralCurrentAmount:
                        dataResponse = yield this.synchronizeGoalGeneralOfSaleOrder(dataToSynchronize);
                        break;
                    case utilities_1.Enums.RouteData.GoalPosByAirTimeCurrentQty:
                        dataResponse = yield this.synchronizeGoalPosByAirTimeOfSaleOrder(dataToSynchronize);
                        break;
                    default:
                        break;
                }
                /**
                 * Fill the response when the process has been executed successfully
                 */
                dataToSynchronize.data = dataResponse;
                processResponse.resource = dataToSynchronize;
                processResponse.success = true;
            }
            catch (error) {
                this.loggerService.info(`Synchronization of type ${dataToSynchronize.dataType} for route ${loginId} failed.`);
                this.loggerService.error(JSON.stringify(error));
                processResponse.errors = [error.message || error];
            }
            return processResponse;
        });
    }
    /**
     * New Customers handler
     */
    synchronizeNewCustomers(dataToSynchronize) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loggerService.info("Executing handler for New Customers synchronization...");
            const customersResponse = yield this.customerService.createNewCustomers(dataToSynchronize.data);
            return customersResponse;
        });
    }
    /**
     * synchronizeSurveysProcessed
     */
    synchronizeSurveysProcessed(dataToSynchronize) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loggerService.info(`Executing handler for surveys processed synchronization...`);
            const surveysProcessed = yield this.surveyService.synchronizeSurveys(dataToSynchronize.data);
            return surveysProcessed;
        });
    }
    /**
     * synchronizeSalesOrders
     */
    synchronizeSalesOrders(dataToSynchronize) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loggerService.info(`Executing handler for sales orders synchronization...`);
            const salesOrdersProcessed = yield this.saleOrderService.synchronizeSalesOrders(dataToSynchronize.data);
            return salesOrdersProcessed;
        });
    }
    /**
     * synchronizeSalesOrders
     */
    synchronizeInvoices(dataToSynchronize) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loggerService.info(`Executing handler for invoices synchronization...`);
            let invoicesProcessed = yield this.invoiceService.synchronizeInvoices(dataToSynchronize.data);
            return invoicesProcessed;
        });
    }
    /**
     * synchronizeSalesOrders
     */
    synchronizeCanceledVisits(dataToSynchronize) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loggerService.info(`Executing handler for canceled visits synchronization...`);
            let canceledVisitsProcessed = yield this.customerService.createCanceledVisits(dataToSynchronize.data);
            return canceledVisitsProcessed;
        });
    }
    /**
     * synchronizeCustomerChanges
     */
    synchronizeCustomerChanges(dataToSynchronize) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loggerService.info("Executing handler for customer changes synchronization...");
            let customerChangesProcessed = yield this.customerChangesService.saveCustomerChanges(dataToSynchronize.data);
            return customerChangesProcessed;
        });
    }
    /**
     * synchronizeReceipts
     */
    synchronizeReceipts(dataToSynchronize) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loggerService.info("Executing handler for receipts synchronization...");
            let customerChangesProcessed = yield this.paymentService.synchronizeReceipts(dataToSynchronize.data);
            return customerChangesProcessed;
        });
    }
    /**
     * synchronizeCreditNotes
     */
    synchronizeCreditNotes(dataToSynchronize) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loggerService.info("Executing handler for credit notes synchronization...");
            let creditNotesProcessed = yield this.paymentService.synchronizeCreditNotes(dataToSynchronize.data);
            return creditNotesProcessed;
        });
    }
    /**
     * async closeBrokerConversation
     */
    closeBrokerConversation(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loggerService.info("Closing broker message...");
            yield this.routeService.finalizeBroadcast(message);
            if (message &&
                message.messageType &&
                message.messageType === "Emilia_Inventory_Transfer_Message") {
                try {
                    const inventoryTransfer = JSON.parse(message.messageBody);
                    yield this.routeService.changeInventoryTransferStatus(inventoryTransfer);
                }
                catch (error) {
                    this.loggerService.error(error);
                    this.loggerService.info(`Error updating inventory transfer status. ${error.message || error}`);
                }
            }
        });
    }
    /**
     * synchronizeGoalGeneralOfSaleOrder
     */
    synchronizeGoalGeneralOfSaleOrder(dataToSynchronize) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loggerService.info(`Executing handler for goal general synchronization...`);
            const result = yield this.goalService.synchronizeGoalGeneralOfOrders(dataToSynchronize.data);
            return result;
        });
    }
    /**
     * synchronizeGoalPosByAirTimeOfSaleOrder
     */
    synchronizeGoalPosByAirTimeOfSaleOrder(dataToSynchronize) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loggerService.info(`Executing handler for goal pos by air time synchronization...`);
            const result = yield this.goalService.synchronizeGoalPosByAirTimeOfOrders(dataToSynchronize.data);
            return result;
        });
    }
};
DataSynchronizationSocketController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [socket_io_base_controller_1.SocketIoBaseController,
        services_1.CustomerService,
        services_1.LoggerService,
        services_1.SurveyService,
        services_1.SaleOrderService,
        services_1.InvoiceService,
        services_1.CustomerChangeService,
        services_1.PaymentService,
        services_1.RouteService,
        services_1.GoalService])
], DataSynchronizationSocketController);
exports.DataSynchronizationSocketController = DataSynchronizationSocketController;
//# sourceMappingURL=data-synchronization.socket.controller.js.map