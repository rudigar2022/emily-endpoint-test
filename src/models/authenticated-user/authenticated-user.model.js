"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("../../utilities/utilities");
class AuthenticatedUser {
    constructor() {
        this.userID = null;
        this.userName = null;
        this.companyID = null;
        this.companyName = null;
        this.roleID = null;
        this.roleName = null;
        this.sellerCode = null;
        this.warehouseCode = null;
        this.priceListCode = null;
        this.userType = null;
        this.userTypeDescription = null;
        this.lastLogin = null;
        this.branchOfficeId = null;
        this.userAvatar = null;
        this.alternateWarehouse = null;
        this.usePaymentsModule = utilities_1.Enums.YesNo.No;
        this.priceListType = utilities_1.Enums.PriceListType.Seller;
        this.appVersionParam = null;
        this.pinPos = null;
    }
}
exports.AuthenticatedUser = AuthenticatedUser;
//# sourceMappingURL=authenticated-user.model.js.map