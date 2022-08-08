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
var SecurityController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
const services_1 = require("../../services/services");
const Utilities = require("../../utilities/utilities");
const basicAuth = require("express-basic-auth");
const responses_1 = require("../../models/responses/responses");
let SecurityController = SecurityController_1 = class SecurityController {
    /**
     * Default SecurityController constructor
     */
    constructor(loggerService, securityService) {
        this.loggerService = loggerService;
        this.securityService = securityService;
    }
    /**
     * Create a middelware route for handle user authentication
     */
    prepareSecurityControllerRoutes(router) {
        router
            .route("/security/login")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticateUserRequest = request.body;
                this.loggerService.info(`Authenticating user => ${authenticateUserRequest.userId} at ${authenticateUserRequest.companyId}`);
                const authenticatedUser = yield this.securityService.login(authenticateUserRequest);
                const authenticatedUserResponse = {
                    success: true,
                    resource: Utilities.firstOrDefault(authenticatedUser),
                };
                this.loggerService.info(`User authenticated succesfully.}`);
                response.status(200).json(authenticatedUserResponse);
            }
            catch (error) {
                response.status(200).json({
                    success: false,
                    errors: [error.message || error],
                });
                this.loggerService.error(`User authentication failed. Error => ${JSON.stringify(error.message || error)}`);
            }
        }));
        router
            .route("/security/accesses")
            .post((request, response) => __awaiter(this, void 0, void 0, function* () {
            return yield this.getAccessesByrole(request, response);
        }));
    }
    /**
     * getAccessesByrole
     */
    getAccessesByrole(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCredentials = request.body;
            const processResponse = new responses_1.ProcessResponse();
            try {
                this.loggerService.info(`Getting accesses by role id: ${userCredentials.roleId}`);
                let accessesByRole = yield this.securityService.getAccessesByRole(userCredentials);
                processResponse.success = true;
                processResponse.resource = accessesByRole;
            }
            catch (error) {
                this.loggerService.error(`Error getting accesses by role ${userCredentials.roleId}`);
                this.loggerService.error(JSON.stringify(error));
                processResponse.success = false;
                processResponse.errors = [error.message || error];
            }
            response.status(200).json(processResponse);
        });
    }
};
/**
 * basicCredentialsComparer
 */
SecurityController.basicCredentialsComparer = (userName, password) => {
    let userNameMatches = basicAuth.safeCompare(userName, "emilia-user");
    let passwordMatches = basicAuth.safeCompare(password, "emilia-user");
    return userNameMatches && passwordMatches;
};
/**
 * challengeAuthorizer
 */
SecurityController.challengeAuthorizer = basicAuth({
    authorizer: SecurityController_1.basicCredentialsComparer,
    challenge: true,
});
/**
 * basicAuthorizer
 */
SecurityController.basicAuthorizer = basicAuth({
    authorizer: SecurityController_1.basicCredentialsComparer,
    challenge: false,
});
SecurityController = SecurityController_1 = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [services_1.LoggerService,
        services_1.SecurityService])
], SecurityController);
exports.SecurityController = SecurityController;
//# sourceMappingURL=security.controller.js.map