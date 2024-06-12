import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

const mongoDb = process.env.MONGO_CONNECTION;
mongoose.connect(process.env.MONGO_CONNECTION!);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.get("/", (req, res, next) => {
  res.send("Hello Word!");
});

app.listen(port, () => {
  console.log("server running on port " + port);
});
