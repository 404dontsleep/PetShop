import { IOrderModel } from "@MyTypes/Cart.Type";
import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema<IOrderModel>({
  OrderID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
  Address: { type: Object, required: true },
  Total: { type: Number, required: true, min: 0 },
  OrderDate: { type: Date, required: true },
  Items: [{ type: Object, required: true }],
  Status: {
    type: String,
    required: true,
    default: "Pending",
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
  },
});

export const OrderModel = mongoose.model("Order", OrderSchema);
