import { IItemModel } from "@MyTypes/Cart.Type";
import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema<IItemModel>({
  ItemID: { type: Number, required: true, unique: true },
  CartID: { type: Number },
  OrderID: { type: Number },
  ProductID: { type: Number, required: true },
  Quantity: { type: Number, required: true, min: 0 },
});
ItemSchema.path("CartID").validate(function (value) {
  return this.CartID != null || this.OrderID != null;
}, "Either CartID or OrderID must be provided.");

ItemSchema.path("OrderID").validate(function (value) {
  return this.CartID != null || this.OrderID != null;
}, "Either CartID or OrderID must be provided.");

export const ItemModel = mongoose.model("Item", ItemSchema);
