const express = require("express");
const { ensureSpotifyToken } = require("../middleware/spotifyAuth");
const { searchSongs, getSongById } = require("../controllers/songController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route for searching songs
router.get("/search", protect, ensureSpotifyToken, searchSongs);

// Route for getting song by ID
router.get("/:id", protect, ensureSpotifyToken, getSongById);

module.exports = router;
