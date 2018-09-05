var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const postschema = new Schema({
  description: String,
  category: String,
  image: String,
  likes: Array,
  comment: Array,
  date: {
    type: Date,
    default: Date.now
  },
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  userName: String
});

module.exports = mongoose.model("post", postschema, "post");
