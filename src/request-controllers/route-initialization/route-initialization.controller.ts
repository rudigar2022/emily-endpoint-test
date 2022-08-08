import { injectable } from "inversify";
import "reflect-metadata";
import * as express from "express";
import * as expressCore from "express-serve-static-core";
import * as pathModule from "path";

import {
  LoggerService,
  CustomerService,
  ProductService,
  SequenceService,
  ConfigurationService,
  SurveyService,
  RouteService,
  PromoService,
  ZeroBalanceService,
  PosByCustomerService,
  GoalService,
  LabelTranslationService,
} from "../../services/services";

import * as Models from "../../models/models";
import * as Requests from "../../models/requests/requests";
import * as Responses from "../../models/responses/responses";
import { ApplicationConfiguration } from "../../models/models";
import { findAllFiles, firstOrDefault } from "../../utilities/utilities";

@injectable()
export class RouteInitializationController {
  constructor(
    private loggerService: LoggerService,
    private customerService: CustomerService,
    private productService: ProductService,
    private sequenceService: SequenceService,
    private configurationService: ConfigurationService,
    private surveyService: SurveyService,
    private routeService: RouteService,
    private promoService: PromoService,
    private zeroBalanceService: ZeroBalanceService,
    private posByCustomerService: PosByCustomerService,
    private goalService: GoalService,
    private labelTranslationService: LabelTranslationService
  ) {}

  /**
   * prepareRouteSynchronizationControllerRoutes
   */
  public prepareRouteSynchronizationControllerRoutes(
    router: express.Router
  ): void {
    // -----------------------------------------------------------------
    //                      ROUTE VALIDATION
    // -----------------------------------------------------------------
    router
      .route("/synchronization/validateroute")
      .post(async (request, response) => {
        await this.validateRoute(request, response);
      });

    // Get Configurations
    router
      .route("/synchronization/getconfigurations")
      .post(async (request, response) => {
        await this.getConfigurations(request, response);
      });

    // Get Branch Office
    router
      .route("/synchronization/getbranchoffice")
      .post(async (request, response) => {
        await this.getBranchOffice(request, response);
      });

    // Get Customers
    router
      .route("/synchronization/getcustomers")
      .post(async (request, response) => {
        await this.getCustomers(request, response);
      });

    // Get Products
    router
      .route("/synchronization/getproducts")
      .post(async (request, response) => {
        await this.getProducts(request, response);
      });

    // Get Serial Numbers
    router
      .route("/synchronization/getproductserialnumbers")
      .post(async (request, response) => {
        await this.getSerialNumbers(request, response);
      });

    // Get Sequences
    router
      .route("/synchronization/getsequences")
      .post(async (request, response) => {
        await this.getSequences(request, response);
      });

    // -------------------------------------------------------------------------------
    //                              SURVEY MODULE
    // -------------------------------------------------------------------------------

    // Get Surveys
    router
      .route("/synchronization/getsurveys")
      .post(async (request, response) => {
        await this.getSurveys(request, response);
      });

    // Get Survey Questions
    router
      .route("/synchronization/getsurveyquestions")
      .post(async (request, response) => {
        await this.getSurveyQuestions(request, response);
      });

    // Get Survey Answers
    router
      .route("/synchronization/getsurveyanswers")
      .post(async (request, response) => {
        await this.getSurveyAnswers(request, response);
      });

    // -------------------------------------------------------------------------------
    //                              PAYMENTS MODULE
    // -------------------------------------------------------------------------------
    // Get Unpaid Bills
    router
      .route("/synchronization/getunpaidbills")
      .post(async (request, response) => {
        await this.getUnpaidBills(request, response);
      });

    // Get Unpaid Bills Detail
    router
      .route("/synchronization/getunpaidbillsdetail")
      .post(async (request, response) => {
        await this.getUnpaidBillsDetail(request, response);
      });

    // -------------------------------------------------------------------------------
    //                              PROMOS
    // -------------------------------------------------------------------------------
    // Get Promo Hierarchy Values
    router
      .route("/synchronization/getpromohierarchyvalues")
      .post(async (request, response) => {
        await this.getPromoHierarchyValues(request, response);
      });

    // Get Discounts By Scale
    router
      .route("/synchronization/getdiscountsbyscale")
      .post(async (request, response) => {
        await this.getDiscountsByScale(request, response);
      });

    // Get Bonus By Multiple
    router
      .route("/synchronization/getbonusbymultiple")
      .post(async (request, response) => {
        await this.getBonusByMultiple(request, response);
      });

    // -------------------------------------------------------------------------------
    //                              Balance
    // -------------------------------------------------------------------------------

    // Get zero balance
    router
      .route("/synchronization/getZeroBalance")
      .post(async (request, response) => {
        await this.getZeroBalance(request, response);
      });

    // Get POS by customer
    router
      .route("/synchronization/getPosByCustomer")
      .post(async (request, response) => {
        await this.getPosByCustomer(request, response);
      });

    // -------------------------------------------------------------------------------
    //                              Goals
    // -------------------------------------------------------------------------------

    // Get zero balance
    router
      .route("/synchronization/getGoalGeneralBySellerCode")
      .post(async (request, response) => {
        await this.getGoalGeneralBySellerCode(request, response);
      });

    router
      .route("/synchronization/getGoalPosByAirTimeBySellerCode")
      .post(async (request, response) => {
        await this.getGoalPosByAirTimeBySellerCode(request, response);
      });

    // -------------------------------------------------------------------------------
    //                              Label Translation
    // -------------------------------------------------------------------------------

    router
      .route("/synchronization/geLabelTranslationt")
      .post(async (request, response) => {
        await this.geLabelTranslationt(request, response);
      });

    // Request Application Upddate
    router.route("/application-update").get(async (request, response) => {
      await this.getApplicationUpdate(request, response);
    });
  }

