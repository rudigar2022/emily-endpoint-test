export class GoalCurrent {
  uuid: string = null;
  saleDocumentSerie: string = null;
  saleDocumentNumber: number = null;
  createDate: string = null;
  sellerCode: string = null;
  documentType: string = null;
  //General
  currentAmount?: number = null;
  //POS
  pos?: string = null;
  customerCode?: string = null;
  currentQty?: number = null;
  currentTotal?: number = null;
  currentUnitPrice?: number = null;

  postedOnServer?: number = null;
  postedDatetime?: string = null;
  postingResponse?: string = null;
  serverId?: number = null;
}
