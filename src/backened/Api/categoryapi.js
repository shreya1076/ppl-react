var userdb2 = require("../Schema/categoryschema");

module.exports = {
  createnewuser: function(data) {
    return new Promise((resolve, reject) => {
      console.log("api", data);
      userdb2.create(data, (err, result) => {
        // it has user collection mongooose model
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
      console.log("<<api", data);
      userdb2.find(data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};
