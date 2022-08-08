export class SqlServiceBrokerResponse {
  conversationId: string;
  messageBody: string;
  messageType: string;
  loginId: string;

  /**
   * Creates a new 'ServiceBrokerResponse' object
   */
  public constructor(
    conversationId?: string,
    messageBody?: string,
    messageType?: string,
    loginId?: string
  ) {
    this.conversationId = conversationId || null;
    this.messageBody = messageBody || null;
    this.messageType = messageType || null;
    this.loginId = loginId || null;
  }
}
