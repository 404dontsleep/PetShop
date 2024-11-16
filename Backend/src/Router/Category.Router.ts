import { Request, Response, Router } from "express";
import { CategoryModel } from "../Model/Category.Model";
import { PermissionMiddleWare } from "../MiddleWare/Permission.MiddleWare";
import { ResJSON } from "../Helper/Helper";

const CategoryRouter = Router();

async function GetCategory(req: Request, res: Response): Promise<void> {
  try {
    const Categorys = await CategoryModel.find({}).select("-__v -_id");
    res.status(200).json({ Categorys });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function CreateCategory(req: Request, res: Response): Promise<void> {
  try {
    const { CategoryName } = req.body;
    if (!CategoryName) throw new Error("CategoryName is required");
    const LastCategory = await CategoryModel.findOne({}).sort({
      CategoryID: -1,
    });
    const CategoryID = LastCategory ? LastCategory.CategoryID + 1 : 1;
    const Category = new CategoryModel({ CategoryID, CategoryName });
    await Category.save();
    res.status(201).json({
      message: "Category created successfully",
      Category: ResJSON(Category.toObject()),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function UpdateCategory(req: Request, res: Response): Promise<void> {
  try {
    const { CategoryID } = req.params;
    const { CategoryName } = req.body;
    if (!CategoryName) {
      res.status(400).json({ message: "CategoryName is required" });
      return;
    }
    const Category = await CategoryModel.findOne({ CategoryID });
    if (Category) {
      Category.CategoryName = CategoryName;
      await Category.save();
      res.status(200).json({
        message: "Category updated successfully",
        Category: ResJSON(Category.toObject()),
      });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function DeleteCategory(req: Request, res: Response): Promise<void> {
  try {
    const { CategoryID } = req.params;
    const Category = await CategoryModel.findOneAndDelete({ CategoryID });
    if (Category) {
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

CategoryRouter.get("/", GetCategory);
CategoryRouter.post("/", PermissionMiddleWare(["Admin"]), CreateCategory);
CategoryRouter.put(
  "/:CategoryID",
  PermissionMiddleWare(["Admin"]),
  UpdateCategory
);
CategoryRouter.delete(
  "/:CategoryID",
  PermissionMiddleWare(["Admin"]),
  DeleteCategory
);

export default CategoryRouter;
