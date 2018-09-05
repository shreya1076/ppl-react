var userdb = require("../Schema/schema");
module.exports = {
  createnewuser: function(data) {
    return new Promise((resolve, reject) => {
      console.log("api", data);
      userdb.create(data, (err, result) => {
        // it has user collection mongooose model
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  finduser: function(data) {
    console.log("<<<<<<<<data", data);
    return new Promise((resolve, reject) => {
      userdb.find(data, (error, result) => {
        if (error) {
          console.log("<<<<<<error", error);
          reject(error);
        } else {
          console.log("result", result);
          resolve(result);
        }
      });
    });
  },
  update: function(data) {
    console.log("<<<<<data email", data);
    return new Promise((resolve, reject) => {
      userdb.findOneAndUpdate(
        { _id: data._id },
        { $set: { verified: true } },
        { new: true },
        (error, result) => {
          if (error) {
            console.log("<<<<<<<<<error", error);
            reject(error);
          } else {
            console.log("<<<<<<<result verify", result);
            resolve(result);
          }
        }
      );
    });
  },
  updatePassword: function(data) {
    console.log("<<<<reset password data", data);
    return new Promise((resolve, reject) => {
      userdb.findOneAndUpdate(
        { _id: data._id },
        { $set: { password: data.password } },
        { new: true },
        (error, result) => {
          if (error) {
            console.log("<<<<<<<error", error);
            reject(error);
          } else {
            console.log("<<<<<<password result", result);
            resolve(result);
          }
        }
      );
    });
  }
};
