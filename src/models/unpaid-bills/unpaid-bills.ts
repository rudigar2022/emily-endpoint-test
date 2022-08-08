export class UnpaidBills {
  customerCode: string = null;
  erpId: number = null;
  erpDocument: number = null;
  documentDate: string = null;
  dueDate: string = null;
  felAuthorization: string = null;
  felDocument: number = null;
  felSerie: string = null;
  paymentConditions: string = null;
  creditDays: number = null;
  documentTotal: number = null;
  pendingToPaid: number = null;
  isOverdue: number = null;

  // Auxiliar
  isSelected: boolean;
  amountToPaid: number;
  payedAmount: number;
}
