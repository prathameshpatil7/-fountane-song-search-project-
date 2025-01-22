import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { fetch } from "../services/fetch";
import Comment from "./Comment";

const CommentSection = ({
  songId,
  comments: initialComments,
  users,
  currentUser,
  totalPages,
}) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(totalPages > 1); // Tracks if more comments are available
  const [loadingMore, setLoadingMore] = useState(false); // Tracks loading state for "Load More"

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() && currentUser) {
      const response = await fetch({
        url: "/api/comments",
        body: {
          content: newComment.trim(),
          songId: songId.toString(),
          userId: currentUser._id,
          username: currentUser.name,
        },
      });
      setComments([response, ...comments]);
      setNewComment("");
    }
  };

  const handleLoadMoreComments = async () => {
    if (!hasMoreComments || loadingMore) return;
    setLoadingMore(true);

    try {
      const response = await fetch(
        {
          url: `/api/comments/${songId}?page=${page + 1}&limit=10`,
        },
        "GET"
      );

      if (response.comments.length > 0) {
        setComments((prevComments) => [...prevComments, ...response.comments]);
        setPage((prevPage) => prevPage + 1);
        if (totalPages === page + 1) {
          setHasMoreComments(false); // No more comments to load
        }
      } else {
        setHasMoreComments(false); // No comments in response
      }
    } catch (error) {
      console.error("Error loading more comments:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleReply = async (commentId, content) => {
    if (!currentUser) return;
    const response = await fetch({
      url: "/api/comments/reply",
      body: {
        content: content.trim(),
        userId: currentUser._id,
        username: currentUser.name,
        commentId: commentId,
      },
    });

    const updatedComments = comments.map((comment) => {
      if (comment._id === commentId) {
        return {
          ...response,
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <MessageCircle className="mr-2" />
        Comments
      </h3>

      {currentUser ? (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Comment
          </button>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg text-center">
          Please log in to comment
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            users={users}
            currentUser={currentUser}
            onReply={handleReply}
          />
        ))}
      </div>

      {hasMoreComments && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMoreComments}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "View older comments..."}
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
