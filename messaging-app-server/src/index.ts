import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());

app.get("/", (req, res, next) => {
  res.send("Hello Word!");
});

app.listen(port, () => {
  console.log("server running on port " + port);
});
