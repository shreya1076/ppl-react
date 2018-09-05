var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const categoryschema = new Schema({
  category: String,
  image: String
});
module.exports = mongoose.model("category", categoryschema, "category");
