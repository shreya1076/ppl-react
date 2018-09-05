var express = require("express");
var categoryrouter = express.Router();
var userapi = require("../Api/categoryapi");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });
categoryrouter.post("/", upload.single("files"), async (req, res) => {
  try {
    console.log("<<<<<data from timeline client we getting---", req.body);
    let data = {};
    data.category = req.body.category;
    data.image = req.file.originalname;
    console.log("<<<<<<data", data);
    let findFile = await userapi.createnewuser(data);
    let allCategoryData = await userapi.findAllData({});
    console.log("<<<<<<allCategoryData", allCategoryData);
    console.log("<<<<<<<<<findFile", findFile);
    res.send({ allCategoryData });
  } catch (error) {
    console.log("<<<<<<<<<<error", error);
    res.send("error");
  }
});

categoryrouter.post("/getData", async (req, res) => {
  try {
    let allPost = await userapi.findAllData({});
    console.log("<<<<<<<<<allPost", allPost);
    res.send(allPost);
  } catch (error) {
    console.log("<<<<<<<<<error", error);
    res.send("error");
  }
});

module.exports = categoryrouter;
