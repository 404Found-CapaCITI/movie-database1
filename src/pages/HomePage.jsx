import React, { useState, useEffect, useRef } from "react";
import { Spinner } from "@nextui-org/react";
import { MainLayout } from "../components/MainLayout";
import Navbar from "../components/Navbar";
import MovieList from "../components/MovieList";
import HeroCarousel from "../components/HeroCarousel";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { Button } from "@mui/material";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const TMDB_SEARCH_URL = import.meta.env.VITE_TMDB_SEARCH_URL;

const DISCOVER_URL = `${TMDB_BASE_URL}/discover/movie`;

const populateHeroCarouselData = (movieList) => {
  const filteredMovies = movieList.filter((movie) => movie.backdrop_path); // Ensure it has an image
  return filteredMovies.slice(0, 10).map((movie) => ({
    movieId: movie.id,
    movieName: movie.original_title,
    movieDescription: movie.overview,
    backdropPath: `${IMAGE_BASE_URL}${movie.backdrop_path}`,
  }));
};

const genreNames = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Genres");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [slideData, setSlideData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  const movieSectionRef = useRef(null);
  const isLoadMoreClicked = useRef(false);  // Added this to track if Load More was clicked

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);

      try {
        const URL = searchTerm ? TMDB_SEARCH_URL : DISCOVER_URL;

        // Set parameters for the request
        const params = {
          api_key: API_KEY,
          query: searchTerm || undefined,
          sort_by: searchTerm ? undefined : sortBy,
          page: currentPage,
        };

        // Only add `with_genres` if the category is not "All Genres"
        if (category !== "All Genres") {
          params.with_genres = category;
        }

        const response = await axios.get(URL, { params });

        // Filter out movies without poster images
        const moviesWithImages = response.data.results
          .filter((movie) => movie.poster_path) // Ensure only movies with a poster are included
          .map((movie) => ({
            ...movie,
            posterPath: `${IMAGE_BASE_URL}${movie.poster_path}`,
          }));

        // If it's the first page (initial load), reset movieData to only the new movies
        if (currentPage === 1) {
          setMovieData(moviesWithImages);
        } else {
          // Otherwise, append new data to the existing list
          setMovieData((prevData) => [...prevData, ...moviesWithImages]);
        }

        // Set the slide data for the hero carousel (only the first time movies are loaded)
        if (firstRender && moviesWithImages.length > 0) {
          setFirstRender(false);
          setSlideData(populateHeroCarouselData(moviesWithImages));
        }
      } catch (error) {
        console.error("Error fetching movies", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm, category, sortBy, currentPage, firstRender]);

  // Handle scroll behavior only when a search or genre change happens
  useEffect(() => {
    if (hasSearched && movieData.length > 0 && movieSectionRef.current && !isLoadMoreClicked.current) {
      window.scrollTo({ top: movieSectionRef.current.offsetTop - 50, behavior: "smooth" });
    }

    // Reset flag after scrolling
    if (isLoadMoreClicked.current) {
      isLoadMoreClicked.current = false;
    }
  }, [movieData, hasSearched]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    setMovieData([]);
    setHasSearched(true);
  };

  const handleGenreChange = (genreId) => {
    if (genreId === "All Genres") {
      window.location.reload();
    } else {
      setCategory(genreId);
      setCurrentPage(1);
      setMovieData([]);
      setHasSearched(true);
    }
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    isLoadMoreClicked.current = true; // Set flag to true when "Load More" is clicked
  };

  const getTitle = () => {
    if (searchTerm) return `Search Results for "${searchTerm}"`;
    if (category === "All Genres") return "Discover Movies";
    return `${genreNames[category]} Movies`;
  };  

  return (
    <div>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={handleSearch}
        category={category}
        setCategory={handleGenreChange}
        setSortBy={setSortBy}
      />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch} // Pass handleSearch to SearchBar
      />
      <div className="main-content">
        <MainLayout
          hero={
            <HeroCarousel
              slideList={slideData}
              isLoading={isLoading && firstRender}
            />
          }
        >
          <div ref={movieSectionRef} className="flex justify-between items-center mb-8">
            <h1 className="font-bold text-4xl">{getTitle()}</h1>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center my-16">
              <Spinner size="lg" color="secondary" />
            </div>
          )}

          <div className="flex flex-col gap-y-8">
            {movieData.length > 0 && <MovieList movieList={movieData} />}
          </div>

          <div className="flex justify-center mt-8">
            <Button
              variant="contained"
              color="warning"
              sx={{
                "&:hover": { backgroundColor: "#e68900" },
                textTransform: "none",
              }}
              onClick={loadMore}
            >
              Load More
            </Button>
          </div>
        </MainLayout>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
