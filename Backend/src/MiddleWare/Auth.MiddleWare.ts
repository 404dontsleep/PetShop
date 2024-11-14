import { NextFunction, Request, Response } from "express";
import { CONFIG } from "../Config/Config";
import { verify } from "jsonwebtoken";
import { FindUser } from "../Function/User.Function";
import { IUserModel } from "@MyTypes/User.Type";
interface IToken {
  Email: string;
  OTPSave: string;
}
interface IAuthRequest extends Request {
  User: IUserModel;
}
interface ITokenRequest extends Request {
  Token: IToken;
}
export const TokenMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const decodedToken = verify(token, CONFIG.JWT_SECRET) as IToken;
      (req as ITokenRequest).Token = decodedToken;
      next();
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const AuthMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedToken = (req as ITokenRequest).Token;
  if (decodedToken) {
    const user = await FindUser(decodedToken.Email);
    if (user) {
      (req as IAuthRequest).User = {
        Email: user.Email,
        Role: user.Role,
        UserID: user.UserID,
        Password: "",
      };
      next();
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export type { IToken, IAuthRequest, ITokenRequest };
