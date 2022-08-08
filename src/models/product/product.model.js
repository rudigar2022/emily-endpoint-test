"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor() {
        this.code = null;
        this.warehouseCode = null;
        this.name = null;
        this.available = 0;
        this.priceListCode = null;
        this.price = 0;
        this.useSerialNumber = false;
        this.isSimCard = false;
        this.salesPackUnit = null;
        this.sold = 0;
        this.initialQuantity = 0;
        this.useStc = 0;
        this.serialNumbers = [];
        this.isAirTime = 0;
        this.posIsAirTime = [];
        // Tax
        this.suggestedPrice = 0;
        this.categoryCode = null;
        this.isTobacco = false;
        this.tobaccoTaxCode = null;
        this.tobaccoTaxRate = 0;
        // Impuesto calculado desde la Base de Datos de Emilia usando la formula = ((Precio Sugerido/IVA)/MINIMO IMPUESTO AL TABACO*PORCENTAJE DE IMPUESTO AL TABACO/100)
        this.tobaccoTax = 0;
        this.vatFree = false;
        this.vatCode = null;
        this.vatRate = 0;
        this.vatUnitCode = 1; // Codigo de unidad Gravable FEL 1 = Afecto a IVA, 2 = Exento de IVA
    }
}
exports.Product = Product;
//# sourceMappingURL=product.model.js.map