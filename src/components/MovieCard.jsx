import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const BASE_TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/";
const MOVIE_POSTER_SIZE = "w500";

const MovieCard = ({ id, name, posterPath, releaseDate, vote }) => {
  if (!id) return null;

  return (
    <div className="movie-card">
      <div className="movie-card-image">
        <img
          src={
            posterPath
              ? `${BASE_TMDB_IMAGE_URL}${MOVIE_POSTER_SIZE}${posterPath}`
              : "https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg"
          }
          alt={`${name} poster`}
          loading="eager"
        />
        <div className="movie-card-overlay">
          <span className="movie-card-rating">
            <FaStar size={14} className="star-icon" />
            {vote}
          </span>
          <span className="movie-card-date">
            {releaseDate ? dayjs(releaseDate).format("MMM YYYY") : "Unknown date"}
          </span>
        </div>
      </div>
      <p className="movie-card-title">{name}</p>
    </div>
  );
};

export default MovieCard;