import React, { useState } from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";

const App = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  // Initialize Swiper on component mount
  React.useEffect(() => {
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

  return (
    <div className={`app ${isLightMode ? "light-mode" : ""}`}>
      {/* Header */}
      <header>
        <h1>Movie Posters</h1>
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
            <input type="text" placeholder="Search Movies..." />
          </div>
        </div>
      </header>

      {/* Swiper Container */}
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {/* Swiper Slide 1 */}
          <div className="swiper-slide">
            <img className="movie-image" src="movie1.jpg" alt="Movie 1" />
          </div>

          {/* Swiper Slide 2 */}
          <div className="swiper-slide">
            <img className="movie-image" src="movie2.jpg" alt="Movie 2" />
          </div>

          {/* Swiper Slide 3 */}
          <div className="swiper-slide">
            <img className="movie-image" src="movie3.jpg" alt="Movie 3" />
          </div>

          {/* Swiper Slide 4 */}
          <div className="swiper-slide">
            <img className="movie-image" src="movie4.jpg" alt="Movie 4" />
          </div>

          {/* Swiper Slide 5 */}
          <div className="swiper-slide">
            <img className="movie-image" src="movie5.jpg" alt="Movie 5" />
          </div>
        </div>

        {/* Pagination */}
        <div className="swiper-pagination"></div>
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Movie Posters | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default App;
