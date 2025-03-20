import React, { useState, useEffect, useCallback } from "react";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa"; 
import "./navbar.css";

const Navbar = ({ searchTerm, setSearchTerm, category, setCategory }) => {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(true);  // Default to dark mode

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode); // Save to localStorage
  };

  const handleScroll = useCallback(() => {
    if (window.scrollY > prevScrollY) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setPrevScrollY(window.scrollY);
  }, [prevScrollY]);

  useEffect(() => {
    // Load darkMode preference from localStorage on initial load
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    
    // Set darkMode to either the saved value or default to true (dark mode)
    setDarkMode(savedDarkMode !== null ? savedDarkMode : true);

    if (savedDarkMode !== null ? savedDarkMode : true) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);  // This effect runs once on component mount

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={`navbar ${visible ? "visible" : "hidden"}`}>
      <div className="logo">
        <h2>404 Found</h2>
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
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Genres</option>
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
