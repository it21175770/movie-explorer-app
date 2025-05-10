import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { Box, Typography, Grid } from "@mui/material";

const Favorites = () => {
  const { favorites } = useContext(MovieContext);

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>❤️ Your Favorite Movies</Typography>
      {favorites.length === 0 ? (
        <Typography>No favorites yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map(movie => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
