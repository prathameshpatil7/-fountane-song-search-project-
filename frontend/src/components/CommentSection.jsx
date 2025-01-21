import React, { useState } from 'react';
import { MessageCircle, Reply } from 'lucide-react';

const Comment = ({ comment, users, onReply, currentUser }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const user = users.find(u => u.id === comment.userId);

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent('');
      setShowReplyInput(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-start space-x-3">
        <img 
          src={user?.avatar} 
          alt={user?.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="bg-gray-100 rounded-lg p-3">
            <p className="font-semibold text-sm">{user?.name}</p>
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
                <div key={reply.id} className="flex items-start space-x-3">
                  <img
                    src={users.find(u => u.id === reply.userId)?.avatar}
                    alt={users.find(u => u.id === reply.userId)?.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="bg-gray-100 rounded-lg p-2 flex-1">
                    <p className="font-semibold text-sm">
                      {users.find(u => u.id === reply.userId)?.name}
                    </p>
                    <p className="text-gray-700 text-sm mt-1">{reply.content}</p>
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

const CommentSection = ({ songId, comments: initialComments, users, currentUser }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim() && currentUser) {
      const newCommentObj = {
        id: Date.now(),
        songId,
        userId: currentUser.id,
        content: newComment,
        timestamp: new Date().toISOString(),
        replies: []
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');
    }
  };

  const handleReply = (commentId, content) => {
    if (!currentUser) return;
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now(),
              userId: currentUser.id,
              content,
              timestamp: new Date().toISOString()
            }
          ]
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
        {comments
          .filter(comment => comment.songId === songId)
          .map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              users={users}
              currentUser={currentUser}
              onReply={handleReply}
            />
          ))}
      </div>
    </div>
  );
};

export default CommentSection;