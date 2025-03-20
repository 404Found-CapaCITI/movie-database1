import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const BASE_TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/";
const MOVIE_POSTER_SIZE = "w500";

const MovieCard = ({ id, name, posterPath, releaseDate, vote }) => {
  if (!id) return null; // ✅ Ensures id exists before rendering

  return (
    <div className="w-full">
      <div className="relative w-full h-64 mb-3 overflow-hidden rounded-lg shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/50">
        <img
          src={
            posterPath
              ? `${BASE_TMDB_IMAGE_URL}${MOVIE_POSTER_SIZE}${posterPath}`
              : "https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg"
          }
          alt={`${name} poster`}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Blurred Footer Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-2xl text-white flex justify-between items-center px-4 py-3">
          <span className="flex items-center gap-1 bg-orange-800 px-2 py-1 rounded-full text-sm font-semibold">
            <FaStar size={14} className="text-white" />
            {vote}
          </span>

          {/* Release Date */}
          <span className="text-sm font-medium">
            {releaseDate ? dayjs(releaseDate).format("MMM YYYY") : "Unknown date"}
          </span>
        </div>
      </div>
      {/* Movie Title */}
      <p className="font-medium text-lg text-black dark:text-white text-center">{name}</p>
    </div>
  );
};

export default MovieCard;
