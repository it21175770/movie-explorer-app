import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";  // ✅ Import Navbar

const App = () => {
  return (
    <Router>
      <Navbar /> {/* ✅ Add Navbar */}
      <Container>
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
