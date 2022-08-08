import { InventoryTransferDetail } from "../inventory-transfer-detail/inventory-transfer-detail.model";

export class InventoryTransfer {
  id: number = null;
  erpId: number = null;
  erpDate: string = null;
  fromDistributionCenter: string = null;
  fromWarehouse: string = null;
  toDistributionCenter: string = null;
  toWarehouse: string = null;
  userLogin: string = null;
  sellerCode: string = null;
  transferStatus: string = null;
  scheduledFor: string = null;

  inventoryTransferDetail: Array<InventoryTransferDetail> = [];
}
