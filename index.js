import express from "express";
import mongoose from "mongoose";

const PORT = 8080;
const DB_URL =
  "mongodb+srv://user:user@cluster1.adtbbkr.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("Server done");
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log("hello"));
  } catch (e) {
    console.log(e);
  }
}

startApp();
