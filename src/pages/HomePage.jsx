import React, { useState, useEffect } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { MainLayout } from "../components/MainLayout";
import Navbar from "../components/Navbar";
import MovieList from "../components/MovieList";
import HeroCarousel from "../components/HeroCarousel";
import GenreFilter from "../components/GenreFilter";
import SearchBar from "../components/SearchBar";
import axios from "axios";

const API_KEY = "05c0d8143a45b7ef5afd85d20acdce23";  
const BASE_URL = "https://api.themoviedb.org/3/discover/movie";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Genres");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    // Fetch movie data whenever search term, category, or sortBy changes
    const fetchMovies = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(BASE_URL, {
          params: {
            api_key: API_KEY,
            sort_by: sortBy,
            query: searchTerm,
            with_genres: category === "All Genres" ? "" : category,
            page: 1,
          },
        });
        setMovieData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm, category, sortBy]);  // Dependency array: trigger fetch on searchTerm, category, or sortBy change

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleGenreChange = (genre) => {
    setCategory(genre);
  };

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <MainLayout
          hero={
            <HeroCarousel
              slideList={movieData.slice(0, 10)}  
              isLoading={isLoading && firstRender}
            />
          }
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-bold text-4xl">Discover Movies</h1>
          </div>

          <div className="flex gap-4 mb-8">
            <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
            <GenreFilter category={category} setCategory={handleGenreChange} />
          </div>

          {isLoading && (
            <div className="flex justify-center items-center my-16">
              <Spinner size="lg" color="secondary" />
            </div>
          )}

          <div className="flex flex-col gap-y-8">
            {movieData.length > 0 && (
              <MovieList movieList={movieData} />
            )}
          </div>

          <div className="flex justify-center mt-8">
            <Button onPress={() => {}}>Load more</Button> 
          </div>
        </MainLayout>
      </div>
    </div>
  );
};

export default HomePage;
