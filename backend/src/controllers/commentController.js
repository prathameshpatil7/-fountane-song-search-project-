const Comment = require("../models/Comment");

// Add a comment
const addComment = async (req, res) => {
  try {
    const { content, songId, userId, username } = req.body;

    // Create new comment
    const newComment = new Comment({
      content,
      songId,
      user: {
        userId,
        username,
      },
    });

    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

// Add a reply to an existing comment
const addReply = async (req, res) => {
  try {
    const { commentId, content, userId, username } = req.body;

    const reply = {
      content,
      user: {
        userId,
        username,
      },
      createdAt: new Date(),
    };

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $push: { replies: reply } },
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error adding reply", error });
  }
};

// const getCommentsBySong = async (req, res) => {
//   try {
//     const songId = req.params.songId;

//     // Fetch comments for the song and populate user details
//     const comments = await Comment.find({ songId })
//       .populate("user.userId", "username") // Populate the username from the User collection
//       .populate("replies.user.userId", "username") // Populate replies' user details
//       .sort({ createdAt: -1 }); // Sort by most recent comments first

//     res.status(200).json(comments);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching comments", error });
//   }
// };

const getCommentsBySong = async (req, res) => {
  try {
    const { songId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Defaults: page 1, 10 comments per page

    // Parse page and limit as integers
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    // Fetch paginated comments for the song
    const comments = await Comment.find({ songId })
      .populate("user.userId", "username") // Populate user details
      .sort({ createdAt: -1 }) // Most recent comments first
      .skip((pageNumber - 1) * pageSize) // Skip comments for previous pages
      .limit(pageSize); // Limit the results to the specified page size

    // Count total comments for the song
    const totalComments = await Comment.countDocuments({ songId });

    res.status(200).json({
      comments,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalComments / pageSize),
      totalComments,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

// Delete a comment or a reply
const deleteComment = async (req, res) => {
  try {
    const { commentId, replyId } = req.body;

    if (replyId) {
      // Case: Deleting a reply from a comment
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $pull: { replies: { _id: replyId } } }, // Pull the reply by ID from the replies array
        { new: true }
      );

      if (!updatedComment) {
        return res.status(404).json({ message: "Comment or reply not found" });
      }

      return res.status(200).json({
        message: "Reply deleted successfully",
        comment: updatedComment,
      });
    } else {
      // Case: Deleting a top-level comment (including all its replies)
      const deletedComment = await Comment.findByIdAndDelete(commentId);

      if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      return res.status(200).json({
        message: "Comment deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment or reply", error });
  }
};

module.exports = { addComment, addReply, getCommentsBySong, deleteComment };
