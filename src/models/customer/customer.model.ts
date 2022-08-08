import { UnpaidBillsDetail } from "../models";
import { UnpaidBills } from "../unpaid-bills/unpaid-bills";

export class Customer {
  uuid: string = null;
  code: string = null;
  name: string = null;
  address: string = null;
  phone: string = null;
  email: string = null;
  personalIdentification: string = null;
  taxId: string = null;
  contactName: string = null;
  salesPointName: string = null;
  billingTaxId: string = null;
  billingName: string = null;
  billingAddress: string = null;
  visitFrequency: number = null;
  gps: string = null;
  latitude: string = null;
  longitude: string = null;
  department: string = null;
  city: string = null;
  documentSerie: string = null;
  documentNumber: number = null;
  createdDatetime: string = null;
  creditLimit: number = 0;
  creditUsed: number = 0;
  creditAvailable: number = 0;
  sequence: number = 0;
  isActive: boolean = false;
  isNew: boolean = false;
  processedFrom: string = null;
  login: string = null;
  sellerCode: string = null;
  monday: number = 0;
  tuesday: number = 0;
  wednesday: number = 0;
  thursday: number = 0;
  friday: number = 0;
  saturday: number = 0;
  sunday: number = 0;
  postedOnServer: number = null;
  postedDatetime: string = null;
  postingResponse: string = null;
  serverId: number = null;
  stcDiscount: number = 0;

  // Auxiliar
  unpaidBills: Array<UnpaidBills> = [];
  unpaidBillsDetails: Array<UnpaidBillsDetail> = [];
  customerImages: Array<string> = [];

  nrc: string = null;
  businessLine: string = null;
}
