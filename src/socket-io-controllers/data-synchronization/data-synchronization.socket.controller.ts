import { injectable } from "inversify";
import "reflect-metadata";

import * as SocketIo from "socket.io";
import * as express from "express";
import * as expressCore from "express-serve-static-core";

import * as Models from "../../models/models";
import * as Responses from "../../models/responses/responses";

import { SocketIoBaseController } from "../socket-io-base-controller/socket-io-base.controller";

import {
  CustomerService,
  LoggerService,
  SurveyService,
  SaleOrderService,
  InvoiceService,
  CustomerChangeService,
  PaymentService,
  RouteService,
  GoalService,
} from "../../services/services";

import { Enums } from "../../utilities/utilities";
import { SqlServiceBrokerResponse } from "../../sql-service-broker/sql-service-broker-response.model";
import { InventoryTransfer } from "../../models/models";

@injectable()
export class DataSynchronizationSocketController {
  constructor(
    private socketIoBaseController: SocketIoBaseController,
    private customerService: CustomerService,
    private loggerService: LoggerService,
    private surveyService: SurveyService,
    private saleOrderService: SaleOrderService,
    private invoiceService: InvoiceService,
    private customerChangesService: CustomerChangeService,
    private paymentService: PaymentService,
    private routeService: RouteService,
    private goalService: GoalService
  ) {}

  /**
   * configureDataSynchronizationHandlers
   */
  public configureDataSynchronizationHandlers(socket: SocketIo.Socket): void {
    this.socketIoBaseController.addListener<
      Models.RouteData<any>,
      Responses.ProcessResponse<Models.RouteData<any>>
    >(
      socket,
      Enums.Socket.Request.DataSinchronization,
      Enums.Socket.Response.DataSinchronizationResult,
      (
        dataToSynchronize: Models.RouteData<any>
      ): Promise<Responses.ProcessResponse<Models.RouteData<any>>> => {
        return this.synchronizeRouteDocuments(
          dataToSynchronize,
          socket.handshake.query.login
        );
      }
    );

    this.socketIoBaseController.addListener<SqlServiceBrokerResponse, void>(
      socket,
      Enums.Socket.Request.CloseInventoryTransfer,
      Enums.Socket.Response.CloseInventoryTransferResponse,
      (message: SqlServiceBrokerResponse): Promise<void> => {
        // console.dir(message);
        return this.closeBrokerConversation(message);
      }
    );

    this.socketIoBaseController.addListener<SqlServiceBrokerResponse, void>(
      socket,
      Enums.Socket.Request.CloseZeroBalance,
      Enums.Socket.Response.CloseZeroBalanceResponse,
      (message: SqlServiceBrokerResponse): Promise<void> => {
        // console.dir(message);
        return this.closeBrokerConversation(message);
      }
    );
  }

  /**
   * prepareDataSynchronizationSocketControllerRoutes
   */
  public prepareDataSynchronizationSocketControllerRoutes(
    router: express.Router
  ): void {
    router
      .route("/synchronization/synchronizeroutedocuments")
      .post(
        async (
          request: expressCore.Request,
          response: expressCore.Response
        ) => {
          var dataToSynchronize: Models.RouteData<any> = request.body;
          var synchronizationResponse = await this.synchronizeRouteDocuments(
            dataToSynchronize,
            dataToSynchronize.login
          );
          response.status(200).json(synchronizationResponse);
        }
      );
  }

