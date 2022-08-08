"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaxSummary {
    /**
     * TaxSummary
     * @param shortName
     * @param taxAmount
     */
    constructor(shortName, taxAmount) {
        // Used to chain this objecto with it's owner
        this.saleDocumentUid = null;
        /// <summary>
        /// Nombre Corto
        /// </summary>
        this.shortName = null;
        /// <summary>
        /// Total Monto Impuesto
        /// </summary>
        this.totalTaxAmount = null;
        this.shortName = shortName;
        this.totalTaxAmount = taxAmount;
    }
}
exports.TaxSummary = TaxSummary;
//# sourceMappingURL=tax-summary.model.js.map