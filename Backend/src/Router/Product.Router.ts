import { Request, Response, Router } from "express";
import { ProductModel } from "../Model/Product.Model";
import { ImageModel } from "../Model/Image.Model";
import { CategoryModel } from "../Model/Category.Model";
import { PermissionMiddleWare } from "../MiddleWare/Permission.MiddleWare";
import { ResJSON } from "../Helper/Helper";

const ProductRouter = Router();

async function GetAllProduct(req: Request, res: Response): Promise<void> {
  try {
    const Products = await ProductModel.find({}).select("-__v -_id");
    const ResponseProducts = Products.map((Product) => Product.toObject());
    for (const Product of ResponseProducts) {
      const Image = await ImageModel.findOne({
        ProductID: Product.ProductID,
      }).select("-__v -_id -Uri");
      if (Image) (Product as any).Images = [Image];
    }
    res.status(200).json({ Products: ResponseProducts });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function GetProduct(req: Request, res: Response): Promise<void> {
  try {
    const { ProductID } = req.params;
    const Product = await ProductModel.findOne({ ProductID }).select(
      "-__v -_id"
    );
    if (Product) {
      const Images = await ImageModel.find({ ProductID }).select(
        "-__v -_id -Uri"
      );
      // TODO : Get Reviews
      (Product as any).Images = Images;
      res
        .status(200)
        .json({ Product: ResJSON({ ...Product.toJSON(), Images }) });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function CreateProduct(req: Request, res: Response): Promise<void> {
  try {
    const { Name, CategoryID, Price, Description, Stock, Path } = req.body;
    if (!(await CategoryModel.findOne({ CategoryID }))) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    const LastProduct = await ProductModel.findOne({}).sort({
      ProductID: -1,
    });
    const ProductID = LastProduct ? LastProduct.ProductID + 1 : 1;
    const Product = new ProductModel({
      ProductID,
      Name,
      CategoryID,
      Price,
      Description,
      Stock,
      Path,
    });
    await Product.save();
    res.status(201).json({
      message: "Product created successfully",
      Product: ResJSON(Product.toJSON()),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function UpdateProduct(req: Request, res: Response): Promise<void> {
  try {
    const { ProductID } = req.params;
    const { Name, CategoryID, Price, Description, Stock, Path } = req.body;
    if (!(await CategoryModel.findOne({ CategoryID }))) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    const Product = await ProductModel.findOne({ ProductID });
    if (Product) {
      const Images = await ImageModel.find({ ProductID }).select(
        "-__v -_id -Uri"
      );
      Product.Name = Name;
      Product.CategoryID = CategoryID;
      Product.Price = Price;
      Product.Description = Description;
      Product.Stock = Stock;
      Product.Path = Path;
      await Product.save();
      res.status(200).json({
        message: "Product updated successfully",
        Product: ResJSON({ ...Product.toJSON(), Images }),
      });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function DeleteProduct(req: Request, res: Response): Promise<void> {
  try {
    const { ProductID } = req.params;
    const Product = await ProductModel.findOneAndDelete({ ProductID });
    if (Product) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
ProductRouter.post("/", PermissionMiddleWare(["Admin"]), CreateProduct);
ProductRouter.get("/:ProductID", GetProduct);
ProductRouter.get("/", GetAllProduct);
ProductRouter.put(
  "/:ProductID",
  PermissionMiddleWare(["Admin"]),
  UpdateProduct
);
ProductRouter.delete(
  "/:ProductID",
  PermissionMiddleWare(["Admin"]),
  DeleteProduct
);
export default ProductRouter;
