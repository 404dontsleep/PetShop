import { Request, Response, Router } from "express";
import { md5WithSalt, RandomPassword, ResJSON } from "../Helper/Helper";
import { ImageModel } from "../Model/Image.Model";
import { PermissionMiddleWare } from "../MiddleWare/Permission.MiddleWare";
import { AuthMiddleWare, TokenMiddleWare } from "../MiddleWare/Auth.MiddleWare";
import { ProductModel } from "../Model/Product.Model";

const ImageRouter = Router();
async function UploadImage(req: Request, res: Response): Promise<void> {
  try {
    const { ProductID, Uri } = req.body;
    if (!ProductID || !Uri) {
      res.status(400).json({ message: "ProductID and Uri are required" });
    }
    //
    if (!(await ProductModel.findOne({ ProductID }))) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    //
    const ImageID = md5WithSalt(RandomPassword(10), "");
    const Image = new ImageModel({ ImageID, Uri, ProductID });
    await Image.save();
    //
    res.status(200).json({
      message: "Image uploaded successfully",
      Image: ResJSON(Image.toJSON()),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function GetImage(req: Request, res: Response): Promise<void> {
  try {
    const { ImageID } = req.params;
    const Image = await ImageModel.findOne({ ImageID });
    if (Image) {
      const buffer = Buffer.from(Image.Uri, "base64");
      res.setHeader("Content-Type", "image/jpeg");
      res.send(buffer);
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function DeleteImage(req: Request, res: Response): Promise<void> {
  try {
    const { ImageID } = req.params;
    const Image = await ImageModel.findOneAndDelete({ ImageID });
    if (Image) {
      res.status(200).json({ message: "Image deleted successfully" });
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
ImageRouter.post(
  "/upload",
  [TokenMiddleWare, AuthMiddleWare, PermissionMiddleWare(["Admin"])],
  UploadImage
);
ImageRouter.get("/:ImageID", GetImage);
ImageRouter.delete(
  "/:ImageID",
  [TokenMiddleWare, AuthMiddleWare, PermissionMiddleWare(["Admin"])],
  DeleteImage
);

export default ImageRouter;
