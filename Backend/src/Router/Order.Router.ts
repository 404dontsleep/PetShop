import { Router, NextFunction, Request, Response } from "express";
import { OrderModel } from "../Model/Order.Model";
import { IAuthRequest } from "../MiddleWare/Auth.MiddleWare";
import { CartMiddleWare, ICartRequest } from "../MiddleWare/Cart.MiddleWare";
import { AddressModel } from "../Model/Address.Model";
import { ItemModel } from "../Model/Item.Model";
import { ProductModel } from "../Model/Product.Model";
import { IOrderItemModel } from "@MyTypes/Cart.Type";
import { ImageModel } from "../Model/Image.Model";

const OrderRouter = Router();

async function GetOrders(req: Request, res: Response): Promise<void> {
  try {
    const { UserID, Role } = (req as IAuthRequest).User;
    const Orders = await OrderModel.find(
      Role === "Admin" ? {} : { UserID }
    ).select("-__v -_id");
    res.status(200).json({ Orders });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function GetOrder(req: Request, res: Response): Promise<void> {
  try {
    const { OrderID } = req.params;
    const { UserID, Role } = (req as IAuthRequest).User;
    const Order = await OrderModel.findOne(
      Role === "Admin" ? { OrderID } : { OrderID, UserID }
    ).select("-__v -_id");
    if (Order) {
      res.status(200).json({ Order: Order.toObject() });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function CreateOrder(req: Request, res: Response): Promise<void> {
  try {
    const Cart = (req as ICartRequest).Cart;
    const { ItemIDs, AddressID } = req.body;
    const Address = await AddressModel.findOne({ AddressID }).select(
      "-__v -_id"
    );
    if (!Address) throw new Error("Address not found");
    if (!ItemIDs || ItemIDs.length === 0) throw new Error("No item selected");
    const Items = await ItemModel.find({
      ItemID: { $in: ItemIDs },
      CartID: Cart.CartID,
    });
    if (!Items) throw new Error("Items not found");
    let Total = 0;
    const _Items: IOrderItemModel[] = [];
    for (let i = 0; i < Items.length; i++) {
      const Item = Items[i];
      const Product = await ProductModel.findOne({
        ProductID: Item.ProductID,
      }).select("-__v -_id");
      const Image = await ImageModel.findOne({ ProductID: Item.ProductID });
      if (!Product) throw new Error("Product not found");
      Total += Product.Price * Item.Quantity;
      _Items.push({
        Quantity: Item.Quantity,
        Product: {
          ProductID: Product.ProductID,
          Name: Product.Name,
          Price: Product.Price,
          Image: Image ? Image.ImageID : undefined,
        },
      });
    }

    const LastID = await OrderModel.findOne({}).sort({ OrderID: -1 }).exec();
    const OrderID = LastID ? LastID.OrderID + 1 : 1;

    const Order = await OrderModel.create({
      OrderID,
      Address,
      UserID: Cart.UserID,
      Total,
      Items: _Items,
      OrderDate: new Date(),
      Status: "Pending",
    });
    await Order.save();
    for (let i = 0; i < Items.length; i++) {
      const Item = Items[i];
      Item.OrderID = Order.OrderID;
      Item.CartID = undefined;
      await Item.save();
    }
    res.status(200).json({ message: "Order placed successfully", Order });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function UpdateOrder(req: Request, res: Response): Promise<void> {
  try {
    const { UserID, Role } = (req as IAuthRequest).User;
    const { OrderID } = req.params;
    const { Status } = req.body;
    const Order = await OrderModel.findOne(
      Role === "Admin" ? { OrderID } : { OrderID, UserID }
    );
    if (!Order) throw new Error("Order not found");
    // console.log(Order, Role, Status);
    if (Order.Status === "Pending" && Role === "Admin" && Status === "Shipped")
      Order.Status = Status;
    else if (
      Order.Status === "Shipped" &&
      UserID === Order.UserID &&
      Status === "Delivered"
    )
      Order.Status = Status;
    else throw new Error("Forbidden");
    await Order.save();
    res.status(200).json({ message: "Order updated successfully", Order });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function DeleteOrder(req: Request, res: Response): Promise<void> {
  try {
    const { OrderID } = req.params;
    const { UserID, Role } = (req as IAuthRequest).User;
    const Order = await OrderModel.findOne({
      OrderID,
      ...(Role === "Admin" ? {} : { UserID }),
    });
    if (Order && Order.Status === "Pending") {
      Order.Status = "Cancelled";
      await Order.save();
      res.status(200).json({ message: "Order cancelled successfully", Order });
    } else {
      res.status(404).json({ message: "Cannot cancel order" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

OrderRouter.get("/", GetOrders);
OrderRouter.get("/:OrderID", GetOrder);
OrderRouter.post("/checkout", [CartMiddleWare], CreateOrder);
OrderRouter.put("/:OrderID", UpdateOrder);
OrderRouter.delete("/:OrderID", DeleteOrder);

export default OrderRouter;
