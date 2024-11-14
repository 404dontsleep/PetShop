import { createHash } from "crypto";

export const sha256 = (password: string) => {
  return createHash("sha256").update(password).digest("hex");
};

export const RandomOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000) + "";
};

export const RandomPassword = (Length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^";
  let result = "";
  for (let i = 0; i < Length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const md5WithSalt = (password: string, salt: string) => {
  return createHash("md5")
    .update(password + salt)
    .digest("hex");
};

export const CheckOTP = (OTPSave: string, Salt: string, UserOTP: string) => {
  return OTPSave === md5WithSalt(UserOTP, Salt);
};
