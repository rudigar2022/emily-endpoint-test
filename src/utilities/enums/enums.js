"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Enums {
}
exports.Enums = Enums;
Enums.Socket = {
    OwnEvents: {
        Connection: "connection",
        Disconnect: "disconnect",
    },
    Request: {
        DataSinchronization: "DATA_SINCHRONIZATION",
        Handshake: "HandshakeRequest",
        CloseInventoryTransfer: "Close_Emilia_Inventory_Transfer_Message",
        CloseZeroBalance: "Close_Emilia_Zero_Balance_Message",
    },
    Response: {
        DataSinchronizationResult: "DATA_SINCHRONIZATION_RESULT",
        Handshake: "HandshakeResponse",
        CloseInventoryTransferResponse: "Close_Emilia_Inventory_Transfer_Message_Response",
        CloseZeroBalanceResponse: "Close_Emilia_Zero_Balance_Message_Response",
    },
};
/**
 * Used to know the type of data that mobile app will synchronize to the server
 */
Enums.RouteData = {
    Configurations: "CONFIGURATION",
    Customers: "CUSTOMER",
    Products: "PRODUCT",
    Sequences: "SEQUENCE",
    Survey: "SURVEY",
    SaleOrder: "SALE_ORDER",
    Invoice: "INVOICE",
    VisitCanceled: "VISIT_CANCELED",
    CustomerChange: "CUSTOMER_CHANGE",
    UnpaidBills: "UNPAID_BILLS",
    CreditNote: "CREDIT_NOTE",
    GoalGeneralCurrentAmount: "GOAL_GENERAL_CURRENT_AMOUNT",
    GoalPosByAirTimeCurrentQty: "GOAL_POS_BY_AIRTIME_CURRENT_QTY",
};
Enums.YesNo = {
    No: 0,
    Yes: 1,
};
Enums.PriceListType = {
    Seller: "SELLER",
    Customer: "CUSTOMER",
};
// BROADCAST
Enums.Notification = {
    InventoryTransfer: "Emilia_Inventory_Transfer_Message",
    ZeroBalance: "Emilia_Zero_Balance_Message",
};
Enums.InvoiceTypeFel = {
    NormalInvoice: "FACTURA_NORMAL",
    TobaccoInvoice: "FACTURA_TABACO",
};
//# sourceMappingURL=enums.js.map