  /**
   * Route Validation
   * @param request
   * @param response
   */
  private async validateRoute(
    request: expressCore.Request<expressCore.ParamsDictionary, any, any>,
    response: expressCore.Response<any>
  ) {
    try {
      const routeValidation: Requests.RouteInitialization = request.body;

      this.loggerService.info(
        `VALIDATING ROUTE FOR SELLER => ${routeValidation.sellerCode}`
      );

      let routeValidations: Array<Models.RouteValidation> =
        await this.routeService.validateRoute(routeValidation.sellerCode);

      let routeValidationsResponse =
        new Responses.ProcessResponse<Models.RouteValidation>();
      routeValidationsResponse.success = true;
      routeValidationsResponse.resource =
        routeValidations && routeValidations.length
          ? routeValidations[0]
          : null;

      this.loggerService.info(
        `ROUTE VALIDATION FOR SELLER ${
          routeValidation.sellerCode
        } RESPONSE => <${JSON.stringify(routeValidationsResponse.resource)}>`
      );

      response.status(200).json(routeValidationsResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Models.RouteValidation>);

      this.loggerService.error(
        `ROUTE VALIDATION FAIL. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  /**
   * getConfigurations
   */
  private async getConfigurations(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const getConfigurationsRequest: Requests.RouteInitialization =
        request.body;

      this.loggerService.info(
        `Getting configurations for seller => ${getConfigurationsRequest.sellerCode}`
      );

      let configurations: Array<Models.Configuration> =
        await this.configurationService.getSystemConfigurations();

      let getConfigurationsResponse = new Responses.ProcessResponse<
        Array<Models.Configuration>
      >();
      getConfigurationsResponse.success = true;
      getConfigurationsResponse.resource = configurations;

      this.loggerService.info(
        `The 'Get Configurations' process found <${
          configurations ? configurations.length : 0
        }> configurations for seller <${getConfigurationsRequest.sellerCode}>`
      );

      response.status(200).json(getConfigurationsResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.Configuration>>);

      this.loggerService.error(
        `Get configurations failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  /**
   * getBranchOffice
   */
  private async getBranchOffice(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const getBranchOfficeRequest: Requests.RouteInitialization = request.body;

      this.loggerService.info(
        `Getting branch office for seller => ${getBranchOfficeRequest.sellerCode}`
      );

      let offices: Array<Models.BranchOffice> =
        await this.configurationService.getBranchOffice(getBranchOfficeRequest);

      let getBranchOfficeResponse = new Responses.ProcessResponse<
        Array<Models.BranchOffice>
      >();
      getBranchOfficeResponse.success = true;
      getBranchOfficeResponse.resource = offices;

      this.loggerService.info(
        `The 'Get Branch Office' process found <${
          offices ? offices.length : 0
        }> offices for seller <${getBranchOfficeRequest.sellerCode}>`
      );

      response.status(200).json(getBranchOfficeResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.BranchOffice>>);

      this.loggerService.error(
        `Get Branch Office failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  /**
   * getCustomers
   */
  private async getCustomers(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const getCustomersRequest: Requests.RouteInitialization = request.body;

      this.loggerService.info(
        `Getting customers for seller => ${getCustomersRequest.sellerCode}`
      );

      let customers: Array<Models.Customer> =
        await this.customerService.getCustomers(getCustomersRequest);

      let getCustomersResponse = new Responses.ProcessResponse<
        Array<Models.Customer>
      >();
      getCustomersResponse.success = true;
      getCustomersResponse.resource = customers;

      this.loggerService.info(
        `The 'Get Customers' process found <${
          customers ? customers.length : 0
        }> customers for seller <${getCustomersRequest.sellerCode}>`
      );

      response.status(200).json(getCustomersResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.Customer>>);

      this.loggerService.error(
        `Get Customers failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  /**
   * getProducts
   */
  private async getProducts(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const getProductsRequest: Requests.RouteInitialization = request.body;

      this.loggerService.info(
        `Getting products for seller => ${getProductsRequest.sellerCode}`
      );

      let products: Array<Models.Product> =
        await this.productService.getProducts(getProductsRequest);

      let getProductsResponse = new Responses.ProcessResponse<
        Array<Models.Product>
      >();
      getProductsResponse.success = true;
      getProductsResponse.resource = products;

      this.loggerService.info(
        `The 'Get Products' process found <${
          products ? products.length : 0
        }> products for seller <${getProductsRequest.sellerCode}>`
      );

      response.status(200).json(getProductsResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.Product>>);

      this.loggerService.error(
        `Get Products failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  /**
   * Get the serial numbers for products that use serial number
   */
  private async getSerialNumbers(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    let serialNumbersResponse = new Responses.ProcessResponse<
      Array<Models.ProductSerialNumber>
    >();
    try {
      const getSerialNumbersRequest: Requests.RouteInitialization =
        request.body;

      this.loggerService.info(
        `Getting serial numbers for seller => ${getSerialNumbersRequest.sellerCode}`
      );

      let serialNumbers: Array<Models.ProductSerialNumber> =
        await this.productService.getSerialNumbers(getSerialNumbersRequest);

      serialNumbersResponse.success = true;
      serialNumbersResponse.resource = serialNumbers;

      this.loggerService.info(
        `The 'Get Serial Numbers' process found <${
          serialNumbers ? serialNumbers.length : 0
        }> series for seller <${getSerialNumbersRequest.sellerCode}>`
      );

      response.status(200).json(serialNumbersResponse);
    } catch (error) {
      serialNumbersResponse.errors = [error.message || error];
      response.status(200).json(serialNumbersResponse);

      this.loggerService.error(
        `Get Serial Numbers failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  /**
   * getSequences
   */
  private async getSequences(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const getSequencesRequest: Requests.RouteInitialization = request.body;

      this.loggerService.info(
        `Getting sequences for seller => ${getSequencesRequest.sellerCode}`
      );

      let sequences: Array<Models.Sequence> =
        await this.sequenceService.getSequences(getSequencesRequest);

      let getSequencesResponse = new Responses.ProcessResponse<
        Array<Models.Sequence>
      >();
      getSequencesResponse.success = true;
      getSequencesResponse.resource = sequences;

      this.loggerService.info(
        `The 'Get Sequences' process found <${
          sequences ? sequences.length : 0
        }> sequences for seller <${getSequencesRequest.sellerCode}>`
      );

      response.status(200).json(getSequencesResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.Sequence>>);

      this.loggerService.error(
        `Get Sequences failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  // -------------------------------------------------------------------------------
  //                              SURVEY MODULE
  // -------------------------------------------------------------------------------

  /**
   * getSurveys
   */
  private async getSurveys(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const getSurveysRequest: Requests.RouteInitialization = request.body;

      this.loggerService.info(
        `Getting surveys for seller => ${getSurveysRequest.sellerCode}`
      );

      let surveys: Array<Models.Survey> = await this.surveyService.getSurveys(
        getSurveysRequest
      );

      let surveysResponse = new Responses.ProcessResponse<
        Array<Models.Survey>
      >();
      surveysResponse.success = true;
      surveysResponse.resource = surveys;

      this.loggerService.info(
        `The 'Get Surveys' process found <${
          surveys ? surveys.length : 0
        }> surveys for seller <${getSurveysRequest.sellerCode}>`
      );

      response.status(200).json(surveysResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.Survey>>);

      this.loggerService.error(
        `Get Surveys failed. Error => ${JSON.stringify(error.message || error)}`
      );
    }
  }

  /**
   * getSurveyQuestions
   */
  private async getSurveyQuestions(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const getSurveyQuestionsRequest: Requests.RouteInitialization =
        request.body;

      this.loggerService.info(
        `Getting survey questions for seller => ${getSurveyQuestionsRequest.sellerCode}`
      );

      let surveyQuestions: Array<Models.SurveyQuestion> =
        await this.surveyService.getSurveyQuestions(getSurveyQuestionsRequest);

      let surveyQuestionsResponse = new Responses.ProcessResponse<
        Array<Models.SurveyQuestion>
      >();
      surveyQuestionsResponse.success = true;
      surveyQuestionsResponse.resource = surveyQuestions;

      this.loggerService.info(
        `The 'Get Survey Questions' process found <${
          surveyQuestions ? surveyQuestions.length : 0
        }> questions for seller <${getSurveyQuestionsRequest.sellerCode}>`
      );

      response.status(200).json(surveyQuestionsResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.SurveyQuestion>>);

      this.loggerService.error(
        `Get Survey Questions failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  /**
   * getSurveyAnswers
   */
  private async getSurveyAnswers(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const getSurveyAnswersRequest: Requests.RouteInitialization =
        request.body;

      this.loggerService.info(
        `Getting survey answers for seller => ${getSurveyAnswersRequest.sellerCode}`
      );

      let surveyAnswers: Array<Models.SurveyAnswer> =
        await this.surveyService.getSurveyAnswers(getSurveyAnswersRequest);

      let surveyAnswersResponse = new Responses.ProcessResponse<
        Array<Models.SurveyAnswer>
      >();
      surveyAnswersResponse.success = true;
      surveyAnswersResponse.resource = surveyAnswers;

      this.loggerService.info(
        `The 'Get Survey Answers' process found <${
          surveyAnswers ? surveyAnswers.length : 0
        }> answers for seller <${getSurveyAnswersRequest.sellerCode}>`
      );

      response.status(200).json(surveyAnswersResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.SurveyAnswer>>);

      this.loggerService.error(
        `Get Survey Answers failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  // -------------------------------------------------------------------------------
  //                              PAYMENTS MODULE
  // -------------------------------------------------------------------------------

  /**
   * getUnpaidBills
   */
  private async getUnpaidBills(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const getCustomersRequest: Requests.RouteInitialization = request.body;

      this.loggerService.info(
        `Getting unpaid bills for seller => ${getCustomersRequest.sellerCode}`
      );

      let unpaidBills: Array<Models.UnpaidBills> =
        await this.customerService.getUnpaidBills(getCustomersRequest);

      let unpaidBillsResponse = new Responses.ProcessResponse<
        Array<Models.UnpaidBills>
      >();
      unpaidBillsResponse.success = true;
      unpaidBillsResponse.resource = unpaidBills;

      this.loggerService.info(
        `The 'Get Unpaid Bills' process found <${
          unpaidBills ? unpaidBills.length : 0
        }> invoices for seller <${getCustomersRequest.sellerCode}>`
      );

      response.status(200).json(unpaidBillsResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.UnpaidBills>>);

      this.loggerService.error(
        `Get Unpaid Bills failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  /**
   * getUnpaidBillsDetail
   */
  private async getUnpaidBillsDetail(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const getUnpaidBillsDetailRequest: Requests.RouteInitialization =
        request.body;

      this.loggerService.info(
        `Getting unpaid bills detail for seller => ${getUnpaidBillsDetailRequest.sellerCode}`
      );

      let unpaidBillsDetail: Array<Models.UnpaidBillsDetail> =
        await this.customerService.getUnpaidBillsDetail(
          getUnpaidBillsDetailRequest
        );

      let unpaidBillsDetailResponse = new Responses.ProcessResponse<
        Array<Models.UnpaidBillsDetail>
      >();
      unpaidBillsDetailResponse.success = true;
      unpaidBillsDetailResponse.resource = unpaidBillsDetail;

      this.loggerService.info(
        `The 'Get Unpaid Bills Detail' process found <${
          unpaidBillsDetail ? unpaidBillsDetail.length : 0
        }> invoices details for seller <${
          getUnpaidBillsDetailRequest.sellerCode
        }>`
      );

      response.status(200).json(unpaidBillsDetailResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.UnpaidBillsDetail>>);

      this.loggerService.error(
        `Get Unpaid Bills Detail failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  // ------------------------------------------------------------
  //                            PROMOS
  // ------------------------------------------------------------

  /**
   * getPromoHierarchyValues
   */
  private async getPromoHierarchyValues(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const getPromoHierarchyValuesRequest: Requests.RouteInitialization =
        request.body;

      this.loggerService.info(
        `Getting promo hierarchy values for seller => ${getPromoHierarchyValuesRequest.sellerCode}`
      );

      let promoHierarchyValues: Array<Models.PromoHierarchyValue> =
        await this.promoService.getPromoHierarchyValues(
          getPromoHierarchyValuesRequest
        );

      let promoHierarchyValuesResponse = new Responses.ProcessResponse<
        Array<Models.PromoHierarchyValue>
      >();
      promoHierarchyValuesResponse.success = true;
      promoHierarchyValuesResponse.resource = promoHierarchyValues;

      this.loggerService.info(
        `The 'Get Promo Hierarchy Values' process found <${
          promoHierarchyValues ? promoHierarchyValues.length : 0
        }> values for seller <${getPromoHierarchyValuesRequest.sellerCode}>`
      );

      response.status(200).json(promoHierarchyValuesResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.PromoHierarchyValue>>);

      this.loggerService.error(
        `Get Promo Hierarchy Values failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  /**
   * getDiscountsByScale
   */
  private async getDiscountsByScale(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const getDiscountsByScaleRequest: Requests.RouteInitialization =
        request.body;

      this.loggerService.info(
        `Getting discounts by scale for seller => ${getDiscountsByScaleRequest.sellerCode}`
      );

      let promoHierarchyValues: Array<Models.DiscountByScale> =
        await this.promoService.getDiscountsByScale(getDiscountsByScaleRequest);

      let discountsByScaleResponse = new Responses.ProcessResponse<
        Array<Models.DiscountByScale>
      >();
      discountsByScaleResponse.success = true;
      discountsByScaleResponse.resource = promoHierarchyValues;

      this.loggerService.info(
        `The 'Get Discounts By Scale' process found <${
          promoHierarchyValues ? promoHierarchyValues.length : 0
        }> discounts for seller <${getDiscountsByScaleRequest.sellerCode}>`
      );

      response.status(200).json(discountsByScaleResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.DiscountByScale>>);

      this.loggerService.error(
        `Get Discounts By Scale failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  /**
   * getBonusByMultiple
   */
  private async getBonusByMultiple(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const getBonusByMultipleRequest: Requests.RouteInitialization =
        request.body;

      this.loggerService.info(
        `Getting bonuses by multiple for seller => ${getBonusByMultipleRequest.sellerCode}`
      );

      let bonusesByMultiple: Array<Models.BonusByMultiple> =
        await this.promoService.getBonusByMultiple(getBonusByMultipleRequest);

      let bonusByMultipleResponse = new Responses.ProcessResponse<
        Array<Models.BonusByMultiple>
      >();
      bonusByMultipleResponse.success = true;
      bonusByMultipleResponse.resource = bonusesByMultiple;

      this.loggerService.info(
        `The 'Get Bonus By Multiple' process found <${
          bonusesByMultiple ? bonusesByMultiple.length : 0
        }> bonuses for seller <${getBonusByMultipleRequest.sellerCode}>`
      );

      response.status(200).json(bonusByMultipleResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.BonusByMultiple>>);

      this.loggerService.error(
        `Get Bonus By Multiple failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  // Get Application Update
  private async getApplicationUpdate(
    _request: expressCore.Request,
    response: expressCore.Response
  ): Promise<any> {
    try {
      this.loggerService.info("Getting application update...");

      const applicationFileNames: Array<ApplicationConfiguration> =
        await this.routeService.getAppUpdateSettings();
      const applicationFileName: ApplicationConfiguration =
        firstOrDefault(applicationFileNames);

      // IF NOT PARAMETER FOR "APK FILE NAME"
      if (!applicationFileName) {
        this.loggerService.info("No file name parameter...");
        return response
          .status(404)
          .send(
            "No se ha encontrado parámetro de 'Nombre de archivo de actualización'."
          );
      }

      const files: Array<string> = findAllFiles(
        pathModule.join(__dirname, "../../app-updates/"), // <== Directory that will be used to search APK files
        ".apk"
      );

      // IF NO .apk FILES
      if (!files || !files.length) {
        this.loggerService.info("No files on server...");
        return response
          .status(404)
          .send(
            "No se han encontrado archivos compatibles para la actualización"
          );
      }

      const file: string = files.find((fileUrl: string) => {
        return fileUrl.includes(applicationFileName.apkFileName);
      });

      // IF NO "APK FILE" FOUNDED
      if (!file) {
        this.loggerService.info("No APK file...");
        return response
          .status(404)
          .send("No se ha encontrado el archivo de actualización.");
      }

      this.loggerService.info("Sending apk file...");
      response.status(200).sendFile(file);
    } catch (error) {
      this.loggerService.error(
        `Get Application Update fail. Error => ${JSON.stringify(
          error.message || error
        )}`
      );

      return response
        .status(500)
        .send("Ha ocurrido un error al realizar el proceso de actualización.");
    }
  }

  /**
   * getZeroBalnce
   */
  private async getZeroBalance(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const getZeroBalanceRequest: Requests.RouteInitialization = request.body;

      this.loggerService.info(
        `Getting zero balance for seller => ${getZeroBalanceRequest.sellerCode}`
      );

      let zeroBalance: Array<Models.ZeroBalance> =
        await this.zeroBalanceService.getZeroBalance(getZeroBalanceRequest);

      let zeroBalanceResponse = new Responses.ProcessResponse<
        Array<Models.ZeroBalance>
      >();
      zeroBalanceResponse.success = true;
      zeroBalanceResponse.resource = zeroBalance;

      this.loggerService.info(
        `The 'Get Zero Balance' process found <${
          zeroBalance ? zeroBalance.length : 0
        }> bonuses for seller <${getZeroBalanceRequest.sellerCode}>`
      );

      response.status(200).json(zeroBalanceResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.ZeroBalance>>);

      this.loggerService.error(
        `Get Zero Balance failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  /**
   * getPosByCustomer
   */
  private async getPosByCustomer(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const routeInitialization: Requests.RouteInitialization = request.body;

      this.loggerService.info(
        `Getting POS by Customer for seller => ${routeInitialization.sellerCode}`
      );

      let model: Array<Models.PosByCustomer> =
        await this.posByCustomerService.getPosByCustomer(routeInitialization);

      let processResponse = new Responses.ProcessResponse<
        Array<Models.PosByCustomer>
      >();
      processResponse.success = true;
      processResponse.resource = model;

      this.loggerService.info(
        `The 'Get POS by Customer' process found <${
          model ? model.length : 0
        }> seller <${routeInitialization.sellerCode}>`
      );

      response.status(200).json(processResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.PosByCustomer>>);

      this.loggerService.error(
        `Get POS by Customer failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  /**
   * getGoalGeneralBySellerCode
   */
  private async getGoalGeneralBySellerCode(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const routeInitialization: Requests.RouteInitialization = request.body;

      this.loggerService.info(
        `Getting goals general for seller => ${routeInitialization.sellerCode}`
      );

      let model: Array<Models.GoalGeneral> =
        await this.goalService.getGoalGeneralBySellerCode(routeInitialization);

      let processResponse = new Responses.ProcessResponse<
        Array<Models.GoalGeneral>
      >();
      processResponse.success = true;
      processResponse.resource = model;

      this.loggerService.info(
        `The 'Get goals general' process found <${
          model ? model.length : 0
        }> seller <${routeInitialization.sellerCode}>`
      );

      response.status(200).json(processResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.GoalGeneral>>);

      this.loggerService.error(
        `Get goals general failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  /**
   * getGoalPosByAirTimeBySellerCode
   */
  private async getGoalPosByAirTimeBySellerCode(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const routeInitialization: Requests.RouteInitialization = request.body;

      this.loggerService.info(
        `Getting goals pos by air time for seller => ${routeInitialization.sellerCode}`
      );

      let model: Array<Models.GoalPosByAirTime> =
        await this.goalService.getGoalPosByAirTimeBySellerCode(
          routeInitialization
        );

      let processResponse = new Responses.ProcessResponse<
        Array<Models.GoalPosByAirTime>
      >();
      processResponse.success = true;
      processResponse.resource = model;

      this.loggerService.info(
        `The 'Get goals pos by air time' process found <${
          model ? model.length : 0
        }> seller <${routeInitialization.sellerCode}>`
      );

      response.status(200).json(processResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.GoalPosByAirTime>>);

      this.loggerService.error(
        `Get goals pos by air time failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }

  /**
   * geLabelTranslationt
   */
  private async geLabelTranslationt(
    request: expressCore.Request,
    response: expressCore.Response
  ) {
    try {
      const routeInitialization: Requests.RouteInitialization = request.body;

      this.loggerService.info(
        `Getting label translation => ${routeInitialization.sellerCode}`
      );

      let model: Array<Models.LabelTranslation> =
        await this.labelTranslationService.getLabelTranslation();

      let processResponse = new Responses.ProcessResponse<
        Array<Models.LabelTranslation>
      >();
      processResponse.success = true;
      processResponse.resource = model;

      this.loggerService.info(
        `The 'Get labels translation' process found <${
          model ? model.length : 0
        }> seller <${routeInitialization.sellerCode}>`
      );

      response.status(200).json(processResponse);
    } catch (error) {
      response.status(200).json({
        success: false,
        errors: [error.message || error],
      } as Responses.ProcessResponse<Array<Models.LabelTranslation>>);

      this.loggerService.error(
        `Get labels translation failed. Error => ${JSON.stringify(
          error.message || error
        )}`
      );
    }
  }
}
