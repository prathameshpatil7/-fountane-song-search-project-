import React from "react";

// Sample data
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
  },
];

const comments = [
  {
    id: 1,
    songId: 1,
    userId: 1,
    content: "This is one of the greatest songs ever written!",
    timestamp: "2024-03-10T10:00:00Z",
    replies: [
      {
        id: 2,
        userId: 2,
        content: "Absolutely agree! The opera section is amazing.",
        timestamp: "2024-03-10T10:30:00Z",
      },
    ],
  },
  {
    id: 3,
    songId: 1,
    userId: 3,
    content: "I listen to this song at least once a day.",
    timestamp: "2024-03-10T11:00:00Z",
    replies: [],
  },
];

// Helper function to get user data by userId
const getUserById = (userId) => users.find((user) => user.id === userId);

// Comment component to render individual comments and replies
const Comment = ({ comment }) => {
  const user = getUserById(comment.userId);

  return (
    <div className="space-y-4 border-b pb-4">
      <div className="flex items-center space-x-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <span className="font-semibold">{user.name}</span>
          <p className="text-gray-500 text-sm">{comment.content}</p>
        </div>
      </div>

      {/* Display replies recursively */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 space-y-3">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

// Main CommentList component
const CommentList = () => {
  return (
    <div className="p-6 space-y-4">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
