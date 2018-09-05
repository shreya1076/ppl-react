var userdb1 = require("../Schema/postschema");

module.exports = {
  createnewuser: function(data) {
    return new Promise((resolve, reject) => {
      console.log("api", data);
      userdb1.create(data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  findAllData: function(data) {
    console.log("data", data);
    return new Promise((resolve, reject) => {
      userdb1.find(data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  updateData: function(data) {
    console.log("<<<<data updateDsta", data);
    return new Promise((resolve, reject) => {
      userdb1.findOneAndUpdate(
        { _id: data._id },
        { $push: { likes: data.userDetails._id } },
        { upsert: true, new: true },
        (err, result) => {
          if (err) {
            reject(err);
            console.log("<<<<error for updateData", err);
          } else {
            resolve(result);
            console.log("<<<<<<<<result", result);
          }
        }
      );
    });
  },
  findLikes: function(data) {
    console.log("<<<<like data", data);
    return new Promise((resolve, reject) => {
      userdb1.find(
        { _id: data._id, likes: { $in: [data.userDetails._id] } },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
            console.log("<<<<<<<result findLikes", result);
          }
        }
      );
    });
  },
  pullData: function(data) {
    console.log("<<<pull data", data);
    return new Promise((resolve, reject) => {
      userdb1.findOneAndUpdate(
        { _id: data._id },
        { $pull: { likes: data.userDetails._id } },
        { new: true },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
            console.log("<<<<<<<<likes pull data", result);
          }
        }
      );
    });
  },

  updateComment: function(data) {
    console.log("<<<<<update comment", data);
    return new Promise((resolve, reject) => {
      userdb1.findOneAndUpdate(
        { _id: data._id },
        {
          $push: {
            comment: { comment: data.comment, userDetails: data.userDetails }
          }
        },
        {
          new: true
        },
        (err, result) => {
          if (err) {
            console.log("<<<<error for comment", err);
          } else {
            resolve(result);
            console.log("<<<<<<result for comment", result);
          }
        }
      );
    });
  }
};
