"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SqlServiceBrokerResponse {
    /**
     * Creates a new 'ServiceBrokerResponse' object
     */
    constructor(conversationId, messageBody, messageType, loginId) {
        this.conversationId = conversationId || null;
        this.messageBody = messageBody || null;
        this.messageType = messageType || null;
        this.loginId = loginId || null;
    }
}
exports.SqlServiceBrokerResponse = SqlServiceBrokerResponse;
//# sourceMappingURL=sql-service-broker-response.model.js.map