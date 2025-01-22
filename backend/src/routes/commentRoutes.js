const express = require("express");
const router = express.Router();

// Import the controller functions
const {
  addComment,
  addReply,
  getCommentsBySong,
  deleteComment,
} = require("../controllers/commentController");

// Add a new comment to a song
router.post("", addComment);

// Add a reply to a specific comment
router.post("/reply", addReply);

// Get all comments associated with a specific song by songId
router.get("/:songId", getCommentsBySong);

// Route to delete a comment or reply
router.delete("/delete", deleteComment);

module.exports = router;
