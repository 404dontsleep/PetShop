import mongoose from "mongoose";
import { CONFIG } from "./Config";

export const connectDB = async () => {
  try {
    await mongoose.connect(CONFIG.MONGODB_URI);
  } catch (error) {
    throw new Error("Error connecting to MongoDB");
  }
};