  /**
   * synchronizeRouteDocuments
   */
  public async synchronizeRouteDocuments(
    dataToSynchronize: Models.RouteData<any>,
    loginId: string
  ): Promise<Responses.ProcessResponse<Models.RouteData<any>>> {
    /**
     * Creates a new empty response
     */
    const processResponse: Responses.ProcessResponse<Models.RouteData<any>> =
      new Responses.ProcessResponse<Models.RouteData<any>>();

    /**
     * Creates an empty data to return
     */
    let dataResponse: Array<any>;

    /**
     * Try synchronize data to the Database
     */
    try {
      /**
       * Used for search the process that needs to be executed
       * based on data type that wants to be synchronized
       */
      switch (dataToSynchronize.dataType) {
        case Enums.RouteData.Customers:
          dataResponse = await this.synchronizeNewCustomers(dataToSynchronize);
          break;

        case Enums.RouteData.Survey:
          dataResponse = await this.synchronizeSurveysProcessed(
            dataToSynchronize
          );
          break;

        case Enums.RouteData.SaleOrder:
          dataResponse = await this.synchronizeSalesOrders(dataToSynchronize);
          break;

        case Enums.RouteData.Invoice:
          dataResponse = await this.synchronizeInvoices(dataToSynchronize);
          break;

        case Enums.RouteData.VisitCanceled:
          dataResponse = await this.synchronizeCanceledVisits(
            dataToSynchronize
          );
          break;

        case Enums.RouteData.CustomerChange:
          dataResponse = await this.synchronizeCustomerChanges(
            dataToSynchronize
          );
          break;

        case Enums.RouteData.UnpaidBills:
          dataResponse = await this.synchronizeReceipts(dataToSynchronize);
          break;

        case Enums.RouteData.CreditNote:
          dataResponse = await this.synchronizeCreditNotes(dataToSynchronize);
          break;

        case Enums.RouteData.GoalGeneralCurrentAmount:
          dataResponse = await this.synchronizeGoalGeneralOfSaleOrder(
            dataToSynchronize
          );
          break;

        case Enums.RouteData.GoalPosByAirTimeCurrentQty:
          dataResponse = await this.synchronizeGoalPosByAirTimeOfSaleOrder(
            dataToSynchronize
          );
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
    } catch (error) {
      this.loggerService.info(
        `Synchronization of type ${dataToSynchronize.dataType} for route ${loginId} failed.`
      );
      this.loggerService.error(JSON.stringify(error));

      processResponse.errors = [error.message || error];
    }

    return processResponse;
  }

  /**
   * New Customers handler
   */
  private async synchronizeNewCustomers(
    dataToSynchronize: Models.RouteData<any>
  ): Promise<Array<Models.Customer>> {
    this.loggerService.info(
      "Executing handler for New Customers synchronization..."
    );
    const customersResponse = await this.customerService.createNewCustomers(
      dataToSynchronize.data
    );

    return customersResponse;
  }

  /**
   * synchronizeSurveysProcessed
   */
  private async synchronizeSurveysProcessed(
    dataToSynchronize: Models.RouteData<Models.SurveyProcessed>
  ): Promise<Array<Models.SurveyProcessed>> {
    this.loggerService.info(
      `Executing handler for surveys processed synchronization...`
    );

    const surveysProcessed = await this.surveyService.synchronizeSurveys(
      dataToSynchronize.data
    );

    return surveysProcessed;
  }

  /**
   * synchronizeSalesOrders
   */
  private async synchronizeSalesOrders(
    dataToSynchronize: Models.RouteData<Models.SaleDocument>
  ): Promise<Array<Models.SaleDocument>> {
    this.loggerService.info(
      `Executing handler for sales orders synchronization...`
    );

    const salesOrdersProcessed =
      await this.saleOrderService.synchronizeSalesOrders(
        dataToSynchronize.data
      );

    return salesOrdersProcessed;
  }

  /**
   * synchronizeSalesOrders
   */
  private async synchronizeInvoices(
    dataToSynchronize: Models.RouteData<Models.SaleDocument>
  ): Promise<Array<Models.SaleDocument>> {
    this.loggerService.info(
      `Executing handler for invoices synchronization...`
    );

    let invoicesProcessed: Array<Models.SaleDocument> =
      await this.invoiceService.synchronizeInvoices(dataToSynchronize.data);

    return invoicesProcessed;
  }

  /**
   * synchronizeSalesOrders
   */
  private async synchronizeCanceledVisits(
    dataToSynchronize: Models.RouteData<Models.VisitCanceled>
  ): Promise<Array<Models.VisitCanceled>> {
    this.loggerService.info(
      `Executing handler for canceled visits synchronization...`
    );

    let canceledVisitsProcessed: Array<Models.VisitCanceled> =
      await this.customerService.createCanceledVisits(dataToSynchronize.data);

    return canceledVisitsProcessed;
  }

  /**
   * synchronizeCustomerChanges
   */
  public async synchronizeCustomerChanges(
    dataToSynchronize: Models.RouteData<Models.Customer>
  ): Promise<Array<Models.Customer>> {
    this.loggerService.info(
      "Executing handler for customer changes synchronization..."
    );

    let customerChangesProcessed: Array<Models.Customer> =
      await this.customerChangesService.saveCustomerChanges(
        dataToSynchronize.data
      );

    return customerChangesProcessed;
  }

  /**
   * synchronizeReceipts
   */
  public async synchronizeReceipts(
    dataToSynchronize: Models.RouteData<Models.Receipt>
  ): Promise<Array<Models.Receipt>> {
    this.loggerService.info(
      "Executing handler for receipts synchronization..."
    );

    let customerChangesProcessed: Array<Models.Receipt> =
      await this.paymentService.synchronizeReceipts(dataToSynchronize.data);

    return customerChangesProcessed;
  }

  /**
   * synchronizeCreditNotes
   */
  public async synchronizeCreditNotes(
    dataToSynchronize: Models.RouteData<Models.CreditNote>
  ): Promise<Array<Models.CreditNote>> {
    this.loggerService.info(
      "Executing handler for credit notes synchronization..."
    );

    let creditNotesProcessed: Array<Models.CreditNote> =
      await this.paymentService.synchronizeCreditNotes(dataToSynchronize.data);

    return creditNotesProcessed;
  }

  /**
   * async closeBrokerConversation
   */
  public async closeBrokerConversation(
    message: SqlServiceBrokerResponse
  ): Promise<void> {
    this.loggerService.info("Closing broker message...");

    await this.routeService.finalizeBroadcast(message);

    if (
      message &&
      message.messageType &&
      message.messageType === "Emilia_Inventory_Transfer_Message"
    ) {
      try {
        const inventoryTransfer: InventoryTransfer = JSON.parse(
          message.messageBody
        );

        await this.routeService.changeInventoryTransferStatus(
          inventoryTransfer
        );
      } catch (error) {
        this.loggerService.error(error);

        this.loggerService.info(
          `Error updating inventory transfer status. ${error.message || error}`
        );
      }
    }
  }

  /**
   * synchronizeGoalGeneralOfSaleOrder
   */
  private async synchronizeGoalGeneralOfSaleOrder(
    dataToSynchronize: Models.RouteData<Models.GoalCurrent>
  ): Promise<Array<Models.GoalCurrent>> {
    this.loggerService.info(
      `Executing handler for goal general synchronization...`
    );

    const result = await this.goalService.synchronizeGoalGeneralOfOrders(
      dataToSynchronize.data
    );

    return result;
  }

  /**
   * synchronizeGoalPosByAirTimeOfSaleOrder
   */
  private async synchronizeGoalPosByAirTimeOfSaleOrder(
    dataToSynchronize: Models.RouteData<Models.GoalCurrent>
  ): Promise<Array<Models.GoalCurrent>> {
    this.loggerService.info(
      `Executing handler for goal pos by air time synchronization...`
    );

    const result = await this.goalService.synchronizeGoalPosByAirTimeOfOrders(
      dataToSynchronize.data
    );

    return result;
  }
}
