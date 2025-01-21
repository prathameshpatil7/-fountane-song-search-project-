// Mock data for songs
export const songs = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800",
    duration: "5:55",
    commentCount: 2,
  },
  {
    id: 2,
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
    duration: "8:02",
    commentCount: 0,
  },
  {
    id: 3,
    title: "Hotel California",
    artist: "Eagles",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    duration: "6:30",
    commentCount: 0,
  },
];

// Mock data for comments
export const comments = [
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

// Mock users data
export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    password: "password123",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
  },
];
