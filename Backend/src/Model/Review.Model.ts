import { IReviewModel } from "@MyTypes/Review.Type";
import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema<IReviewModel>({
  ReviewID: { type: Number, required: true, unique: true },
  ProductID: { type: Number, required: true },
  UserID: { type: Number, required: true },
  Rating: { type: Number, required: true, min: 0, max: 5 },
  Comment: { type: String, required: false },
});

export const ReviewModel = mongoose.model("Review", ReviewSchema);
