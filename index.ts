import express from "express";
import mongoose from "mongoose";
import { Request, Response } from "express";
import cors from "cors";

import router from "./src/db/router";
import syncRepos from "./src/syncRepos";

import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
const PORT = 8080;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.static(path.join(__dirname, "frontend", "build")));

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.json("Server done");
});

async function startApp() {
  try {
    if (!DB_URL) {
      throw new Error("No DB_URL");
    }
    await mongoose.connect(DB_URL);
    await syncRepos();

    const intervalMinutes = 1;
    const intervalMillis = intervalMinutes * 60 * 1000;

    setInterval(syncRepos, intervalMillis);

    app.listen(PORT, () => console.log("hello"));
  } catch (error) {
    console.log(error);
  }
}

startApp();
