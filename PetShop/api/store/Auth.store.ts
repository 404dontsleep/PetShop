import { create } from "zustand";
import { IUserModel } from "@MyTypes/User.Type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "@/api/AxiosInstance";
import { sha256 } from "../Helper";

interface IUserStore {
  Refresh: number;
  RefreshUser: () => void;
  User: IUserModel | null;
  SetUser: (user: IUserModel | null) => void;
  GetAuthUser: () => Promise<void>;
  Logout: () => Promise<void>;
  Login: (
    Email: IUserModel["Email"],
    Password: IUserModel["Password"]
  ) => Promise<void>;
  Register: (
    Email: IUserModel["Email"],
    Password: IUserModel["Password"]
  ) => Promise<void>;
  ResetPassword: (Email: IUserModel["Email"]) => Promise<{
    OTP?: string;
  }>;
  ResetPasswordOTP: (OTP: string) => Promise<{
    NewPassword?: string;
  }>;
}
const useAuthStore = create<IUserStore>((set, get) => ({
  Refresh: 0,
  RefreshUser: () => set((state) => ({ Refresh: state.Refresh + 1 })),
  User: null,
  SetUser: (user: IUserModel | null) =>
    set((state) => ({ ...state, User: user })),
  GetAuthUser: async () => {
    try {
      const { data } = await axiosInstance.get<{
        User?: IUserModel;
      }>("/auth");
      if (data.User) {
        get().SetUser(data.User);
      }
    } catch (error) {
      throw error;
    }
  },
  Logout: async () => {
    await AsyncStorage.removeItem("token");
    get().SetUser(null);
  },
  Login: async (
    Email: IUserModel["Email"],
    Password: IUserModel["Password"]
  ) => {
    try {
      await axiosInstance.post("/auth/login", {
        Email,
        Password: await sha256(Password),
      });
    } catch (error) {
      throw error;
    }
  },
  Register: async (
    Email: IUserModel["Email"],
    Password: IUserModel["Password"]
  ) => {
    try {
      await axiosInstance.post("/auth/register", {
        Email,
        Password: await sha256(Password),
      });
    } catch (error) {
      throw error;
    }
  },
  ResetPassword: async (Email: IUserModel["Email"]) => {
    try {
      const { data } = await axiosInstance.post("/auth/reset-password", {
        Email,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  ResetPasswordOTP: async (OTP: string) => {
    try {
      const { data } = await axiosInstance.post("/auth/reset-password-otp", {
        OTP,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
}));

export default useAuthStore;
