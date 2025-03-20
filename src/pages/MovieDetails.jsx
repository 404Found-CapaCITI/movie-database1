import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react";

const API_KEY = "05c0d8143a45b7ef5afd85d20acdce23";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const YOUTUBE_API_KEY = "AIzaSyBBxLIFH7rKS5wDskp9UapVceh08Wpyln0";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
          params: { api_key: API_KEY },
        });
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]); // ✅ Correct dependency array

  useEffect(() => {
    const fetchMovieTrailer = async () => {
      if (!movie) return;

      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              key: YOUTUBE_API_KEY,
              q: `${movie.title} official trailer`,
              part: "snippet",
              type: "video",
              maxResults: 1,
            },
          }
        );

        if (response.data.items.length > 0) {
          setTrailerKey(response.data.items[0].id.videoId);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    if (movie) {
      fetchMovieTrailer();
    }
  }, [movie]); // ✅ Fix: Correct dependency array

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="secondary" />
      </div>
    );
  }

  if (!movie) {
    return <p className="text-center text-red-500">Movie not found.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img
        src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : ""}
        alt={movie.title}
        className="rounded-lg shadow-lg mb-4"
      />
      <p className="text-lg">{movie.overview}</p>

      {trailerKey ? (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-2">Watch Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No trailer available</p>
      )}
    </div>
  );
};

export default MovieDetails;
