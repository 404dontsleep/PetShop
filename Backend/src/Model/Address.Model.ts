import { IAddressModel } from "@MyTypes/User.Type";
import mongoose, { Schema } from "mongoose";

const AddressSchema = new Schema<IAddressModel>({
  AddressID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
  ContactNumber: { type: String, required: true, validate: /^0\d{9,10}$/ },
  Street: { type: String, required: true },
  City: { type: String, required: true },
  State: { type: String, required: true },
});

export const AddressModel = mongoose.model("Address", AddressSchema);
