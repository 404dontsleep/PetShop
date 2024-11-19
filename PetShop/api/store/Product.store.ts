import {
  ICategoryModel,
  IImageModel,
  IProductModel,
} from "@MyTypes/Product.Type";
import { create } from "zustand";
import axiosInstance from "../AxiosInstance";
// CATEGORY
interface ICategoryStore {
  Categorys: ICategoryModel[];
  GetCategorys: () => Promise<void>;
  CreateCategory: (CategoryName: string) => Promise<void>;
  UpdateCategory: (Category: ICategoryModel) => Promise<void>;
  DeleteCategory: (CategoryID: number) => Promise<void>;
}

const useCategoryStore = create<ICategoryStore>((set, setGet) => ({
  Categorys: [],
  GetCategorys: async () => {
    const { data } = await axiosInstance.get("/category");
    set((state) => ({ ...state, Categorys: data.Categorys }));
  },
  CreateCategory: async (CategoryName) => {
    const { data } = await axiosInstance.post("/category", { CategoryName });
    if (data.Category) {
      set((state) => ({
        ...state,
        Categorys: [...state.Categorys, data.Category],
      }));
    }
  },
  UpdateCategory: async (Category) => {
    const { data } = await axiosInstance.put(
      `/category/${Category.CategoryID}`,
      Category
    );
    if (data.Category) {
      set((state) => ({
        ...state,
        Categorys: [
          ...state.Categorys.filter(
            (c) => c.CategoryID !== Category.CategoryID
          ),
          data.Category,
        ],
      }));
    }
  },
  DeleteCategory: async (CategoryID) => {
    const { data } = await axiosInstance.delete(`/category/${CategoryID}`);
    set((state) => ({
      ...state,
      Categorys: state.Categorys.filter((c) => c.CategoryID !== CategoryID),
    }));
  },
}));
// CATEGORY
// PRODUCT
export type IProductFEModel = IProductModel & { Rating?: number } & {
  Images?: IImageModel[];
};
interface IProductStore {
  Products: IProductFEModel[];
  GetProducts: () => Promise<void>;
  GetProduct: (ProductID: number) => Promise<IProductFEModel>;
  CreateProduct: (Product: IProductModel) => Promise<void>;
  UpdateProduct: (Product: IProductModel) => Promise<void>;
  DeleteProduct: (ProductID: number) => Promise<void>;
}
const useProductStore = create<IProductStore>((set, setGet) => ({
  Products: [],
  GetProducts: async () => {
    const { data } = await axiosInstance.get("/product");
    set((state) => ({ ...state, Products: data.Products }));
  },
  GetProduct: async (ProductID) => {
    const { data } = await axiosInstance.get(`/product/${ProductID}`);
    return data.Product;
  },
  CreateProduct: async (Product) => {
    const { data } = await axiosInstance.post("/product", Product);
    if (data.Product) {
      set((state) => ({
        ...state,
        Products: [...state.Products, data.Product],
      }));
    }
  },
  UpdateProduct: async (Product) => {
    const { data } = await axiosInstance.put(
      `/product/${Product.ProductID}`,
      Product
    );
    if (data.Product) {
      set((state) => ({
        ...state,
        Products: [
          ...state.Products.filter((p) => p.ProductID !== Product.ProductID),
          data.Product,
        ],
      }));
    }
  },
  DeleteProduct: async (ProductID) => {
    const { data } = await axiosInstance.delete(`/product/${ProductID}`);
    set((state) => ({
      ...state,
      Products: state.Products.filter((p) => p.ProductID !== ProductID),
    }));
  },
}));
// PRODUCT

// IMAGE
interface IImageStore {
  DeleteImage: (ImageID: string) => Promise<void>;
  UploadImage: (Image: IImageModel) => Promise<IImageModel>;
}
const useImageStore = create<IImageStore>((set, setGet) => ({
  DeleteImage: async (ImageID) => {
    await axiosInstance.delete(`/image/${ImageID}`);
  },
  UploadImage: async (Image) => {
    const { data } = await axiosInstance.post("/image/upload", Image);
    return data.Image;
  },
}));
// IMAGE
export { useCategoryStore, useProductStore, useImageStore };
