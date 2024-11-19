import { IProductModel } from "@MyTypes/Product.Type";
import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema<IProductModel>({
  ProductID: { type: Number, required: true, unique: true },
  Path: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  Description: { type: String, required: true },
  Price: { type: Number, required: true, min: 0 },
  CategoryID: { type: Number, required: true },
  Stock: { type: Number, required: true, min: 0 },
});

export const ProductModel = mongoose.model("Product", ProductSchema);
