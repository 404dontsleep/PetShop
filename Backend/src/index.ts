import { connectDB } from "./Config/MongoDB";
import { CONFIG } from "./Config/Config";
import * as express from "express";
import bodyParser = require("body-parser");
import * as morgan from "morgan";
import MainRouter from "./Router/Main.Router";
import * as cors from "cors";
StartServer();

async function StartServer() {
  try {
    await connectDB();
    const app = express();
    app.use(cors());
    app.use("/api/image/upload", express.json({ limit: "50mb" }));
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use("/api", MainRouter);
    app.listen(CONFIG.PORT, () => {
      console.log(`Server is running on port ${CONFIG.PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
