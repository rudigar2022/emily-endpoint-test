import { injectable } from "inversify";
import "reflect-metadata";
import { DatabaseService } from "../database/database.service";

import * as Requests from "../../models/requests/requests";

import * as xmlParser from "js2xmlparser";

import * as Configurations from "../../configurations/configurations.json";
import {
  Customer,
  ObjectParameter,
  UnpaidBills,
  UnpaidBillsDetail,
  VisitCanceled,
} from "../../models/models";

@injectable()
export class CustomerService {
  constructor(private databaseService: DatabaseService) {}

  /**
   * getCustomers
   */
  public async getCustomers(
    getCustomersRequest: Requests.RouteInitialization
  ): Promise<Array<Customer>> {
    let parameters: Array<ObjectParameter> = [
      {
        name: "SellerCode",
        value: getCustomersRequest.sellerCode,
      },
    ];

    let customers: Array<Customer> =
      await this.databaseService.executeDatabaseObject<Customer>(
        `[${Configurations.database.databaseSchema}].[GetCustomer]`,
        parameters
      );

    return customers;
  }

  /**
   * createNewCustomer
   */
  public async createNewCustomers(
    newCustomers: Array<Customer>
  ): Promise<Array<Customer>> {
    const parameter: ObjectParameter = new ObjectParameter();
    parameter.name = "newCustomersXml";
    parameter.value = xmlParser.parse("newCustomer", newCustomers);

    const response = await this.databaseService.executeDatabaseObject<Customer>(
      `[${Configurations.database.databaseSchema}].[CreateCustomers]`,
      [parameter]
    );

    return response;
  }

  /**
   * createCanceledVisits
   */
  public async createCanceledVisits(
    canceledVisits: Array<VisitCanceled>
  ): Promise<Array<VisitCanceled>> {
    const parameter: ObjectParameter = new ObjectParameter();
    parameter.name = "canceledVisits";
    parameter.value = xmlParser.parse("canceledVisits", canceledVisits);
    console.log(parameter.value);
    const response =
      await this.databaseService.executeDatabaseObject<VisitCanceled>(
        `[${Configurations.database.databaseSchema}].[CreateCanceledVisits]`,
        [parameter]
      );

    return response;
  }

  /**
   * searchCustomerOutOfRoute
   */
  public async searchCustomerOutOfRoute(
    searchCustomerOutOfRouteRequest: Requests.CustomerOutOfRoute
  ): Promise<Array<Customer>> {
    let parameters: Array<ObjectParameter> = [
      {
        name: "SellerCode",
        value: searchCustomerOutOfRouteRequest.sellerCode,
      },
      {
        name: "SearchCriteria",
        value: searchCustomerOutOfRouteRequest.searchCriteria,
      },
    ];

    let customers: Array<Customer> =
      await this.databaseService.executeDatabaseObject<Customer>(
        `[${Configurations.database.databaseSchema}].[SearchCustomerOutOfRoute]`,
        parameters
      );

    return customers;
  }

  /**
   * getUnpaidBills
   */
  public async getUnpaidBills(
    getCustomersRequest: Requests.RouteInitialization
  ): Promise<Array<UnpaidBills>> {
    let parameters: Array<ObjectParameter> = [
      {
        name: "SellerCode",
        value: getCustomersRequest.sellerCode,
      },
    ];

    let unpaidBills: Array<UnpaidBills> =
      await this.databaseService.executeDatabaseObject<UnpaidBills>(
        `[${Configurations.database.databaseSchema}].[GetCustomersUnpaidBills]`,
        parameters
      );

    return unpaidBills;
  }

  /**
   * getUnpaidBillsDetail
   */
  public async getUnpaidBillsDetail(
    getCustomersRequest: Requests.RouteInitialization
  ): Promise<Array<UnpaidBillsDetail>> {
    let parameters: Array<ObjectParameter> = [
      {
        name: "SellerCode",
        value: getCustomersRequest.sellerCode,
      },
    ];

    let unpaidBills: Array<UnpaidBillsDetail> =
      await this.databaseService.executeDatabaseObject<UnpaidBillsDetail>(
        `[${Configurations.database.databaseSchema}].[GetCustomersUnpaidBillsDetail]`,
        parameters
      );

    return unpaidBills;
  }

  /**
   * Return the array of unpaid bills for the customer
   */
  public async getUnpaidBillsForCustomerOutOfRoute(
    sellerCode: string,
    customerCode: string
  ): Promise<Array<UnpaidBills>> {
    let parameters: Array<ObjectParameter> = [
      {
        name: "SellerCode",
        value: sellerCode,
      },
      {
        name: "CustomerCode",
        value: customerCode,
      },
    ];

    let unpaidBills: Array<UnpaidBills> =
      await this.databaseService.executeDatabaseObject<UnpaidBills>(
        `[${Configurations.database.databaseSchema}].[GetUnpaidBillsForCustomerOutOfRoute]`,
        parameters
      );

    return unpaidBills;
  }

  /**
   * Returns the array of unpaid bills details for the customer
   */
  public async getUnpaidBillsDetailForCustomerOutOfRoute(
    sellerCode: string,
    customerCode: string
  ): Promise<Array<UnpaidBillsDetail>> {
    let parameters: Array<ObjectParameter> = [
      {
        name: "SellerCode",
        value: sellerCode,
      },
      {
        name: "CustomerCode",
        value: customerCode,
      },
    ];

    let unpaidBillsDetail: Array<UnpaidBillsDetail> =
      await this.databaseService.executeDatabaseObject<UnpaidBillsDetail>(
        `[${Configurations.database.databaseSchema}].[GetUnpaidBillsDetailForCustomerOutOfRoute]`,
        parameters
      );

    return unpaidBillsDetail;
  }
}
