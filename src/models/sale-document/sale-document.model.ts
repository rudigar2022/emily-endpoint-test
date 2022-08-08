import { SaleDocumentDetail } from "../sale-document-detail/sale-document-detail.model";
import { SaleDocumentImage } from "../sale-document-image/sale-document-image.model";
import { SaleDocumentExtendedFields } from "../models";
import { Enums } from "../../utilities/utilities";

export class SaleDocument {
  id: number = null;
  customerCode: string = null;
  customerName: string = null;
  customerAddress: string = null;
  customerTaxId: string = null;
  customerPhone: string = null;
  customerPersonalIdentificationNumber: string = null;
  billingTaxId: string = null;
  billingName: string = null;
  billingAddress: string = null;
  wareouseCode: string = null;
  sellerCode: string = null;
  priceListCode: string = null;
  login: string = null;
  documentDatetime: string = null;
  deliveryDate: string = null;
  postedDatetime: string = null;
  expectedGps: string = null;
  postedGps: string = null;
  documentSerie: string = null;
  documentNumber: number = null;
  comment: string = null;
  subtotal: number = null;
  discountPercentage: number = null;
  discountAmount: number = null;
  total: number = null;

  postedOnServer: number = null;
  postingResponse: string = null;
  serverId: number = null;
  networkType: string = null;
  deviceBatteryQuantity: number = null;
  proposedSequence: number = null;
  appliedSequence: number = null;
  processedFrom: string = null;
  saleDocumentType: string = null;

  cashReceived: number = 0;
  change: number = 0;
  customerEmail: string = null;
  customerDepartment: string = null;
  customerMunicipality: string = null;

  saleDocumentDetail: Array<SaleDocumentDetail> = [];

  saleDocumentImages: Array<SaleDocumentImage> = [];

  extendedFields: SaleDocumentExtendedFields = new SaleDocumentExtendedFields();

  startDatetime: string = null;
  endDatetime: string = null;

  // -----------------------------------------------------------------------
  //                        FEL
  // -----------------------------------------------------------------------
  signingProcessCompletedFEL: boolean = false;
  electronicSignatureFEL: string = null;
  documentSerieFEL: string = null;
  documentNumberFEL: number = null;
  documentUrlFEL: string = null;
  isContingencyDocumentFEL: boolean = false;
  contingencyDocumentSerieFEL: string = null;
  contingencyDocumentNumberFEL: number = null;
  documentTypeFEL: string = null;
  documentTypeDescriptionFEL: string = null;
  stablishmentCodeFEL: number = null;
  dateOfSignatureFEL: Date = null;
  certifiedXmlFEL: string = null;

  distance: number = 0;
  expectedLatitude: number = 0;
  expectedLongitud: number = 0;
  postedLatitude: number = 0;
  postedLongitud: number = 0;

  deviceId: string = null;
  documentUid: string = null;
  localTaskUid: string = null;
  tobaccoTaxSum: number = 0;
  invoiceTypeFel: string = Enums.InvoiceTypeFel.NormalInvoice;

  taxDocumentTypeSV: string = null;
  nrc: string = null;
  businessLine: string = null;
}
