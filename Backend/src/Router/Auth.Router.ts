import { Request, Response, Router } from "express";
import { CheckUser, FindUser, NewUser } from "../Function/User.Function";
import { sign, verify } from "jsonwebtoken";
import { CONFIG } from "../Config/Config";
import {
  CheckOTP,
  md5WithSalt,
  RandomOTP,
  RandomPassword,
  sha256,
} from "../Helper/Helper";
import {
  AuthMiddleWare,
  IAuthRequest,
  IToken,
  ITokenRequest,
  TokenMiddleWare,
} from "../MiddleWare/Auth.MiddleWare";

const AuthRouter = Router();

AuthRouter.post("/login", async (req: Request, res: Response) => {
  const { Email, Password } = req.body;
  try {
    const hashedPassword = sha256(Password);
    const user = await CheckUser(Email, hashedPassword);
    if (user) {
      const token = sign(
        { Email, OTPSave: "123456" } as IToken,
        CONFIG.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

AuthRouter.post("/register", async (req: Request, res: Response) => {
  const { Email, Password } = req.body;
  try {
    const HashedPassword = sha256(Password);
    const User = await CheckUser(Email, HashedPassword);
    if (User) {
      res.status(409).json({ message: "User already exists" });
    } else {
      await NewUser(Email, HashedPassword);
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
AuthRouter.post("/reset-password", async (req: Request, res: Response) => {
  const { Email } = req.body;
  try {
    const user = await FindUser(Email);
    if (user) {
      const OTP = RandomOTP();
      // TODO : Send OTP to email
      const token = sign(
        {
          Email,
          OTPSave: md5WithSalt(OTP, CONFIG.SALT),
        } as IToken,
        CONFIG.JWT_SECRET,
        {
          expiresIn: "10m",
        }
      );
      res.status(200).json({ token, OTP });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
AuthRouter.post(
  "/reset-password-otp",
  [TokenMiddleWare],
  async (req: Request, res: Response) => {
    const { Token } = req as ITokenRequest;
    const { OTP } = req.body;
    if (CheckOTP(Token.OTPSave, CONFIG.SALT, OTP)) {
      const { Email } = Token;
      const user = await FindUser(Email);
      if (user) {
        const NewPassword = RandomPassword(10);
        user.Password = sha256(sha256(NewPassword));
        // TODO : Send new password to email
        await user.save();
        res.status(200).json({
          message: "Password reset successfully",
          NewPassword: NewPassword,
        });
      }
    } else {
      res.status(401).json({ message: "OTP not verified" });
    }
  }
);
AuthRouter.get(
  "/",
  [TokenMiddleWare, AuthMiddleWare],
  async (req: Request, res: Response) => {
    const { User } = req as IAuthRequest;
    res.status(200).json({ User });
  }
);
export default AuthRouter;
