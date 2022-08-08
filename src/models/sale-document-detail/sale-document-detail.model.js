"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaleDocumentDetail {
    constructor() {
        this.saleDocumentSerie = null;
        this.saleDocumentNumber = null;
        this.productCode = null;
        this.productDescription = null;
        this.availableQuantity = null;
        this.lineSequence = null;
        this.quantity = null;
        this.unitPrice = null;
        this.subtotal = null;
        this.discountPercentage = null;
        this.discountAmount = null;
        this.totalLine = null;
        this.useSerialNumber = false;
        this.isSimCard = false;
        this.serialNumber = null;
        this.telephoneNumber = null;
        this.soldToPersonalIdentificationNumber = null;
        this.productSalesPackUnit = null;
        this.goodOrService = null;
        this.useStc = 0;
        // ---------------------------------------
        //        Auxiliars for Promo
        // ---------------------------------------
        this.promoId = null;
        this.promoName = null;
        this.promoHierarchy = null;
        this.promoCostCenter = null;
        this.promoUtilityCenter = null;
        // Bonus
        this.promoIsBonus = 0;
        this.promoBonusBaseQuantity = null;
        this.promoBonusQuantity = null;
        this.promoBonusStopQuantity = null;
        /// Sale Air Time
        this.isAirTime = false;
        this.productAirTime = [];
        /// Tax
        this.suggestedPrice = 0;
        this.categoryCode = null;
        this.isTobacco = false;
        this.tobaccoTaxCode = null;
        this.tobaccoTaxRate = 0;
        this.tobaccoUnitCode = 2; // Codigo de unidad Gravable FEL 1 = Exportador, 2 = Consumidor
        this.unitaryTobaccoTaxCalculated = 0; // Impuesto calculado desde la Base de Datos de Emilia usando la formula = ((Precio Sugerido/IVA)/MINIMO IMPUESTO AL TABACO*PORCENTAJE DE IMPUESTO AL TABACO/100)
        this.vatFree = false;
        this.vatCode = null;
        this.vatRate = 0;
        this.vatUnitCode = 1; // Codigo de unidad Gravable FEL 1 = Afecto a IVA, 2 = Exento de IVA
        this.lineTobaccoTaxAmount = 0;
    }
}
exports.SaleDocumentDetail = SaleDocumentDetail;
//# sourceMappingURL=sale-document-detail.model.js.map