import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieVideos } from "../services/tmdb";
import { Box, Typography, Chip, CircularProgress } from "@mui/material";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);

      const videos = await fetchMovieVideos(id);
      const trailer = videos.find((v) => v.type === "Trailer" && v.site === "YouTube");
      setTrailerKey(trailer?.key);
    };

    loadMovie();
  }, [id]);

  if (!movie) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>{movie.title}</Typography>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "250px", borderRadius: 8, marginBottom: "1rem" }}
      />
      <Typography variant="body1" paragraph>{movie.overview}</Typography>
      <Typography variant="body2" gutterBottom>
        🎬 Release Date: {movie.release_date} | ⭐ Rating: {movie.vote_average}
      </Typography>

      <Box mb={2}>
        {movie.genres.map((genre) => (
          <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>

      {trailerKey && (
        <Box>
          <Typography variant="h6" gutterBottom>🎥 Trailer:</Typography>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
          />
        </Box>
      )}
    </Box>
  );
};

export default MovieDetails;
