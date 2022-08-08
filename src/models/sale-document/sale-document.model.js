"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utilities_1 = require("../../utilities/utilities");
class SaleDocument {
    constructor() {
        this.id = null;
        this.customerCode = null;
        this.customerName = null;
        this.customerAddress = null;
        this.customerTaxId = null;
        this.customerPhone = null;
        this.customerPersonalIdentificationNumber = null;
        this.billingTaxId = null;
        this.billingName = null;
        this.billingAddress = null;
        this.wareouseCode = null;
        this.sellerCode = null;
        this.priceListCode = null;
        this.login = null;
        this.documentDatetime = null;
        this.deliveryDate = null;
        this.postedDatetime = null;
        this.expectedGps = null;
        this.postedGps = null;
        this.documentSerie = null;
        this.documentNumber = null;
        this.comment = null;
        this.subtotal = null;
        this.discountPercentage = null;
        this.discountAmount = null;
        this.total = null;
        this.postedOnServer = null;
        this.postingResponse = null;
        this.serverId = null;
        this.networkType = null;
        this.deviceBatteryQuantity = null;
        this.proposedSequence = null;
        this.appliedSequence = null;
        this.processedFrom = null;
        this.saleDocumentType = null;
        this.cashReceived = 0;
        this.change = 0;
        this.customerEmail = null;
        this.customerDepartment = null;
        this.customerMunicipality = null;
        this.saleDocumentDetail = [];
        this.saleDocumentImages = [];
        this.extendedFields = new models_1.SaleDocumentExtendedFields();
        this.startDatetime = null;
        this.endDatetime = null;
        // -----------------------------------------------------------------------
        //                        FEL
        // -----------------------------------------------------------------------
        this.signingProcessCompletedFEL = false;
        this.electronicSignatureFEL = null;
        this.documentSerieFEL = null;
        this.documentNumberFEL = null;
        this.documentUrlFEL = null;
        this.isContingencyDocumentFEL = false;
        this.contingencyDocumentSerieFEL = null;
        this.contingencyDocumentNumberFEL = null;
        this.documentTypeFEL = null;
        this.documentTypeDescriptionFEL = null;
        this.stablishmentCodeFEL = null;
        this.dateOfSignatureFEL = null;
        this.certifiedXmlFEL = null;
        this.distance = 0;
        this.expectedLatitude = 0;
        this.expectedLongitud = 0;
        this.postedLatitude = 0;
        this.postedLongitud = 0;
        this.deviceId = null;
        this.documentUid = null;
        this.localTaskUid = null;
        this.tobaccoTaxSum = 0;
        this.invoiceTypeFel = utilities_1.Enums.InvoiceTypeFel.NormalInvoice;
        this.taxDocumentTypeSV = null;
        this.nrc = null;
        this.businessLine = null;
    }
}
exports.SaleDocument = SaleDocument;
//# sourceMappingURL=sale-document.model.js.map