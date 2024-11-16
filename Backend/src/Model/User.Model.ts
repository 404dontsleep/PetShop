import mongoose, { Schema } from "mongoose";
import { IUserModel } from "@MyTypes/User.Type";

const UserSchema = new Schema<IUserModel>(
  {
    UserID: { type: Number, required: true, unique: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    Role: {
      type: String,
      required: true,
      enum: ["Admin", "User"],
    },
  },
  {
    validateBeforeSave: true,
  }
);

export const UserModel = mongoose.model<IUserModel>("User", UserSchema);
