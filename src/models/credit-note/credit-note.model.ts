export class CreditNote {
  customerCode: string = null;
  customerName: string = null;
  customerDiscountPercentage: number = 0;
  customerBillingTaxId: string = null;
  customerBillingName: string = null;
  customerBillingAddress: string = null;
  warehouseCode: string = null;
  documentDate: string = null;
  expectedGps: string = null;
  postedGps: string = null;
  login: string = null;
  sellerCode: string = null;
  documentSerie: string = null;
  documentNumber: number = null;
  total: number = 0;
  networkType: string = null;
  deviceBatteryQuantity: number = 0;
  deviceId: string = null;

  postedOnServer: number = 0;
  postedDatetime: string = null;
  postingResponse: string = null;
  serverId: number = null;

  // FIXME: This must be an array of CreditNoteDetail objects
  stcProducts: string = null;

  // -----------------------------------------------------------------------
  //                        SOURCE DOCUMENT FEL
  // -----------------------------------------------------------------------
  fromElectronicSignatureFEL: string = null;
  fromDocumentSerieFEL: string = null;
  fromDocumentNumberFEL: number = null;
  fromDateOfSignatureFEL: string = null;
  fromContingencyDocument: boolean = false;

  // -----------------------------------------------------------------------
  //                        FEL
  // -----------------------------------------------------------------------
  signingProcessCompletedFEL: boolean = false;
  electronicSignatureFEL: string = null;
  documentSerieFEL: string = null;
  documentNumberFEL: number = null;
  documentUrlFEL: string = null;
  documentTypeFEL: string = null;
  stablishmentCodeFEL: number = null;
  dateOfSignatureFEL: Date = null;
  certifiedXmlFEL: string = null;

  isContingencyDocumentFEL: boolean = false;
  contingencyDocumentSerieFEL: string = null;
  contingencyDocumentNumberFEL: number = null;

  distance: number = 0;
  expectedLatitude: number = 0;
  expectedLongitud: number = 0;
  postedLatitude: number = 0;
  postedLongitud: number = 0;
}
