import { Alert, Platform } from "react-native";

export async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

export function isValidatedEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export function isValidateOTP(OTP: string): boolean {
  return /^[0-9]{6}$/.test(OTP);
}

export const ALERT = {
  alert: (message: string) =>
    Platform.OS === "web" ? alert(message) : Alert.alert(message),
  prompt: (title: string, message: string) =>
    Platform.OS === "web"
      ? prompt(title, message)
      : Alert.prompt(title, message),
};
