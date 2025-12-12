const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const router = require("./router/route");

const app = express();

app.use(cors());
app.use(express.json());



app.use("/api", router);
app.use("/uploads", express.static("uploads"));



const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
