import React, { useContext, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import { searchMovies } from "../services/tmdb";
import { useNavigate } from "react-router-dom";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // ✅ This works after installing

const SearchBar = () => {
  const { setSearchResults, setQuery } = useContext(MovieContext);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!input) return;
    localStorage.setItem("lastSearch", input);
    setQuery(input);
    const results = await searchMovies(input);
    setSearchResults(results);
    navigate("/search");
  };

  return (
    <div style={{ display: "flex", marginBottom: "1rem" }}>
      <TextField
        fullWidth
        placeholder="Search for a movie..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <IconButton onClick={handleSearch} color="primary">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
