import { NextFunction, Request, Response } from "express";
import { IAuthRequest } from "./Auth.MiddleWare";
import { CartModel } from "../Model/Cart.Model";
import { ICartModel } from "@MyTypes/Cart.Type";
export interface ICartRequest extends Request {
  Cart: ICartModel;
}
export const CartMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { UserID } = (req as IAuthRequest).User;
    const Cart = await CartModel.findOne({ UserID });
    if (Cart) {
      (req as ICartRequest).Cart = Cart;
      next();
    } else {
      const LastID = await CartModel.findOne({}).sort({ CartID: -1 }).exec();
      const CartID = LastID ? LastID.CartID + 1 : 1;
      const NewCart = new CartModel({ UserID, CartID });
      await NewCart.save();
      (req as ICartRequest).Cart = NewCart;
      next();
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
