import { Container, injectable } from "inversify";
import "reflect-metadata";

// Services imports
import {
  DatabaseService,
  LoggerService,
  SecurityService,
  ProductService,
  CustomerService,
  SequenceService,
  ConfigurationService,
  SurveyService,
  SaleOrderService,
  InvoiceService,
  CustomerChangeService,
  RouteService,
  PaymentService,
  PromoService,
  ZeroBalanceService,
  PosByCustomerService,
  GoalService,
  LabelTranslationService,
} from "../services/services";

import { EmilyServer } from "../server/server";
import {
  SecurityController,
  RouteInitializationController,
  CustomerController,
  RouteController,
  ZeroBalanceController,
} from "../request-controllers/controllers";
import {
  SocketIoBaseController,
  DataSynchronizationSocketController,
} from "../socket-io-controllers/socket-io.controllers";
import { SqlServiceBrokerDatabaseService } from "../sql-service-broker/sql-service-broker.database-service";
import { SqlServiceBrokerController } from "../sql-service-broker/sql-service-broker.controller";

@injectable()
export class IoCContainer {
  static container: Container = new Container();

  /**
   * registerInstances
   */
  public static registerInstances() {
    // <Services>
    IoCContainer.container
      .bind<DatabaseService>(DatabaseService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<DatabaseService>("DatabaseService")
      .to(DatabaseService);

    IoCContainer.container
      .bind<LoggerService>(LoggerService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<LoggerService>("LoggerService")
      .to(LoggerService);

    IoCContainer.container
      .bind<SecurityService>(SecurityService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<SecurityService>("SecurityService")
      .to(SecurityService);

    IoCContainer.container
      .bind<ProductService>(ProductService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<ProductService>("ProductService")
      .to(ProductService);

    IoCContainer.container
      .bind<CustomerService>(CustomerService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<CustomerService>("CustomerService")
      .to(CustomerService);

    IoCContainer.container
      .bind<SequenceService>(SequenceService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<SequenceService>("SequenceService")
      .to(SequenceService);

    IoCContainer.container
      .bind<ConfigurationService>(ConfigurationService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<ConfigurationService>("ConfigurationService")
      .to(ConfigurationService);

    IoCContainer.container
      .bind<SurveyService>(SurveyService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<SurveyService>("SurveyService")
      .to(SurveyService);

    IoCContainer.container
      .bind<SaleOrderService>(SaleOrderService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<SaleOrderService>("SaleOrderService")
      .to(SaleOrderService);

    IoCContainer.container
      .bind<InvoiceService>(InvoiceService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<InvoiceService>("InvoiceService")
      .to(InvoiceService);

    IoCContainer.container
      .bind<CustomerChangeService>(CustomerChangeService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<CustomerChangeService>("CustomerChangeService")
      .to(CustomerChangeService);

    IoCContainer.container
      .bind<RouteService>(RouteService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container.bind<RouteService>("RouteService").to(RouteService);

    IoCContainer.container
      .bind<PaymentService>(PaymentService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<PaymentService>("PaymentService")
      .to(PaymentService);

    IoCContainer.container
      .bind<PromoService>(PromoService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container.bind<PromoService>("PromoService").to(PromoService);

    IoCContainer.container
      .bind<ZeroBalanceService>(ZeroBalanceService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<ZeroBalanceService>("ZeroBalanceService")
      .to(ZeroBalanceService);
    IoCContainer.container
      .bind<PosByCustomerService>(PosByCustomerService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<PosByCustomerService>("PosByCustomerService")
      .to(PosByCustomerService);

    IoCContainer.container
      .bind<GoalService>(GoalService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container.bind<GoalService>("GoalService").to(GoalService);

    IoCContainer.container
      .bind<LabelTranslationService>(LabelTranslationService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<LabelTranslationService>("LabelTranslationService")
      .to(LabelTranslationService);

    // </Services>

    // <Controllers>

    IoCContainer.container
      .bind<SecurityController>(SecurityController)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<SecurityController>("SecurityController")
      .to(SecurityController);

    IoCContainer.container
      .bind<RouteInitializationController>(RouteInitializationController)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<RouteInitializationController>("RouteInitializationController")
      .to(RouteInitializationController);

    IoCContainer.container
      .bind<SocketIoBaseController>(SocketIoBaseController)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<SocketIoBaseController>("SocketIoBaseController")
      .to(SocketIoBaseController);

    IoCContainer.container
      .bind<DataSynchronizationSocketController>(
        DataSynchronizationSocketController
      )
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<DataSynchronizationSocketController>(
        "DataSynchronizationSocketController"
      )
      .to(DataSynchronizationSocketController);

    IoCContainer.container
      .bind<CustomerController>(CustomerController)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<CustomerController>("CustomerController")
      .to(CustomerController);

    IoCContainer.container
      .bind<RouteController>(RouteController)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<RouteController>("RouteController")
      .to(RouteController);

    IoCContainer.container
      .bind<ZeroBalanceController>(ZeroBalanceController)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<ZeroBalanceController>("ZeroBalanceController")
      .to(ZeroBalanceController);

    // </Controllers>

    // <SqlServiceBroker>

    IoCContainer.container
      .bind<SqlServiceBrokerDatabaseService>(SqlServiceBrokerDatabaseService)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<SqlServiceBrokerDatabaseService>("SqlServiceBrokerDatabaseService")
      .to(SqlServiceBrokerDatabaseService);

    IoCContainer.container
      .bind<SqlServiceBrokerController>(SqlServiceBrokerController)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container
      .bind<SqlServiceBrokerController>("SqlServiceBrokerController")
      .to(SqlServiceBrokerController);

    // </SqlServiceBroker>

    //<server>
    IoCContainer.container
      .bind<EmilyServer>(EmilyServer)
      .toSelf()
      .inSingletonScope();
    IoCContainer.container.bind<EmilyServer>("EmilyServer").to(EmilyServer);
    //</server>
  }
}
