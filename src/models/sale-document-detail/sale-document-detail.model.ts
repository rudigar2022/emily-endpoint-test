import { SaleDocumentProductAirTime } from "../sale-document-product-air-time/saleDocumentProductAirTime.model";

export class SaleDocumentDetail {
  saleDocumentSerie: string = null;
  saleDocumentNumber: number = null;

  productCode: string = null;
  productDescription: string = null;
  availableQuantity: number = null;

  lineSequence: number = null;
  quantity: number = null;
  unitPrice: number = null;
  subtotal: number = null;
  discountPercentage: number = null;
  discountAmount: number = null;
  totalLine: number = null;

  useSerialNumber: boolean = false;
  isSimCard: boolean = false;
  serialNumber: string = null;
  telephoneNumber: string = null;
  soldToPersonalIdentificationNumber: string = null;
  productSalesPackUnit: string = null;

  goodOrService: string = null;
  useStc: number = 0;

  // ---------------------------------------
  //        Auxiliars for Promo
  // ---------------------------------------
  promoId: number = null;
  promoName: string = null;
  promoHierarchy: string = null;
  promoCostCenter: string = null;
  promoUtilityCenter: string = null;

  // Bonus
  promoIsBonus: number = 0;
  promoBonusBaseQuantity: number = null;
  promoBonusQuantity: number = null;
  promoBonusStopQuantity: number = null;
  /// Sale Air Time
  isAirTime: boolean = false;
  productAirTime: Array<SaleDocumentProductAirTime> = [];
  /// Tax
  suggestedPrice: number = 0;
  categoryCode: string = null;
  isTobacco: number | boolean = false;
  tobaccoTaxCode: string = null;
  tobaccoTaxRate: number = 0;
  tobaccoUnitCode: number = 2; // Codigo de unidad Gravable FEL 1 = Exportador, 2 = Consumidor
  unitaryTobaccoTaxCalculated: number = 0; // Impuesto calculado desde la Base de Datos de Emilia usando la formula = ((Precio Sugerido/IVA)/MINIMO IMPUESTO AL TABACO*PORCENTAJE DE IMPUESTO AL TABACO/100)
  vatFree: number | boolean = false;
  vatCode: string = null;
  vatRate: number = 0;
  vatUnitCode: number = 1; // Codigo de unidad Gravable FEL 1 = Afecto a IVA, 2 = Exento de IVA
  lineTobaccoTaxAmount: number = 0;
}
