import React, { useEffect, useState, useContext } from "react";
import { fetchTrendingMovies } from "../services/tmdb";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";
import { Box, Typography, Grid } from "@mui/material";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const { filters } = useContext(MovieContext);

  useEffect(() => {
    const loadTrending = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
    };
    loadTrending();
  }, []);

  const filtered = movies.filter(movie => {
    const matchGenre = !filters.genre || movie.genre_ids?.includes(Number(filters.genre));
    const matchYear = !filters.year || movie.release_date?.startsWith(filters.year);
    const matchRating = !filters.rating || movie.vote_average >= Number(filters.rating);
    return matchGenre && matchYear && matchRating;
  });

  return (
    <Box p={2}>
      <Typography variant="h4" mb={2}>🎬 Trending Movies</Typography>
      <FilterBar />
      <Grid container spacing={2}>
        {filtered.map((movie) => (
          <Grid item key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
