const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

connectDb();
const app = express();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
