type TRole = "Admin" | "User";
interface IUserModel {
  UserID: number;
  Email: string;
  Password: string;
  Role: TRole;
}
interface IAddressModel {
  AddressID: number;
  UserID: number;
  ContactNumber: string;
  Street: string;
  City: string;
  State: string;
}

export { IUserModel, TRole, IAddressModel };
