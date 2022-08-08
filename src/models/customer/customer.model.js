"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor() {
        this.uuid = null;
        this.code = null;
        this.name = null;
        this.address = null;
        this.phone = null;
        this.email = null;
        this.personalIdentification = null;
        this.taxId = null;
        this.contactName = null;
        this.salesPointName = null;
        this.billingTaxId = null;
        this.billingName = null;
        this.billingAddress = null;
        this.visitFrequency = null;
        this.gps = null;
        this.latitude = null;
        this.longitude = null;
        this.department = null;
        this.city = null;
        this.documentSerie = null;
        this.documentNumber = null;
        this.createdDatetime = null;
        this.creditLimit = 0;
        this.creditUsed = 0;
        this.creditAvailable = 0;
        this.sequence = 0;
        this.isActive = false;
        this.isNew = false;
        this.processedFrom = null;
        this.login = null;
        this.sellerCode = null;
        this.monday = 0;
        this.tuesday = 0;
        this.wednesday = 0;
        this.thursday = 0;
        this.friday = 0;
        this.saturday = 0;
        this.sunday = 0;
        this.postedOnServer = null;
        this.postedDatetime = null;
        this.postingResponse = null;
        this.serverId = null;
        this.stcDiscount = 0;
        // Auxiliar
        this.unpaidBills = [];
        this.unpaidBillsDetails = [];
        this.customerImages = [];
        this.nrc = null;
        this.businessLine = null;
    }
}
exports.Customer = Customer;
//# sourceMappingURL=customer.model.js.map