import { Enums } from "../../utilities/utilities";

export class AuthenticatedUser {
  userID: number = null;
  userName: string = null;
  companyID: number = null;
  companyName: string = null;
  roleID: number = null;
  roleName: string = null;
  sellerCode: string = null;
  warehouseCode: string = null;
  priceListCode: string = null;
  userType: string = null;
  userTypeDescription: string = null;
  lastLogin: Date = null;
  branchOfficeId: number = null;
  userAvatar: string = null;
  alternateWarehouse: string = null;
  usePaymentsModule: number = Enums.YesNo.No;
  priceListType: string = Enums.PriceListType.Seller;
  appVersionParam: string = null;
  pinPos: string = null;
}
