import { TRole } from "@MyTypes/User.Type";
import { NextFunction, Request, Response } from "express";
import { IAuthRequest } from "./Auth.MiddleWare";

export const PermissionMiddleWare = (permissions: TRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!permissions.includes((req as IAuthRequest).User.Role)) {
      res.status(403).json({ message: "Permission denied" });
    } else next();
  };
};
