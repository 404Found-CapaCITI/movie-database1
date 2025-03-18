import React, { useState, useEffect } from "react";
import Swiper from "swiper";
import 'swiper/css'; // Basic Swiper styles
import 'swiper/css/effect-coverflow'; // Coverflow effect styles
import 'swiper/css/pagination'; // Pagination styles

const App = () => {
   // Movie data (can be extended with more movies)
   const movies = [
    { id: 1, title: "Movie 1", image: "/img/movie1.jpg" },
    { id: 2, title: "Movie 2", image: "/img/movie2.jpg" },
    { id: 3, title: "Movie 3", image: "/img/movie3.jpg" },
    { id: 4, title: "Movie 4", image: "/img/movie4.jpg" },
    { id: 5, title: "Movie 5", image: "/img/movie5.jpg" },
  ];
  // State for light mode toggle
  const [isLightMode, setIsLightMode] = useState(false);

  // State for search query and filtered movies
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies); // Initial filtered movies are the full list of movies

 

  // Update the filtered movies whenever the search query changes
  useEffect(() => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchQuery]);

  // Initialize Swiper on component mount
  useEffect(() => {
    new Swiper(".swiper-container", {
      loop: true,
      centeredSlides: true,
      slidesPerView: "auto",
      spaceBetween: 5,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      effect: "coverflow",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2,
        },
        480: {
          slidesPerView: 1,
        },
      },
    });
  }, []);

  // Toggle Light/Dark Mode
  const toggleMode = () => {
    setIsLightMode(!isLightMode);
  };

  // Handle search query input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`app ${isLightMode ? "light-mode" : ""}`}>
      {/* Header */}
      <header>
        <h1>Flick404</h1>
        <div>
          {/* Genre Filter */}
          <select className={`genre-select ${isLightMode ? "light-mode" : ""}`}>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="thriller">Thriller</option>
          </select>
          {/* Toggle Button */}
          <button className={`toggle-button ${isLightMode ? "light-mode" : ""}`} onClick={toggleMode}>
            {isLightMode ? "🌞" : "🌙"}
          </button>
        </div>
        <div>
          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search Movies..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </header>

      {/* Swiper Container */}
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {/* Dynamically render filtered movies */}
          {filteredMovies.map(movie => (
            <div className="swiper-slide" key={movie.id}>
              <img className="movie-image" src={movie.image} alt={movie.title} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="swiper-pagination"></div>
      </div>
      

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Flick404 | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default App;
