import axios from "axios";

const API_KEY = "adaca9c05083fdf43dcffa43806b7672";
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch Trending Movies
export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

// Search Movies
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

// ✅ Movie Details by ID
export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

// ✅ Get Trailer (videos)
export const fetchMovieVideos = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    return [];
  }
};
