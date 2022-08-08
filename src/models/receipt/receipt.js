"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Receipt {
    constructor() {
        this.id = null;
        this.customerCode = null;
        this.customerName = null;
        this.documentSerie = null;
        this.documentNumber = null;
        this.documentDatetime = null;
        this.postedDatetime = null;
        this.sellerCode = null;
        this.login = null;
        this.expectedGps = null;
        this.postedGps = null;
        this.total = null;
        this.comment = null;
        this.manuallyAssigned = null;
        this.postedOnServer = null;
        this.postingResponse = null;
        this.serverId = null;
        this.paidInvoicesByReceipt = [];
        this.distance = 0;
        this.expectedLatitude = 0;
        this.expectedLongitud = 0;
        this.postedLatitude = 0;
        this.postedLongitud = 0;
    }
}
exports.Receipt = Receipt;
//# sourceMappingURL=receipt.js.map