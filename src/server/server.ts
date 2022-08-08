import { injectable } from "inversify";

import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as SocketIo from "socket.io";
import * as Os from "os";
import * as http from "http";
import * as pathModule from "path";

// Services imports
import { LoggerService } from "../services/services";

import { Enums } from "../utilities/utilities";

import * as Configurations from "../configurations/configurations.json";

import {
  SecurityController,
  RouteInitializationController,
  CustomerController,
  RouteController,
  ZeroBalanceController,
} from "../request-controllers/controllers";

import { DataSynchronizationSocketController } from "../socket-io-controllers/socket-io.controllers";
import { SqlServiceBrokerController } from "../sql-service-broker/sql-service-broker.controller";
import { SqlServiceBrokerResponse } from "../sql-service-broker/sql-service-broker-response.model";

@injectable()
export class EmilyServer {
  private app: express.Express;
  private server: http.Server;

  // ------------ SocketIO ---------------------------------------------------
  public socketIoServer: SocketIO.Server;

  private interfaces: { [index: string]: Array<Os.NetworkInterfaceInfo> };
  private addresses: Array<any> = [];
  // -------------------------------------------------------------------------

  /**
   * Default EmilyServer constructor
   */
  constructor(
    private loggerService: LoggerService,
    private securityController: SecurityController,
    private routeInitializationController: RouteInitializationController,
    private dataSynchronizationSocketController: DataSynchronizationSocketController,
    private customerController: CustomerController,
    private routeController: RouteController,
    private sqlServiceBrokerController: SqlServiceBrokerController,
    private zeroBalanceController: ZeroBalanceController
  ) {}

  /**
   * Retrieves the IP's availables on system
   */
  private bindIpAddresses(): void {
    let self: EmilyServer = this;
    for (let k in self.interfaces) {
      for (let k2 in self.interfaces[k]) {
        let address: any = self.interfaces[k][k2];
        if (address.family === "IPv4" && !address.internal) {
          self.addresses.push(address.address);
        }
      }
    }
  }

  /**
   * Initialize the EmiliaServer
   */
  initializeEmiliaServer(): void {
    let self: EmilyServer = this;

    self.interfaces = Os.networkInterfaces();
    try {
      self.bindIpAddresses();

      self.app = express();

      self.app.use(bodyParser.json({ limit: "50mb" }));

      self.app.use(
        bodyParser.urlencoded({
          limit: "50mb",
          extended: true,
          parameterLimit: 50000,
        })
      );

      self.app.use(cors());

      self.app.options("*", cors());

      // self.app.use(SecurityController.challengeAuthorizer);

      self.app.use(express.static(pathModule.join(__dirname, "../public")));

      self.prepareApiRoutes(self.app, () => {
        // Home Page
        self.app.get(
          "/",
          SecurityController.challengeAuthorizer,
          (_request, response) => {
            response
              .status(200)
              .sendFile(pathModule.join(__dirname, "../public/index.html"));
          }
        );

        // Hand Shake (Used by Emilia App)
        self.app.get("/handshake", (_request, response) => {
          response
            .status(200)
            .json({ status: "OK", message: "API running!!!" });
        });

        // Creates the Http Server
        self.server = new http.Server(self.app);
        self.server.listen(Configurations.server.portToListen);

        self.loggerService.info(
          `Node JS API (${Configurations.server.version}) listening on ${self.addresses} port: ${Configurations.server.portToListen}`
        );

        // Attach the Http Server to SocketIO
        self.socketIoServer = SocketIo(self.server);

        //Configure SocketIO Connections
        self.socketIoServer.sockets.on(
          Enums.Socket.OwnEvents.Connection,
          (socket: SocketIO.Socket) => {
            self.loggerService.info(
              `Route ${socket.handshake.query.login} connected with socket ID ${socket.id}`
            );

            socket.on(Enums.Socket.OwnEvents.Disconnect, () => {
              self.loggerService.info(
                `Route ${socket.handshake.query.login} with socket ID ${socket.id} has been lost connection.`
              );
            });
            self.configureEventListeners(socket);
          }
        );

        //Handle Inventory Transfer Message Broker
        if (Configurations.server.useSqlServiceBroker) {
          self.sqlServiceBrokerController.on(
            "SQL_BROKER_MESSAGE",
            (brokerMessage: SqlServiceBrokerResponse) => {
              self.loggerService.info(
                "Receiving Sql Service Broker Message..."
              );
              //console.dir(brokerMessage);
              self.socketIoServer.sockets.emit(
                brokerMessage.messageType,
                brokerMessage
              );
            }
          );
          
          self.sqlServiceBrokerController.startListeningInventoryTransferQueue();
          self.sqlServiceBrokerController.startListeningZeroBalanceQueue();
        }
      });
    } catch (error) {
      self.loggerService.error(`API is not runnig :${error}`);
    }
  }

  /**
   * Prepares the routes that will be used on the API
   * @param app The current instance of Express App
   * @param callback A function used to return to the main process
   */
  public prepareApiRoutes(app: express.Express, callback: () => void): void {
    let router = express.Router();

    this.securityController.prepareSecurityControllerRoutes(router);
    this.routeInitializationController.prepareRouteSynchronizationControllerRoutes(
      router
    );
    this.customerController.prepareCustomerControllerRoutes(router);
    this.routeController.prepareRouteControllerRoutes(router);
    this.dataSynchronizationSocketController.prepareDataSynchronizationSocketControllerRoutes(
      router
    );
    this.zeroBalanceController.prepareZeroBalanceControllerRoutes(router);

    app.use(Configurations.server.endpoint, router);
    callback();
  }

  private configureEventListeners(socketIo: SocketIo.Socket): void {
    this.dataSynchronizationSocketController.configureDataSynchronizationHandlers(
      socketIo
    );
  }
}
