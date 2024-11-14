import { Request, Response, Router } from "express";
import AuthRouter from "./Auth.Router";

const MainRouter = Router();

MainRouter.use("/auth", AuthRouter);

export default MainRouter;
