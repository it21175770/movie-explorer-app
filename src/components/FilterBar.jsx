import React, { useContext, useEffect, useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { MovieContext } from "../context/MovieContext";
import axios from "axios";

const FilterBar = () => {
  const { filters, setFilters } = useContext(MovieContext);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Fetch genres from TMDb
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=adaca9c05083fdf43dcffa43806b7672`
        );
        setGenres(response.data.genres);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };

    fetchGenres();
  }, []);

  return (
    <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
      {/* Genre */}
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={filters.genre}
          label="Genre"
          onChange={(e) => setFilters(prev => ({ ...prev, genre: e.target.value }))}
        >
          <MenuItem value="">All</MenuItem>
          {genres.map(g => (
            <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Year */}
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Year</InputLabel>
        <Select
          value={filters.year}
          label="Year"
          onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
        >
          <MenuItem value="">All</MenuItem>
          {[...Array(30)].map((_, i) => {
            const year = 2024 - i;
            return <MenuItem key={year} value={year}>{year}</MenuItem>;
          })}
        </Select>
      </FormControl>

      {/* Rating */}
      <FormControl sx={{ minWidth: 140 }}>
        <InputLabel>Min Rating</InputLabel>
        <Select
          value={filters.rating}
          label="Min Rating"
          onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
        >
          <MenuItem value="">All</MenuItem>
          {[...Array(10)].map((_, i) => (
            <MenuItem key={i} value={(10 - i).toFixed(1)}>{(10 - i).toFixed(1)}+</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBar;
