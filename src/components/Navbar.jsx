import React, { useState, useEffect, useCallback } from "react";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ searchTerm, setSearchTerm, category, setCategory }) => {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  // Handle scroll visibility
  const handleScroll = useCallback(() => {
    setVisible(window.scrollY < prevScrollY);
    setPrevScrollY(window.scrollY);
  }, [prevScrollY]);

  // Apply dark mode on mount
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className={`navbar ${visible ? "visible" : "hidden"}`}>
      <div className="logo">
        <h2 className="font-bold text-xl text-black dark:text-white">
          404 Found
        </h2>
      </div>

      <div className="search-category">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-bar"
            placeholder="Search movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="category-dropdown"
          value={category || "All Genres"} // Ensures category is never null
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All Genres">All Genres</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="14">Fantasy</option>
          <option value="36">History</option>
          <option value="27">Horror</option>
          <option value="10402">Music</option>
          <option value="9648">Mystery</option>
          <option value="10749">Romance</option>
          <option value="878">Science Fiction</option>
          <option value="10770">TV Movie</option>
          <option value="53">Thriller</option>
          <option value="10752">War</option>
          <option value="37">Western</option>
        </select>
      </div>

      <div className="dark-mode-toggle">
        <button onClick={handleDarkModeToggle}>
          {darkMode ? (
            <FaMoon className="dark-mode-icon" />
          ) : (
            <FaSun className="dark-mode-icon" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
