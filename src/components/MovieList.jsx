import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieList = ({ movieList,}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
      {movieList.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <MovieCard
            id={movie.id}
            name={movie.original_title}
            posterPath={movie.posterPath}
            releaseDate={movie.release_date}
            vote={movie.vote_average.toFixed(1)}
          />
        </Link>
      ))}
    </div>
  );
};

export default MovieList;