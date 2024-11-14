import { TRole } from "@MyTypes/User.Type";
import { UserModel } from "../Model/User.Model";

export const CheckUser = async (Email: string, Password: string) => {
  return UserModel.findOne({ Email, Password });
};
export const NewUser = async (
  Email: string,
  Password: string,
  Role: TRole = "User"
) => {
  const lastUser = await UserModel.findOne({}).sort({ UserID: -1 });
  const UserID = lastUser ? lastUser.UserID + 1 : 1;
  return UserModel.create({ UserID, Email, Password, Role });
};
export const FindUser = async (Email: string) => {
  return UserModel.findOne({ Email });
};
