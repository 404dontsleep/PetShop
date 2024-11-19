import { IItemModel } from "@MyTypes/Cart.Type";
import { create } from "zustand";
import axiosInstance from "../AxiosInstance";

interface ICartStore {
  Cart: IItemModel[];
  GetCart: () => Promise<void>;
  AddToCart: (
    item: Pick<IItemModel, "ProductID" | "Quantity">
  ) => Promise<IItemModel>;
  RemoveFromCart: (item: Pick<IItemModel, "ItemID">) => Promise<IItemModel>;
  UpdateCart: (item: Pick<IItemModel, "ItemID" | "Quantity">) => Promise<void>;
}

const useCartStore = create<ICartStore>((set) => ({
  Cart: [],
  GetCart: async () => {
    const { data } = await axiosInstance.get<{
      Cart: IItemModel[];
    }>("/cart");
    const { Cart } = data;
    set((state) => ({ Cart }));
  },
  AddToCart: async (item) => {
    const { data } = await axiosInstance.post<{
      Item: IItemModel;
    }>("/cart", item);
    const { Item } = data;
    set((state) => ({ Cart: [...state.Cart, Item] }));
    return Item;
  },
  RemoveFromCart: async (item) => {
    const { data } = await axiosInstance.delete<{
      Item: IItemModel;
    }>("/cart", { data: item });
    const { Item } = data;
    set((state) => ({
      Cart: state.Cart.filter((i) => i.ItemID !== Item.ItemID),
    }));
    return Item;
  },
  UpdateCart: async (item) => {
    const { data } = await axiosInstance.put<{
      Item: IItemModel;
    }>("/cart", item);
    const { Item } = data;
    set((state) => ({
      Cart: state.Cart.map((i) => (i.ItemID === Item.ItemID ? Item : i)),
    }));
  },
}));

export default useCartStore;
