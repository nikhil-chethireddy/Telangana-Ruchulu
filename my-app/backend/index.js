const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDatabase = require("./db");
const cors = require("cors");

const port = process.env.PORT || 5000;
connectDatabase();
app.get("/", (req, res) => {
  res.send("Server is Runnung!");
});

app.use(cors());

app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
