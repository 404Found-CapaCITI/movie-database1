import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieList = ({ movieList }) => {
  return (
    <div className="movie-list">
      {movieList.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-list-item">
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