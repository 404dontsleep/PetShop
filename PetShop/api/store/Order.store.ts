import { IOrderModel } from "@MyTypes/Cart.Type";
import { create } from "zustand";
import axiosInstance from "../AxiosInstance";

interface IOrderStore {
  Orders: IOrderModel[];
  GetOrders: () => Promise<void>;
  GetOrder: (OrderID: number) => Promise<IOrderModel>;
  CreateOrder: (ItemIDs: number[], AddressID: number) => Promise<void>;
  UpdateOrder: (
    Order: Pick<IOrderModel, "OrderID" | "Status">
  ) => Promise<void>;
  DeleteOrder: (Order: Pick<IOrderModel, "OrderID">) => Promise<void>;
}

const useOrderStore = create<IOrderStore>((set, get) => ({
  Orders: [],
  GetOrders: async () => {
    const { data } = await axiosInstance.get<{
      Orders: IOrderModel[];
    }>("/order");
    set({ Orders: data.Orders });
  },
  GetOrder: async (OrderID: number) => {
    const { data } = await axiosInstance.get<{
      Order: IOrderModel;
    }>(`/order/${OrderID}`);
    return data.Order;
  },
  CreateOrder: async (ItemIDs: number[], AddressID: number) => {
    const { data } = await axiosInstance.post<{
      Order: IOrderModel;
    }>("/order/checkout", { ItemIDs, AddressID });
    set({ Orders: [...get().Orders, data.Order] });
  },
  UpdateOrder: async (Order: Pick<IOrderModel, "OrderID" | "Status">) => {
    const { data } = await axiosInstance.put<{
      Order: IOrderModel;
    }>(`/order/${Order.OrderID}`, Order);
    set({
      Orders: get().Orders.map((order) =>
        order.OrderID === data.Order.OrderID ? data.Order : order
      ),
    });
  },
  DeleteOrder: async (Order: Pick<IOrderModel, "OrderID">) => {
    const { data } = await axiosInstance.delete<{
      Order: IOrderModel;
    }>(`/order/${Order.OrderID}`);
    set({
      Orders: get().Orders.map((order) =>
        order.OrderID === data.Order.OrderID ? data.Order : order
      ),
    });
  },
}));

export default useOrderStore;
