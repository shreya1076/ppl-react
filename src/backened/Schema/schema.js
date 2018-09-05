var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const schema = new Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model("user", schema, "user");
