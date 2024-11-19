import { IUserModel } from "@MyTypes/User.Type";
import { create } from "zustand";
import axiosInstance from "../AxiosInstance";

interface IUserStore {
  Users: IUserModel[];
  SetUsers: (users: IUserModel[]) => void;
  GetUsers: () => Promise<IUserModel[]>;
  GetUser: (UserID: number) => Promise<IUserModel>;
  UpdateUser: ({
    UserID,
    Role,
  }: {
    UserID: IUserModel["UserID"];
    Role: IUserModel["Role"];
  }) => Promise<IUserModel>;
}

const useUserStore = create<IUserStore>((set) => ({
  Users: [],
  SetUsers: (users) => set({ Users: users }),
  GetUsers: async () => {
    const { data } = await axiosInstance.get<{ Users: IUserModel[] }>("/user");
    set({ Users: data.Users });
    return data.Users;
  },
  GetUser: async (UserID) => {
    const { data } = await axiosInstance.get<{ User: IUserModel }>(
      "/user/" + UserID
    );
    return data.User;
  },
  UpdateUser: async ({ UserID, Role }) => {
    const { data } = await axiosInstance.put<{ User: IUserModel }>(
      "/user/" + UserID,
      {
        Role,
      }
    );
    set((state) => ({
      Users: [...state.Users.filter((u) => u.UserID !== UserID), data.User],
    }));
    return data.User;
  },
}));

export default useUserStore;
