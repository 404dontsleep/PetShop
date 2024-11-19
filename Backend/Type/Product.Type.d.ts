interface ICategoryModel {
  CategoryID: number;
  CategoryName: string;
}

interface IProductModel {
  ProductID: number;
  Path: string;
  Name: string;
  Description: string;
  Price: number;
  CategoryID: number;
  Stock: number;
}

interface IImageModel {
  ImageID: string;
  Uri: string;
  ProductID: number;
}
export { ICategoryModel, IProductModel, IImageModel };
