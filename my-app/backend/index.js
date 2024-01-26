const express = require("express");
const app = express();
const port = 5000;
const connectDatabase = require("./db");

connectDatabase();
app.get("/", (req, res) => {
  res.send("Server is Runnung!");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
