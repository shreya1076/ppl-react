var express = require("express");
var app = express();
var cors = require("cors");
var router = require("../backened/Routers/router");
var postrouter = require("../backened/Routers/postrouter");
var categoryrouter = require("../backened/Routers/categoryrouter");
var mongoose = require("mongoose");
app.use(cors()); //To handle request from any origin

const bodyParser = require("body-parser");
app.use(express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://localhost:27017/ppl",
  { useNewUrlParser: true }
);
//Router
app.use("/", router);
app.use("/a", postrouter);
app.use("/b", categoryrouter);

app.listen(5001, () => {
  console.log("Listening on port no 5001");
});
