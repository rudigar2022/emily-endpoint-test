import { injectable } from "inversify";
import "reflect-metadata";
import {
  BonusByMultiple,
  DiscountByScale,
  ObjectParameter,
  PromoHierarchyValue,  
} from "../../models/models";
import { RouteInitialization } from "../../models/requests/requests";
import { DatabaseService } from "../database/database.service";

import * as Configurations from "../../configurations/configurations.json";

@injectable()
export class PromoService {
  constructor(public databaseService: DatabaseService) {}

  /**
   * getPromoHierarchyValues
   */
  public async getPromoHierarchyValues(
    routeInitializationRequest: RouteInitialization
  ): Promise<Array<PromoHierarchyValue>> {
    let parameters: Array<ObjectParameter> = [
      {
        name: "SellerCode",
        value: routeInitializationRequest.sellerCode,
      },
    ];

    let promoHierarchyValues: Array<PromoHierarchyValue> =
      await this.databaseService.executeDatabaseObject<PromoHierarchyValue>(
        `[${Configurations.database.databaseSchema}].[GetPromoHierarchyValues]`,
        parameters
      );

    return promoHierarchyValues;
  }

  /**
   * getDiscountsByScale
   */
  public async getDiscountsByScale(
    routeInitializationRequest: RouteInitialization
  ): Promise<Array<DiscountByScale>> {
    let parameters: Array<ObjectParameter> = [
      {
        name: "SellerCode",
        value: routeInitializationRequest.sellerCode,
      },
    ];

    let discountsByScale: Array<DiscountByScale> =
      await this.databaseService.executeDatabaseObject<DiscountByScale>(
        `[${Configurations.database.databaseSchema}].[GetDiscountByScalePromos]`,
        parameters
      );

    return discountsByScale;
  }

  /**
   * getBonusByMultiple
   */
  public async getBonusByMultiple(
    routeInitializationRequest: RouteInitialization
  ): Promise<Array<BonusByMultiple>> {
    let parameters: Array<ObjectParameter> = [
      {
        name: "SellerCode",
        value: routeInitializationRequest.sellerCode,
      },
    ];

    let bonusByMultiple: Array<BonusByMultiple> =
      await this.databaseService.executeDatabaseObject<BonusByMultiple>(
        `[${Configurations.database.databaseSchema}].[GetBonusByMultiplePromos]`,
        parameters
      );

    return bonusByMultiple;
  }
}
