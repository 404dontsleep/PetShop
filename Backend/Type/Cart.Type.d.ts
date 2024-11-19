import { IAddressModel } from "./User.Type";

interface ICartModel {
  CartID: number;
  UserID: number;
}

interface IItemModel {
  ItemID: number;
  CartID?: number;
  OrderID?: number;
  ProductID: number;
  Quantity: number;
}
interface IOrderItemModel {
  Quantity: number;
  Product: {
    ProductID: number;
    Name: string;
    Price: number;
    Image?: string;
  };
}
interface IOrderModel {
  OrderID: number;
  UserID: number;
  Address: IAddressModel;
  Items: IOrderItemModel[];
  Total: number;
  OrderDate: Date;
  Status: TOrderStatus;
}
type TOrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled";

export { ICartModel, IItemModel, IOrderModel, TOrderStatus, IOrderItemModel };
