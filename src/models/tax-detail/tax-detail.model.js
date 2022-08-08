"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaxDetail {
    /**
     * Constructor used to create an instance of TaxDetail
     * @param shortName Nombre Corto (Identifica al impuesto Ej. "IVA")
     * @param taxableUnitCode Codigo unidad gravable (1 = afecto, 2 = exento, Etc...)
     * @param taxableUnitsQuantity Cantidad Unidades Gravables (Unicamente cuando es impuesto de petroleo/tabaco)
     * @param taxableAmount Monto Gravable (Monto menos el impuesto)
     * @param taxAmount Monto Impuesto (Monto equivalente al impuesto, valor que se resta de `TaxableAmount`)
     * @param total Total (El monto total, del cual se derivan `TaxableAmount` y `TaxAmount`)
     */
    constructor(shortName, taxableUnitCode, taxableUnitsQuantity, taxableAmount, taxAmount, total) {
        // Used to chain this objecto with it's owner
        this.saleDocumentUid = null;
        // Used to chain this objecto with it's product owner
        this.saleDocumentDetailUid = null;
        /// <summary>
        /// Nombre Corto (Identifica al impuesto Ej. "IVA")
        /// </summary>
        this.shortName = null;
        /// <summary>
        /// Codigo unidad gravable (1 = afecto, 2 = exento, Etc...)
        /// </summary>
        this.taxableUnitCode = null;
        /// <summary>
        /// Cantidad Unidades Gravables (Unicamente cuando es impuesto de petroleo/tabaco)
        /// </summary>
        this.taxableUnitsQuantity = null;
        /// <summary>
        /// Monto Gravable (Monto menos el impuesto)
        /// </summary>
        this.taxableAmount = null;
        /// <summary>
        /// Monto Impuesto (Monto equivalente al impuesto, valor que se resta de `TaxableAmount`)
        /// </summary>
        this.taxAmount = null;
        /// <summary>
        /// Total (El monto total, del cual se derivan `TaxableAmount` y `TaxAmount`)
        /// </summary>
        this.total = null;
        this.shortName = shortName;
        this.taxableUnitCode = taxableUnitCode;
        this.taxableUnitsQuantity = taxableUnitsQuantity;
        this.taxableAmount = taxableAmount;
        this.taxAmount = taxAmount;
        this.total = total;
    }
}
exports.TaxDetail = TaxDetail;
//# sourceMappingURL=tax-detail.model.js.map