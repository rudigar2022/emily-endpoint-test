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
const pathModule = require("path");
const services_1 = require("../../services/services");
const Responses = require("../../models/responses/responses");
const utilities_1 = require("../../utilities/utilities");
let RouteInitializationController = class RouteInitializationController {
    constructor(loggerService, customerService, productService, sequenceService, configurationService, surveyService, routeService, promoService, zeroBalanceService, posByCustomerService, goalService, labelTranslationService) {
        this.loggerService = loggerService;
        this.customerService = customerService;
        this.productService = productService;
        this.sequenceService = sequenceService;
        this.configurationService = configurationService;
        this.surveyService = surveyService;
        this.routeService = routeService;
        this.promoService = promoService;
        this.zeroBalanceService = zeroBalanceService;
        this.posByCustomerService = posByCustomerService;
        this.goalService = goalService;
        this.labelTranslationService = labelTranslationService;
    }
    /**
     * prepareRouteSynchronizationControllerRoutes
     */
    prepareRouteSynchronizationControllerRoutes(router) {
        // -----------------------------------------------------------------
        //                      ROUTE VALIDATION
        // -----------------------------------------------------------------
        router
            .route("/synchronization/validateroute")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.validateRoute(request, response);
        }));
        // Get Configurations
        router
            .route("/synchronization/getconfigurations")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getConfigurations(request, response);
        }));
        // Get Branch Office
        router
            .route("/synchronization/getbranchoffice")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getBranchOffice(request, response);
        }));
        // Get Customers
        router
            .route("/synchronization/getcustomers")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getCustomers(request, response);
        }));
        // Get Products
        router
            .route("/synchronization/getproducts")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getProducts(request, response);
        }));
        // Get Serial Numbers
        router
            .route("/synchronization/getproductserialnumbers")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getSerialNumbers(request, response);
        }));
        // Get Sequences
        router
            .route("/synchronization/getsequences")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getSequences(request, response);
        }));
        // -------------------------------------------------------------------------------
        //                              SURVEY MODULE
        // -------------------------------------------------------------------------------
        // Get Surveys
        router
            .route("/synchronization/getsurveys")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getSurveys(request, response);
        }));
        // Get Survey Questions
        router
            .route("/synchronization/getsurveyquestions")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getSurveyQuestions(request, response);
        }));
        // Get Survey Answers
        router
            .route("/synchronization/getsurveyanswers")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getSurveyAnswers(request, response);
        }));
        // -------------------------------------------------------------------------------
        //                              PAYMENTS MODULE
        // -------------------------------------------------------------------------------
        // Get Unpaid Bills
        router
            .route("/synchronization/getunpaidbills")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getUnpaidBills(request, response);
        }));
        // Get Unpaid Bills Detail
        router
            .route("/synchronization/getunpaidbillsdetail")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getUnpaidBillsDetail(request, response);
        }));
        // -------------------------------------------------------------------------------
        //                              PROMOS
        // -------------------------------------------------------------------------------
        // Get Promo Hierarchy Values
        router
            .route("/synchronization/getpromohierarchyvalues")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getPromoHierarchyValues(request, response);
        }));
        // Get Discounts By Scale
        router
            .route("/synchronization/getdiscountsbyscale")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getDiscountsByScale(request, response);
        }));
        // Get Bonus By Multiple
        router
            .route("/synchronization/getbonusbymultiple")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getBonusByMultiple(request, response);
        }));
        // -------------------------------------------------------------------------------
        //                              Balance
        // -------------------------------------------------------------------------------
        // Get zero balance
        router
            .route("/synchronization/getZeroBalance")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getZeroBalance(request, response);
        }));
        // Get POS by customer
        router
            .route("/synchronization/getPosByCustomer")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getPosByCustomer(request, response);
        }));
        // -------------------------------------------------------------------------------
        //                              Goals
        // -------------------------------------------------------------------------------
        // Get zero balance
        router
            .route("/synchronization/getGoalGeneralBySellerCode")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getGoalGeneralBySellerCode(request, response);
        }));
        router
            .route("/synchronization/getGoalPosByAirTimeBySellerCode")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getGoalPosByAirTimeBySellerCode(request, response);
        }));
        // -------------------------------------------------------------------------------
        //                              Label Translation
        // -------------------------------------------------------------------------------
        router
            .route("/synchronization/geLabelTranslationt")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.geLabelTranslationt(request, response);
        }));
        // Request Application Upddate
        router.route("/application-update").get((request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.getApplicationUpdate(request, response);
        }));
    }
    /**
     * Route Validation
     * @param request
     * @param response
     */
    validateRoute(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const routeValidation = request.body;
                this.loggerService.info(`VALIDATING ROUTE FOR SELLER => ${routeValidation.sellerCode}`);
                let routeValidations = yield this.routeService.validateRoute(routeValidation.sellerCode);
                let routeValidationsResponse = new Responses.ProcessResponse();
                routeValidationsResponse.success = true;
                routeValidationsResponse.resource =
                    routeValidations && routeValidations.length
                        ? routeValidations[0]
                        : null;
                this.loggerService.info(`ROUTE VALIDATION FOR SELLER ${routeValidation.sellerCode} RESPONSE => <${JSON.stringify(routeValidationsResponse.resource)}>`);
                response.status(200).json(routeValidationsResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`ROUTE VALIDATION FAIL. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    /**
     * getConfigurations
     */
    getConfigurations(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getConfigurationsRequest = request.body;
                this.loggerService.info(`Getting configurations for seller => ${getConfigurationsRequest.sellerCode}`);
                let configurations = yield this.configurationService.getSystemConfigurations();
                let getConfigurationsResponse = new Responses.ProcessResponse();
                getConfigurationsResponse.success = true;
                getConfigurationsResponse.resource = configurations;
                this.loggerService.info(`The 'Get Configurations' process found <${configurations ? configurations.length : 0}> configurations for seller <${getConfigurationsRequest.sellerCode}>`);
                response.status(200).json(getConfigurationsResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get configurations failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    /**
     * getBranchOffice
     */
    getBranchOffice(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getBranchOfficeRequest = request.body;
                this.loggerService.info(`Getting branch office for seller => ${getBranchOfficeRequest.sellerCode}`);
                let offices = yield this.configurationService.getBranchOffice(getBranchOfficeRequest);
                let getBranchOfficeResponse = new Responses.ProcessResponse();
                getBranchOfficeResponse.success = true;
                getBranchOfficeResponse.resource = offices;
                this.loggerService.info(`The 'Get Branch Office' process found <${offices ? offices.length : 0}> offices for seller <${getBranchOfficeRequest.sellerCode}>`);
                response.status(200).json(getBranchOfficeResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get Branch Office failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    /**
     * getCustomers
     */
    getCustomers(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getCustomersRequest = request.body;
                this.loggerService.info(`Getting customers for seller => ${getCustomersRequest.sellerCode}`);
                let customers = yield this.customerService.getCustomers(getCustomersRequest);
                let getCustomersResponse = new Responses.ProcessResponse();
                getCustomersResponse.success = true;
                getCustomersResponse.resource = customers;
                this.loggerService.info(`The 'Get Customers' process found <${customers ? customers.length : 0}> customers for seller <${getCustomersRequest.sellerCode}>`);
                response.status(200).json(getCustomersResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get Customers failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    /**
     * getProducts
     */
    getProducts(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getProductsRequest = request.body;
                this.loggerService.info(`Getting products for seller => ${getProductsRequest.sellerCode}`);
                let products = yield this.productService.getProducts(getProductsRequest);
                let getProductsResponse = new Responses.ProcessResponse();
                getProductsResponse.success = true;
                getProductsResponse.resource = products;
                this.loggerService.info(`The 'Get Products' process found <${products ? products.length : 0}> products for seller <${getProductsRequest.sellerCode}>`);
                response.status(200).json(getProductsResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get Products failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    /**
     * Get the serial numbers for products that use serial number
     */
    getSerialNumbers(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let serialNumbersResponse = new Responses.ProcessResponse();
            try {
                const getSerialNumbersRequest = request.body;
                this.loggerService.info(`Getting serial numbers for seller => ${getSerialNumbersRequest.sellerCode}`);
                let serialNumbers = yield this.productService.getSerialNumbers(getSerialNumbersRequest);
                serialNumbersResponse.success = true;
                serialNumbersResponse.resource = serialNumbers;
                this.loggerService.info(`The 'Get Serial Numbers' process found <${serialNumbers ? serialNumbers.length : 0}> series for seller <${getSerialNumbersRequest.sellerCode}>`);
                response.status(200).json(serialNumbersResponse);
            }
            catch (error) {
                serialNumbersResponse.errors = [error.message || error];
                response.status(200).json(serialNumbersResponse);
                this.loggerService.error(`Get Serial Numbers failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    /**
     * getSequences
     */
    getSequences(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getSequencesRequest = request.body;
                this.loggerService.info(`Getting sequences for seller => ${getSequencesRequest.sellerCode}`);
                let sequences = yield this.sequenceService.getSequences(getSequencesRequest);
                let getSequencesResponse = new Responses.ProcessResponse();
                getSequencesResponse.success = true;
                getSequencesResponse.resource = sequences;
                this.loggerService.info(`The 'Get Sequences' process found <${sequences ? sequences.length : 0}> sequences for seller <${getSequencesRequest.sellerCode}>`);
                response.status(200).json(getSequencesResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get Sequences failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    // -------------------------------------------------------------------------------
    //                              SURVEY MODULE
    // -------------------------------------------------------------------------------
    /**
     * getSurveys
     */
    getSurveys(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getSurveysRequest = request.body;
                this.loggerService.info(`Getting surveys for seller => ${getSurveysRequest.sellerCode}`);
                let surveys = yield this.surveyService.getSurveys(getSurveysRequest);
                let surveysResponse = new Responses.ProcessResponse();
                surveysResponse.success = true;
                surveysResponse.resource = surveys;
                this.loggerService.info(`The 'Get Surveys' process found <${surveys ? surveys.length : 0}> surveys for seller <${getSurveysRequest.sellerCode}>`);
                response.status(200).json(surveysResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get Surveys failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    /**
     * getSurveyQuestions
     */
    getSurveyQuestions(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getSurveyQuestionsRequest = request.body;
                this.loggerService.info(`Getting survey questions for seller => ${getSurveyQuestionsRequest.sellerCode}`);
                let surveyQuestions = yield this.surveyService.getSurveyQuestions(getSurveyQuestionsRequest);
                let surveyQuestionsResponse = new Responses.ProcessResponse();
                surveyQuestionsResponse.success = true;
                surveyQuestionsResponse.resource = surveyQuestions;
                this.loggerService.info(`The 'Get Survey Questions' process found <${surveyQuestions ? surveyQuestions.length : 0}> questions for seller <${getSurveyQuestionsRequest.sellerCode}>`);
                response.status(200).json(surveyQuestionsResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get Survey Questions failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    /**
     * getSurveyAnswers
     */
    getSurveyAnswers(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getSurveyAnswersRequest = request.body;
                this.loggerService.info(`Getting survey answers for seller => ${getSurveyAnswersRequest.sellerCode}`);
                let surveyAnswers = yield this.surveyService.getSurveyAnswers(getSurveyAnswersRequest);
                let surveyAnswersResponse = new Responses.ProcessResponse();
                surveyAnswersResponse.success = true;
                surveyAnswersResponse.resource = surveyAnswers;
                this.loggerService.info(`The 'Get Survey Answers' process found <${surveyAnswers ? surveyAnswers.length : 0}> answers for seller <${getSurveyAnswersRequest.sellerCode}>`);
                response.status(200).json(surveyAnswersResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get Survey Answers failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    // -------------------------------------------------------------------------------
    //                              PAYMENTS MODULE
    // -------------------------------------------------------------------------------
    /**
     * getUnpaidBills
     */
    getUnpaidBills(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getCustomersRequest = request.body;
                this.loggerService.info(`Getting unpaid bills for seller => ${getCustomersRequest.sellerCode}`);
                let unpaidBills = yield this.customerService.getUnpaidBills(getCustomersRequest);
                let unpaidBillsResponse = new Responses.ProcessResponse();
                unpaidBillsResponse.success = true;
                unpaidBillsResponse.resource = unpaidBills;
                this.loggerService.info(`The 'Get Unpaid Bills' process found <${unpaidBills ? unpaidBills.length : 0}> invoices for seller <${getCustomersRequest.sellerCode}>`);
                response.status(200).json(unpaidBillsResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get Unpaid Bills failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    /**
     * getUnpaidBillsDetail
     */
    getUnpaidBillsDetail(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getUnpaidBillsDetailRequest = request.body;
                this.loggerService.info(`Getting unpaid bills detail for seller => ${getUnpaidBillsDetailRequest.sellerCode}`);
                let unpaidBillsDetail = yield this.customerService.getUnpaidBillsDetail(getUnpaidBillsDetailRequest);
                let unpaidBillsDetailResponse = new Responses.ProcessResponse();
                unpaidBillsDetailResponse.success = true;
                unpaidBillsDetailResponse.resource = unpaidBillsDetail;
                this.loggerService.info(`The 'Get Unpaid Bills Detail' process found <${unpaidBillsDetail ? unpaidBillsDetail.length : 0}> invoices details for seller <${getUnpaidBillsDetailRequest.sellerCode}>`);
                response.status(200).json(unpaidBillsDetailResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get Unpaid Bills Detail failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    // ------------------------------------------------------------
    //                            PROMOS
    // ------------------------------------------------------------
    /**
     * getPromoHierarchyValues
     */
    getPromoHierarchyValues(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getPromoHierarchyValuesRequest = request.body;
                this.loggerService.info(`Getting promo hierarchy values for seller => ${getPromoHierarchyValuesRequest.sellerCode}`);
                let promoHierarchyValues = yield this.promoService.getPromoHierarchyValues(getPromoHierarchyValuesRequest);
                let promoHierarchyValuesResponse = new Responses.ProcessResponse();
                promoHierarchyValuesResponse.success = true;
                promoHierarchyValuesResponse.resource = promoHierarchyValues;
                this.loggerService.info(`The 'Get Promo Hierarchy Values' process found <${promoHierarchyValues ? promoHierarchyValues.length : 0}> values for seller <${getPromoHierarchyValuesRequest.sellerCode}>`);
                response.status(200).json(promoHierarchyValuesResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get Promo Hierarchy Values failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    /**
     * getDiscountsByScale
     */
    getDiscountsByScale(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getDiscountsByScaleRequest = request.body;
                this.loggerService.info(`Getting discounts by scale for seller => ${getDiscountsByScaleRequest.sellerCode}`);
                let promoHierarchyValues = yield this.promoService.getDiscountsByScale(getDiscountsByScaleRequest);
                let discountsByScaleResponse = new Responses.ProcessResponse();
                discountsByScaleResponse.success = true;
                discountsByScaleResponse.resource = promoHierarchyValues;
                this.loggerService.info(`The 'Get Discounts By Scale' process found <${promoHierarchyValues ? promoHierarchyValues.length : 0}> discounts for seller <${getDiscountsByScaleRequest.sellerCode}>`);
                response.status(200).json(discountsByScaleResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get Discounts By Scale failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    /**
     * getBonusByMultiple
     */
    getBonusByMultiple(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getBonusByMultipleRequest = request.body;
                this.loggerService.info(`Getting bonuses by multiple for seller => ${getBonusByMultipleRequest.sellerCode}`);
                let bonusesByMultiple = yield this.promoService.getBonusByMultiple(getBonusByMultipleRequest);
                let bonusByMultipleResponse = new Responses.ProcessResponse();
                bonusByMultipleResponse.success = true;
                bonusByMultipleResponse.resource = bonusesByMultiple;
                this.loggerService.info(`The 'Get Bonus By Multiple' process found <${bonusesByMultiple ? bonusesByMultiple.length : 0}> bonuses for seller <${getBonusByMultipleRequest.sellerCode}>`);
                response.status(200).json(bonusByMultipleResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get Bonus By Multiple failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    // Get Application Update
    getApplicationUpdate(_request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.loggerService.info("Getting application update...");
                const applicationFileNames = yield this.routeService.getAppUpdateSettings();
                const applicationFileName = utilities_1.firstOrDefault(applicationFileNames);
                // IF NOT PARAMETER FOR "APK FILE NAME"
                if (!applicationFileName) {
                    this.loggerService.info("No file name parameter...");
                    return response
                        .status(404)
                        .send("No se ha encontrado parámetro de 'Nombre de archivo de actualización'.");
                }
                const files = utilities_1.findAllFiles(pathModule.join(__dirname, "../../app-updates/"), // <== Directory that will be used to search APK files
                ".apk");
                // IF NO .apk FILES
                if (!files || !files.length) {
                    this.loggerService.info("No files on server...");
                    return response
                        .status(404)
                        .send("No se han encontrado archivos compatibles para la actualización");
                }
                const file = files.find((fileUrl) => {
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
            }
            catch (error) {
                this.loggerService.error(`Get Application Update fail. Error => ${JSON.stringify(error.message || error)}`);
                return response
                    .status(500)
                    .send("Ha ocurrido un error al realizar el proceso de actualización.");
            }
        });
    }
    /**
     * getZeroBalnce
     */
    getZeroBalance(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getZeroBalanceRequest = request.body;
                this.loggerService.info(`Getting zero balance for seller => ${getZeroBalanceRequest.sellerCode}`);
                let zeroBalance = yield this.zeroBalanceService.getZeroBalance(getZeroBalanceRequest);
                let zeroBalanceResponse = new Responses.ProcessResponse();
                zeroBalanceResponse.success = true;
                zeroBalanceResponse.resource = zeroBalance;
                this.loggerService.info(`The 'Get Zero Balance' process found <${zeroBalance ? zeroBalance.length : 0}> bonuses for seller <${getZeroBalanceRequest.sellerCode}>`);
                response.status(200).json(zeroBalanceResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get Zero Balance failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    /**
     * getPosByCustomer
     */
    getPosByCustomer(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const routeInitialization = request.body;
                this.loggerService.info(`Getting POS by Customer for seller => ${routeInitialization.sellerCode}`);
                let model = yield this.posByCustomerService.getPosByCustomer(routeInitialization);
                let processResponse = new Responses.ProcessResponse();
                processResponse.success = true;
                processResponse.resource = model;
                this.loggerService.info(`The 'Get POS by Customer' process found <${model ? model.length : 0}> seller <${routeInitialization.sellerCode}>`);
                response.status(200).json(processResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get POS by Customer failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    /**
     * getGoalGeneralBySellerCode
     */
    getGoalGeneralBySellerCode(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const routeInitialization = request.body;
                this.loggerService.info(`Getting goals general for seller => ${routeInitialization.sellerCode}`);
                let model = yield this.goalService.getGoalGeneralBySellerCode(routeInitialization);
                let processResponse = new Responses.ProcessResponse();
                processResponse.success = true;
                processResponse.resource = model;
                this.loggerService.info(`The 'Get goals general' process found <${model ? model.length : 0}> seller <${routeInitialization.sellerCode}>`);
                response.status(200).json(processResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get goals general failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    /**
     * getGoalPosByAirTimeBySellerCode
     */
    getGoalPosByAirTimeBySellerCode(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const routeInitialization = request.body;
                this.loggerService.info(`Getting goals pos by air time for seller => ${routeInitialization.sellerCode}`);
                let model = yield this.goalService.getGoalPosByAirTimeBySellerCode(routeInitialization);
                let processResponse = new Responses.ProcessResponse();
                processResponse.success = true;
                processResponse.resource = model;
                this.loggerService.info(`The 'Get goals pos by air time' process found <${model ? model.length : 0}> seller <${routeInitialization.sellerCode}>`);
                response.status(200).json(processResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get goals pos by air time failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
    /**
     * geLabelTranslationt
     */
    geLabelTranslationt(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const routeInitialization = request.body;
                this.loggerService.info(`Getting label translation => ${routeInitialization.sellerCode}`);
                let model = yield this.labelTranslationService.getLabelTranslation();
                let processResponse = new Responses.ProcessResponse();
                processResponse.success = true;
                processResponse.resource = model;
                this.loggerService.info(`The 'Get labels translation' process found <${model ? model.length : 0}> seller <${routeInitialization.sellerCode}>`);
                response.status(200).json(processResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`Get labels translation failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        });
    }
};
RouteInitializationController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [services_1.LoggerService,
        services_1.CustomerService,
        services_1.ProductService,
        services_1.SequenceService,
        services_1.ConfigurationService,
        services_1.SurveyService,
        services_1.RouteService,
        services_1.PromoService,
        services_1.ZeroBalanceService,
        services_1.PosByCustomerService,
        services_1.GoalService,
        services_1.LabelTranslationService])
], RouteInitializationController);
exports.RouteInitializationController = RouteInitializationController;
//# sourceMappingURL=route-initialization.controller.js.map