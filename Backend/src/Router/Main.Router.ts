import { Router } from "express";

import CategoryRouter from "./Category.Router";
import AddressRouter from "./Address.Router";
import ProductRouter from "./Product.Router";
import ImageRouter from "./Image.Router";
import OrderRouter from "./Order.Router";
import AuthRouter from "./Auth.Router";
import UserRouter from "./User.Router";
import CartRouter from "./Cart.Router";

import { AuthMiddleWare, TokenMiddleWare } from "../MiddleWare/Auth.MiddleWare";
import { PermissionMiddleWare } from "../MiddleWare/Permission.MiddleWare";

const MainRouter = Router();

MainRouter.use("/category", [TokenMiddleWare, AuthMiddleWare], CategoryRouter);
MainRouter.use("/address", [TokenMiddleWare, AuthMiddleWare], AddressRouter);
MainRouter.use("/product", [TokenMiddleWare, AuthMiddleWare], ProductRouter);
MainRouter.use("/order", [TokenMiddleWare, AuthMiddleWare], OrderRouter);
MainRouter.use("/cart", [TokenMiddleWare, AuthMiddleWare], CartRouter);
MainRouter.use("/image", ImageRouter);
MainRouter.use("/auth", AuthRouter);
MainRouter.use(
  "/user",
  [TokenMiddleWare, AuthMiddleWare, PermissionMiddleWare(["Admin"])],
  UserRouter
);
export default MainRouter;
