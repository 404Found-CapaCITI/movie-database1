import React, { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";
import { MainLayout } from "../components/MainLayout";
import Navbar from "../components/Navbar";
import MovieList from "../components/MovieList";
import HeroCarousel from "../components/HeroCarousel";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { Button } from "@mui/material";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
const TMDB_SEARCH_URL = import.meta.env.VITE_TMDB_SEARCH_URL;
const DISCOVER_URL = `${TMDB_BASE_URL}/discover/movie`;

const populateHeroCarouselData = (movieList) => {
  return movieList
    .filter((movie) => movie.backdrop_path)
    .slice(0, 10)
    .map((movie) => ({
      movieId: movie.id,
      movieName: movie.original_title,
      movieDescription: movie.overview,
      backdropPath: `${IMAGE_BASE_URL}${movie.backdrop_path}`,
    }));
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(null); // Store genre ID, not name
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [slideData, setSlideData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const URL = searchTerm ? TMDB_SEARCH_URL : DISCOVER_URL;
        const params = {
          api_key: API_KEY,
          query: searchTerm || undefined,
          sort_by: searchTerm ? undefined : sortBy,
          page: currentPage,
        };

        // ✅ Ensure `with_genres` is included correctly
        if (category) {
          params.with_genres = category;
        }

        const response = await axios.get(URL, { params });

        console.log("API Response:", response.data); // Debugging

        const moviesWithImages = response.data.results
          .filter((movie) => movie.poster_path)
          .map((movie) => ({
            ...movie,
            posterPath: `${IMAGE_BASE_URL}${movie.poster_path}`,
          }));

        if (currentPage === 1) {
          setMovieData(moviesWithImages);
        } else {
          setMovieData((prevData) => [...prevData, ...moviesWithImages]);
        }

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

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    setMovieData([]);
  };

  const handleGenreChange = (genreId) => {
    setCategory(genreId);
    setCurrentPage(1);
    setMovieData([]);
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
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
      <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
      <div className="main-content">
        <MainLayout
          hero={
            <HeroCarousel
              slideList={slideData}
              isLoading={isLoading && firstRender}
            />
          }
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-bold text-4xl">Find Movies</h1>
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
    </div>
  );
};

export default HomePage;
