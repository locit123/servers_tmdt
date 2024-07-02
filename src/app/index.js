const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const AppRouters = require("../routers/index");
const connectDB = require("../config/connectDB");
const cors = require("cors");

app.use(cors());

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDB();

AppRouters(app);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
