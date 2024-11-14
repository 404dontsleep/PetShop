type TRole = "Admin" | "User";
interface IUserModel {
  UserID: number;
  Email: string;
  Password: string;
  Role: TRole;
}

export { IUserModel, TRole };
