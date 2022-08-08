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
const database_service_1 = require("../database/database.service");
const Configurations = require("../../configurations/configurations.json");
let SequenceService = class SequenceService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    /**
     * getSequences
     */
    getSequences(getSequencesRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let parameters = [
                {
                    name: "SellerCode",
                    value: getSequencesRequest.sellerCode,
                },
            ];
            let sequences = yield this.databaseService.executeDatabaseObject(`[${Configurations.database.databaseSchema}].[GetSequences]`, parameters);
            return sequences;
        });
    }
};
SequenceService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SequenceService);
exports.SequenceService = SequenceService;
//# sourceMappingURL=sequence.service.js.map