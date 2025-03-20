import React from "react";
import { Card, CardFooter, Chip, Image } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const BASE_TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/";
const MOVIE_POSTER_SIZE = "w500";

const MovieCard = ({ id, name, posterPath, releaseDate, vote }) => {
  if (!id) return null; // ✅ Ensures id exists before rendering

  return (
    <Link
      to={`/movie/${id}`}
      className="block"
      aria-label={`View details for ${name}`}
    >
      {" "}
      {/* ✅ Accessibility */}
      <Card
        isFooterBlurred
        className="relative w-full h-64 mb-3 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/50 transition-all"
      >
        <Image
          removeWrapper
          src={
            posterPath
              ? `${BASE_TMDB_IMAGE_URL}${MOVIE_POSTER_SIZE}${posterPath}`
              : "https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg"
          }
          alt={`${name} poster`}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="w-full flex justify-between">
            <Chip
              color="secondary"
              startContent={<FaStar size={16} className="mx-1" />}
            >
              <span className="font-medium">{vote}</span>
            </Chip>
            <p className="font-medium text-white">
              {releaseDate
                ? dayjs(releaseDate).format("MMM YYYY")
                : "Unknown date"}
            </p>
          </div>
        </CardFooter>
      </Card>
      <p className="font-medium text-lg text-black dark:text-white">{name}</p>
    </Link>
  );
};

export default MovieCard;
