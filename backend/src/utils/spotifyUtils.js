const axios = require("axios");

// Generic function to make Spotify API requests
const makeSpotifyRequest = async (endpoint, token, params = {}) => {
  try {
    const response = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return response.data; // Return raw data for flexibility in the controller
  } catch (error) {
    console.error("Spotify API error:", error.response?.data || error);
    throw new Error("Spotify API request failed");
  }
};

module.exports = { makeSpotifyRequest };
