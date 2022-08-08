import { Product } from '../product/product.model';

export class RouteLiquidation {
  sellerCode: string = null;
  sellerName: string = null;
  branchOfficeId: number = null;
  warehouseCode: string = null;
  creationDate: string = null;
  totalInvoiced: number = null;

  routeLiquidationDetail: Array<Product> = [];
}
