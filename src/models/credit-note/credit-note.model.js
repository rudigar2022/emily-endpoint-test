"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreditNote {
    constructor() {
        this.customerCode = null;
        this.customerName = null;
        this.customerDiscountPercentage = 0;
        this.customerBillingTaxId = null;
        this.customerBillingName = null;
        this.customerBillingAddress = null;
        this.warehouseCode = null;
        this.documentDate = null;
        this.expectedGps = null;
        this.postedGps = null;
        this.login = null;
        this.sellerCode = null;
        this.documentSerie = null;
        this.documentNumber = null;
        this.total = 0;
        this.networkType = null;
        this.deviceBatteryQuantity = 0;
        this.deviceId = null;
        this.postedOnServer = 0;
        this.postedDatetime = null;
        this.postingResponse = null;
        this.serverId = null;
        // FIXME: This must be an array of CreditNoteDetail objects
        this.stcProducts = null;
        // -----------------------------------------------------------------------
        //                        SOURCE DOCUMENT FEL
        // -----------------------------------------------------------------------
        this.fromElectronicSignatureFEL = null;
        this.fromDocumentSerieFEL = null;
        this.fromDocumentNumberFEL = null;
        this.fromDateOfSignatureFEL = null;
        this.fromContingencyDocument = false;
        // -----------------------------------------------------------------------
        //                        FEL
        // -----------------------------------------------------------------------
        this.signingProcessCompletedFEL = false;
        this.electronicSignatureFEL = null;
        this.documentSerieFEL = null;
        this.documentNumberFEL = null;
        this.documentUrlFEL = null;
        this.documentTypeFEL = null;
        this.stablishmentCodeFEL = null;
        this.dateOfSignatureFEL = null;
        this.certifiedXmlFEL = null;
        this.isContingencyDocumentFEL = false;
        this.contingencyDocumentSerieFEL = null;
        this.contingencyDocumentNumberFEL = null;
        this.distance = 0;
        this.expectedLatitude = 0;
        this.expectedLongitud = 0;
        this.postedLatitude = 0;
        this.postedLongitud = 0;
    }
}
exports.CreditNote = CreditNote;
//# sourceMappingURL=credit-note.model.js.map