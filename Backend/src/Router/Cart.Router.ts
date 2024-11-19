import { Request, Response, Router } from "express";
import { CartMiddleWare, ICartRequest } from "../MiddleWare/Cart.MiddleWare";
import { ItemModel } from "../Model/Item.Model";
import { ProductModel } from "../Model/Product.Model";
import { ResJSON } from "../Helper/Helper";

const CartRouter = Router();

async function GetCart(req: Request, res: Response): Promise<void> {
  try {
    const { CartID } = (req as ICartRequest).Cart;
    const Items = await ItemModel.find({ CartID }).select("-__v -_id");
    res.status(200).json({ Cart: Items });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function AddToCart(req: Request, res: Response): Promise<void> {
  try {
    const { ProductID, Quantity } = req.body;
    const { CartID } = (req as ICartRequest).Cart;

    const Product = await ProductModel.findOne({ ProductID });
    if (!Product) throw new Error("Product not found");

    const LastID = await ItemModel.findOne({}).sort({ ItemID: -1 }).exec();
    const ItemID = LastID ? LastID.ItemID + 1 : 1;

    const Item = new ItemModel({
      ItemID,
      ProductID,
      Quantity,
      CartID,
    });
    await Item.save();
    res.status(200).json({
      message: "Item added to cart successfully",
      Item: ResJSON(Item.toObject()),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function RemoveFromCart(req: Request, res: Response): Promise<void> {
  try {
    const { ItemID } = req.body;
    const { CartID } = (req as ICartRequest).Cart;
    const Item = await ItemModel.findOneAndDelete({ ItemID, CartID });
    if (!Item) throw new Error("Item not found");
    res.status(200).json({
      message: "Item removed from cart successfully",
      Item: ResJSON(Item.toObject()),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function UpdateCart(req: Request, res: Response): Promise<void> {
  try {
    const { ItemID, Quantity } = req.body;
    const { CartID } = (req as ICartRequest).Cart;
    const Item = await ItemModel.findOne({ ItemID, CartID });
    if (!Item) throw new Error("Item not found");
    Item.Quantity = Quantity;
    await Item.save();
    res.status(200).json({
      message: "Item quantity updated successfully",
      Item: ResJSON(Item.toObject()),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
CartRouter.put("/", [CartMiddleWare], UpdateCart);
CartRouter.post("/", [CartMiddleWare], AddToCart);
CartRouter.delete("/", [CartMiddleWare], RemoveFromCart);
CartRouter.get("/", [CartMiddleWare], GetCart);

export default CartRouter;
