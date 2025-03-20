import React from "react";

const MovieList = ({ movieList }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movieList.map((movie) => (
        <div key={movie.id} className="movie-card text-center">
          <img
            src={movie.posterPath || "/placeholder.jpg"} 
            alt={movie.original_title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <h2 className="mt-2 font-semibold">{movie.original_title}</h2>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
