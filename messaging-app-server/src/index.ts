import express from "express";

const app = express();
const port = 4000;

app.get("/", (req, res, next) => {
  res.send("Hello Word!");
});

app.listen(port, () => {
  console.log("server running on port " + port);
});
