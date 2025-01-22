import React, { useState } from "react";
import { Reply } from "lucide-react";
import UserInitialsImage from "./UserInitialsImage";

const Comment = ({ comment, onReply, currentUser }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onReply(comment._id, replyContent);
      setReplyContent("");
      setShowReplyInput(false);
    }
  };
  return (
    <div className="mb-4">
      <div className="flex items-start space-x-3">
        <UserInitialsImage username={comment?.user?.username} />
        <div className="flex-1">
          <div className="bg-gray-100 rounded-lg p-3">
            <p className="font-semibold text-sm">{comment?.user?.username}</p>
            <p className="text-gray-700 mt-1">{comment.content}</p>
          </div>
          {currentUser && (
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="text-sm text-gray-500 mt-1 flex items-center hover:text-gray-700"
            >
              <Reply size={14} className="mr-1" />
              Reply
            </button>
          )}

          {showReplyInput && (
            <form onSubmit={handleSubmitReply} className="mt-2">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-2 space-x-2">
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Reply
                </button>
                <button
                  type="button"
                  onClick={() => setShowReplyInput(false)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-8 mt-3 space-y-3">
              {comment.replies.map((reply) => (
                <div key={reply._id} className="flex items-start space-x-3">
                  <UserInitialsImage username={reply?.user?.username} />
                  <div className="bg-gray-100 rounded-lg p-2 flex-1">
                    <p className="font-semibold text-sm">
                      {reply?.user?.username}
                    </p>
                    <p className="text-gray-700 text-sm mt-1">
                      {reply.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
