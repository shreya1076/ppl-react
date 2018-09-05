var express = require("express");
var postrouter = express.Router();
var userapi = require("../Api/postapi1");
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
postrouter.post("/", upload.single("files"), async (req, res) => {
  try {
    console.log("dertyui", req.body);
    let data = {};
    data.description = req.body.description;
    data.category = req.body.category;
    data.image = req.file.originalname;
    data.userId = req.body.userId;
    data.userName = req.body.userName;
    let findFile = await userapi.createnewuser(data);
    let allPostdata = await userapi.findAllData({});
    res.send({ allPostdata });
  } catch (error) {
    res.send("error");
  }
});

postrouter.post("/getData", async (req, res) => {
  try {
    let allPost = await userapi.findAllData({});
    res.send(allPost);
  } catch (error) {
    res.send("error");
  }
});
postrouter.put("/updateData", async (req, res) => {
  try {
    console.log("<<<<<<<data from client", req.body);
    let likesData = await userapi.findLikes(req.body);
    console.log("<<<<<<<likesData", likesData);
    if (likesData.length === 0) {
      let updatePost = await userapi.updateData(req.body);
      console.log("<<<<<<<<<<updatePost", updatePost);
      res.send(updatePost);
    } else {
      let pullLikes = await userapi.pullData(req.body);
      console.log("<<<<<pullLikes", pullLikes);
      res.send(pullLikes);
    }
  } catch (error) {
    console.log("<<<<<error");
    res.send(error);
  }
});

postrouter.put("/showComment", async (req, res) => {
  try {
    let data = {};
    data._id = req.body._id;
    data.comment = req.body.comment;
    data.userDetails = req.body.userDetails;
    let updateSinglePost = await userapi.updateComment(data);
    res.send(updateSinglePost);
  } catch (error) {
    res.send(error);
  }
});
postrouter.post("/getIndividualPost", async (req, res) => {
  try {
    console.log("<<<<<data from client", req.body);
    let findId = await userapi.findAllData({ _id: req.body._id });
    console.log("<<<<<<<<<<<<<findId", findId);
    res.send(findId);
  } catch (error) {
    console.log("<<<error", error);
    res.send(error);
  }
});
postrouter.post("/getPostByCategory", async (req, res) => {
  try {
    console.log("<<<<<<<data from the client we getting category", req.body);
    let data = {};
    data.category = req.body.category;
    let findPostbasedOnCategory = await userapi.findAllData(data);
    console.log(">>>>>>>>>findPostbasedOnCategory", findPostbasedOnCategory);
    res.send(findPostbasedOnCategory);
  } catch (error) {
    console.log(">>>>>error", error);
  }
});
postrouter.post("/getMyUploads", async (req, res) => {
  try {
    console.log("<<<data from client we getting for myUploads", req.body);
    let data = {};
    data.userId = req.body.getUserId;
    let myUploads = await userapi.findAllData(data);
    console.log("<<<<<<<<<myUploads", myUploads);
    res.send(myUploads);
  } catch (error) {
    console.log("<<<errir is", error);
    res.send(error);
  }
});

module.exports = postrouter;
