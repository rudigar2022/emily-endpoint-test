import { PaidInvoiceByReceipt } from "../models";

export class Receipt {
  id: number = null;
  customerCode: string = null;
  customerName: string = null;
  documentSerie: string = null;
  documentNumber: number = null;
  documentDatetime: string = null;
  postedDatetime: string = null;
  sellerCode: string = null;
  login: string = null;
  expectedGps: string = null;
  postedGps: string = null;
  total: number = null;
  comment: string = null;
  manuallyAssigned: number = null;
  postedOnServer: number = null;
  postingResponse: string = null;
  serverId: number = null;

  paidInvoicesByReceipt: Array<PaidInvoiceByReceipt> = [];

  distance: number = 0;
  expectedLatitude: number = 0;
  expectedLongitud: number = 0;
  postedLatitude: number = 0;
  postedLongitud: number = 0;
}
