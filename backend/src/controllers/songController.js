const { makeSpotifyRequest } = require("../utils/spotifyUtils");

// Search songs by query or get top 10 songs
const searchSongs = async (req, res) => {
  const { query, offset = 0 } = req.query;
  const accessToken = req.spotifyToken;

  try {
    let endpoint = "https://api.spotify.com/v1/search";
    let params;

    if (query) {
      // Search by query
      params = { q: query, type: "track", limit: 15, offset };
    } else {
      // Get top 10 songs
      params = { q: "2HyZ2MDGK505GnpSjZ1NDv", type: "track", limit: 15 };
    }

    const data = await makeSpotifyRequest(endpoint, accessToken, params);

    const tracks = data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map((artist) => artist.name).join(", "),
      image: track.album.images[0]?.url,
      duration: track.duration_ms,
    }));

    res.json({ tracks: tracks, success: true });
  } catch (error) {
    console.error("Error fetching songs:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch songs from Spotify", success: false });
  }
};

// Search a song by ID
const getSongById = async (req, res) => {
  const { id } = req.params;
  const accessToken = req.spotifyToken;

  try {
    const data = await makeSpotifyRequest(
      `https://api.spotify.com/v1/tracks/${id}`,
      accessToken
    );

    res.json({
      track: {
        id: data.id,
        name: data.name,
        artist: data.artists.map((artist) => artist.name).join(", "),
        album: data.album.name,
        preview_url: data.preview_url,
        image: data.album.images[0]?.url,
      },
      success: true,
    });
  } catch (error) {
    console.error("Error fetching song by ID:", error.message);
    res.status(500).json({
      error: "Failed to fetch song by ID from Spotify",
      success: false,
    });
  }
};

module.exports = { searchSongs, getSongById };
