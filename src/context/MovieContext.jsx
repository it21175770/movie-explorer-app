import React, { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState(localStorage.getItem("lastSearch") || "");

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    rating: ""
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <MovieContext.Provider
      value={{
        searchResults,
        setSearchResults,
        query,
        setQuery,
        favorites,
        setFavorites,
        filters,
        setFilters
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
