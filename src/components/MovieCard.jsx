import React, { useContext } from "react";
import { Card, CardMedia, CardContent, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { MovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { favorites, setFavorites } = useContext(MovieContext);

  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <Card sx={{ width: 200, m: 1, position: "relative" }}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
      <CardContent>
        <Typography variant="h6" noWrap>{movie.title}</Typography>
        <Typography variant="body2">
          ⭐ {movie.vote_average} | 📅 {movie.release_date?.slice(0, 4)}
        </Typography>
      </CardContent>
      <IconButton
        onClick={toggleFavorite}
        color="error"
        sx={{ position: "absolute", top: 5, right: 5 }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Card>
  );
};

export default MovieCard;
