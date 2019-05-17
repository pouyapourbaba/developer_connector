const mongoose = require("mongoose");
const { check } = require("express-validator/check");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  text: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  likes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "user" } }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      text: { type: String, required: true },
      name: { type: String },
      avatar: { type: String },
      date: { type: Date, default: Date.now }
    }
  ],
  date: { type: Date, default: Date.now }
});

const validatePost = [check("text", "Text is required").not().isEmpty()];
const validateComment = [check("text", "Text is required").not().isEmpty()];

module.exports.Post = mongoose.model("post", PostSchema);
module.exports.validatePost = validatePost;
module.exports.validateComment = validateComment;
