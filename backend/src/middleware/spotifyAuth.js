const axios = require("axios");

let accessToken = null;
let tokenExpiryTime = null;

// Function to fetch Spotify Access Token
const getSpotifyToken = async () => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
      }
    );
    accessToken = response.data.access_token;
    tokenExpiryTime = Date.now() + response.data.expires_in * 1000; // expires_in is in seconds
    console.log("Spotify Access Token Retrieved");
  } catch (error) {
    console.error(
      "Error fetching Spotify token:",
      error.response?.data || error
    );
    throw new Error("Failed to retrieve Spotify access token");
  }
};

// Middleware to ensure a valid Spotify Access Token
const ensureSpotifyToken = async (req, res, next) => {
  if (!accessToken || Date.now() >= tokenExpiryTime) {
    await getSpotifyToken(); // Refresh token if expired or not available
  }
  req.spotifyToken = accessToken; // Attach the token to the request object
  next();
};

module.exports = { ensureSpotifyToken };
