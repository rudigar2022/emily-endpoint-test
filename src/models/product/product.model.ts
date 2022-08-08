import { ProductSerialNumber } from "../product-serial-number/product-serial-number.model";
import { SaleDocumentProductAirTime } from "../sale-document-product-air-time/saleDocumentProductAirTime.model";

export class Product {
  code: string = null;
  warehouseCode: string = null;
  name: string = null;
  available: number = 0;
  priceListCode: string = null;
  price: number = 0;
  useSerialNumber: number | boolean = false;
  isSimCard: number | boolean = false;
  salesPackUnit: string = null;
  sold: number = 0;
  initialQuantity: number = 0;
  useStc: number = 0;

  serialNumbers: Array<ProductSerialNumber> = [];
  isAirTime: number = 0;
  posIsAirTime: Array<SaleDocumentProductAirTime> = [];

  // Tax

  suggestedPrice: number = 0;
  categoryCode: string = null;
  isTobacco: number | boolean = false;
  tobaccoTaxCode: string = null;
  tobaccoTaxRate: number = 0;

  // Impuesto calculado desde la Base de Datos de Emilia usando la formula = ((Precio Sugerido/IVA)/MINIMO IMPUESTO AL TABACO*PORCENTAJE DE IMPUESTO AL TABACO/100)
  tobaccoTax: number = 0;

  vatFree: number | boolean = false;
  vatCode: string = null;
  vatRate: number = 0;
  vatUnitCode: number = 1; // Codigo de unidad Gravable FEL 1 = Afecto a IVA, 2 = Exento de IVA
}
