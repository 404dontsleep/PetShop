import { IAddressModel } from "@MyTypes/User.Type";
import { create } from "zustand";
import axiosInstance from "../AxiosInstance";

interface IAddressStore {
  Address: IAddressModel[];
  GetAddress: () => Promise<void>;
  AddAddress: (Address: IAddressModel) => Promise<void>;
  UpdateAddress: (Address: IAddressModel) => Promise<void>;
  DeleteAddress: (AddressID: number) => Promise<void>;
}
const useAddressStore = create<IAddressStore>((set, get) => ({
  Address: [],
  GetAddress: async () => {
    const { data } = await axiosInstance.get<{
      Address: IAddressModel[];
    }>("/address");
    const { Address } = data;
    set((state) => ({ Address }));
  },
  AddAddress: async (Address: IAddressModel) => {
    const { data } = await axiosInstance.post<{
      Address: IAddressModel;
    }>("/address", Address);
    const { Address: _Address } = data;
    set((state) => ({ Address: [...state.Address, _Address] }));
  },
  UpdateAddress: async (Address: IAddressModel) => {
    const { data } = await axiosInstance.put<{
      Address: IAddressModel;
    }>(`/address/${Address.AddressID}`, Address);
    const { Address: _Address } = data;
    set((state) => ({
      Address: state.Address.map((i) =>
        i.AddressID === _Address.AddressID ? _Address : i
      ),
    }));
  },
  DeleteAddress: async (AddressID: number) => {
    const { data } = await axiosInstance.delete<{
      Address: IAddressModel;
    }>(`/address/${AddressID}`);
    set((state) => ({
      Address: state.Address.filter((i) => i.AddressID !== AddressID),
    }));
  },
}));

export default useAddressStore;
