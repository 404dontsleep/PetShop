import { IImageModel } from "@MyTypes/Product.Type";
import mongoose, { Schema } from "mongoose";

const ImageSchema = new Schema<IImageModel>({
  ImageID: { type: String, required: true, unique: true },
  Uri: { type: String, required: true },
  ProductID: { type: Number, required: true },
});

export const ImageModel = mongoose.model("Image", ImageSchema);
