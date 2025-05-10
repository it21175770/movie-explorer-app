import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";
import { Box, Typography, Grid } from "@mui/material";

const SearchResults = () => {
  const { searchResults, query, filters } = useContext(MovieContext);

  const filtered = searchResults.filter(movie => {
    const matchGenre = !filters.genre || movie.genre_ids?.includes(Number(filters.genre));
    const matchYear = !filters.year || movie.release_date?.startsWith(filters.year);
    const matchRating = !filters.rating || movie.vote_average >= Number(filters.rating);
    return matchGenre && matchYear && matchRating;
  });

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>🔎 Search Results for: "{query}"</Typography>
      <FilterBar />
      <Grid container spacing={2}>
        {filtered.length > 0 ? (
          filtered.map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))
        ) : (
          <Typography>No results found.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default SearchResults;
