import React, { useState, useEffect } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { MainLayout } from "../components/MainLayout";
import Navbar from "../components/Navbar";
import MovieList from "../components/MovieList";
import HeroCarousel from "../components/HeroCarousel";
import axios from "axios";
import SearchBar from "../components/SearchBar"; // Ensure SearchBar is imported

const API_KEY = "05c0d8143a45b7ef5afd85d20acdce23";
const DISCOVER_URL = "https://api.themoviedb.org/3/discover/movie";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

const populateHeroCarouselData = (movieList) => {
  return movieList.slice(0, 10).map((movie) => ({
    movieId: movie.id,
    movieName: movie.original_title,
    movieDescription: movie.overview,
    backdropPath: movie.backdrop_path,
  }));
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

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);

      try {
        const URL = searchTerm ? SEARCH_URL : DISCOVER_URL;
        const response = await axios.get(URL, {
          params: {
            api_key: API_KEY,
            query: searchTerm || undefined, // Only include query if searching
            sort_by: searchTerm ? undefined : sortBy, // Sorting only applies when not searching
            with_genres: searchTerm || category === "All Genres" ? undefined : category,
            page: currentPage,
          },
        });

        if (currentPage === 1) {
          setMovieData(response.data.results);
        } else {
          setMovieData((prevData) => [...prevData, ...response.data.results]);
        }

        if (firstRender && response.data.results?.length > 0) {
          setFirstRender(false);
          setSlideData(populateHeroCarouselData(response.data.results));
        }
      } catch (error) {
        console.error("Error fetching movies", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm, category, sortBy, currentPage]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    setMovieData([]);
  };

  const handleGenreChange = (genre) => {
    setCategory(genre);
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
            <HeroCarousel slideList={slideData} isLoading={isLoading && firstRender} />
          }
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-bold text-4xl">Discover Movies</h1>
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
            <Button isLoading={isLoading} onPress={loadMore}>
              Load more
            </Button> 
          </div>
        </MainLayout>
      </div>
    </div>
  );
};

export default HomePage;
