import mongoose, { Schema } from "mongoose";
import { ICartModel } from "@MyTypes/Cart.Type";

const CartSchema = new Schema<ICartModel>({
  CartID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
});

export const CartModel = mongoose.model<ICartModel>("Cart", CartSchema);
