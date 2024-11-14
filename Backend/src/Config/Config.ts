import "dotenv/config";

type ENV = {
  MONGODB_URI: string;
  JWT_SECRET: string;
  PORT: number;
  SALT: string;
};

function getEnv(): ENV {
  try {
    return {
      MONGODB_URI: process.env.MONGODB_URI as string,
      JWT_SECRET: process.env.JWT_SECRET as string,
      PORT: parseInt(process.env.PORT as string),
      SALT: process.env.SALT as string,
    };
  } catch (error) {
    console.error("Error loading environment variables:", error);
    process.exit(1);
  }
}

export const CONFIG = getEnv();
