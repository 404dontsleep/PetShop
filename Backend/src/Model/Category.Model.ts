import { ICategoryModel } from "@MyTypes/Product.Type";
import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema<ICategoryModel>({
  CategoryID: { type: Number, required: true, unique: true },
  CategoryName: { type: String, required: true, unique: true },
});

export const CategoryModel = mongoose.model("Category", CategorySchema);
