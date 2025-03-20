import { Link } from "react-router-dom";

const MovieList = ({ movieList }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {movieList.map((movie) => (
        <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-item">
          <img
            src={movie.posterPath}
            alt={movie.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
