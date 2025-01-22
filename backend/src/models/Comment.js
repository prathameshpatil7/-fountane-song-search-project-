const mongoose = require("mongoose");

// Define the Comment Schema
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: { type: String, required: true },
  },
  songId: { type: String, required: true },
  replies: [
    {
      content: { type: String, required: true },
      user: {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        username: { type: String, required: true },
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

// Index for songId for faster retrieval of comments by song
commentSchema.index({ songId: 1 });

// Create the model
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
