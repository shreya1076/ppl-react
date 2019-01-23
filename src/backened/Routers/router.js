var express = require("express");
var router = express.Router();
var userapi = require("../Api/api");
var nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "shreya.sehgal@daffodilsw.com",
    pass: "shreya35"
  }
});

router.post("/register", async (req, res) => {
  console.log("router on backend", req.body);
  // res.send({ result: "dfdfdfdf" });
  try {
    var data = {};
    data.username = req.body.Username;
    data.password = req.body.Password;
    data.email = req.body.Email;
    data.firstName = req.body.FirstName;
    data.lastName = req.body.LastName;
    let whetherEmailExist = await userapi.finduser({ email: data.email });
    console.log("<<<<<<<<whetherEmailExist", whetherEmailExist);
    if (whetherEmailExist.length === 0) {
      let resultfromapi = await userapi.createnewuser(data);
      console.log("resultfromapi", resultfromapi);
      nodemailer.createTestAccount((err, accont) => {
        let link = "localhost:3000/verify/" + resultfromapi._id;

        let mailOptions = {
          from: "shreya.sehgal@daffodilsw.com",
          to: data.email,
          subject: "Verification email from ppl",
          text: "Hello world",
          html:
            "Hello,<br> Please Click on the link to verify your email.<br><a href=http://" +
            link +
            ">Click here to verify</a>"
        };

        transporter.sendMail(mailOptions, (error, info) => {
          //sendMail(data,callback)
          if (error) {
            return console.log(error);
          } else {
            return console.log("<<<<<<<info", info);
          }
        });
      });

      res.send({ result1: resultfromapi });
    } else {
      res.send({ result: "This email id already exists" });
    }
  } catch (err) {
    console.log(" the error is err", err);
    res.send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("<<<<login data from client", req.body);
    let data = {};
    data.email = req.body.emailId;
    data.password = req.body.password;
    console.log("<<<<<<<data", data);
    let checkEmailExist = await userapi.finduser({ email: data.email });
    console.log("<<<<<<<checkEmailexist", checkEmailExist);
    if (checkEmailExist.length > 0) {
      let checkPasswordExist = await userapi.finduser({
        email: req.body.emailId,
        password: req.body.password
      });
      console.log("<<<<<<checkPasswordExist", checkPasswordExist);
      if (checkPasswordExist.length > 0) {
        res.send({ status: 1, userdata: checkPasswordExist });
      } else {
        res.send({ status: 2 });
      }
    } else {
      res.send({ status: 3 });
    }
  } catch (error) {
    console.log("<<<<<<<<error", error);
  }
});

router.put("/verifyEmail", async (req, res) => {
  try {
    console.log("<<<<<<verify by mail data from client", req.body);
    let updateVerified = await userapi.update(req.body);
    console.log("<<<<<<<updateVerified", updateVerified);
    res.send(updateVerified);
  } catch (error) {
    console.log("<<<<<<<<error");
    res.send(error);
  }
});
router.post("/checkEmail", async (req, res) => {
  try {
    let data = {};
    data.email = req.body.email;
    console.log("<<<<<<<forgot password", req.body);
    let findEmail = await userapi.finduser(data);
    console.log("<<<<<findEmail", findEmail);
    if (findEmail.length > 0) {
      nodemailer.createTestAccount((err, accont) => {
        let link = "localhost:3000/resetpassword/" + findEmail[0]._id;

        let mailOptions = {
          from: "shreya.sehgal@daffodilsw.com",
          to: data.email,
          subject: "Reset Password",
          text: "Hello world",
          html:
            "Hello,<br> Please Click on the link to reset your password.<br><a href=http://" +
            link +
            ">Click here to verify</a>"
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          } else {
            return console.log("<<<<<<<info", info);
          }
        });
      });
    }

    res.send(findEmail);
  } catch (error) {
    console.log("<<<<error");
    res.send(error);
  }
});
router.post("/passwordChange", async (req, res) => {
  try {
    console.log("<<<<<reset password data from the client", req.body);
    var data = {};
    data._id = req.body._id;
    data.password = req.body.password;
    var updatePassword = await userapi.updatePassword(data);
    console.log("<<<<<<updatePassword", updatePassword);
    res.send(updatePassword);
  } catch (error) {
    console.log("<<<<<<<<<<<error", error);
    res.send(error);
  }
});

module.exports = router;
