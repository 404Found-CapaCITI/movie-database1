import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Button,
  Modal,
  Chip,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCalendarDays,
  faPlay,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const API_KEY = "05c0d8143a45b7ef5afd85d20acdce23";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // For modal

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

    const fetchMovieTrailer = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}/videos`,
          {
            params: { api_key: API_KEY },
          }
        );

        const trailers = response.data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
      }
    };

    if (id) {
      fetchMovieDetails();
      fetchMovieTrailer();
    }
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        Movie not found.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `url(${IMAGE_BASE_URL}${movie.backdrop_path}) center/cover no-repeat`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(10px)", // Blurry background effect
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: "900px",
          width: "90%",
          p: 4,
          borderRadius: "12px",
          backdropFilter: "blur(15px)", // Blurry effect on movie details card
          backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent white
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Go Back Button */}
        <Button
          variant="contained"
          sx={{
            mb: 2,
            backgroundColor: "#ff9800",
            color: "white",
            "&:hover": { backgroundColor: "#e68900" },
          }}
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "8px" }} />
          Go Back
        </Button>

        <Card
          sx={{
            boxShadow: 3,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={3}>
            {/* Movie Poster */}
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                image={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : "https://via.placeholder.com/500"
                }
                alt={movie.title}
                sx={{ borderRadius: "10px", height: "100%" }}
              />
            </Grid>

            {/* Movie Details */}
            <Grid item xs={12} sm={8}>
              <CardContent>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="white"
                  gutterBottom
                >
                  {movie.title}
                </Typography>
                <Typography variant="body1" color="white" gutterBottom>
                  {movie.overview || "No description available."}
                </Typography>

                {/* Genre & Rating */}
                <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                  <Chip
                    icon={
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ color: "yellow" }}
                      />
                    }
                    label={movie.vote_average.toFixed(1)}
                    color="primary"
                  />

                  <Chip
                    icon={
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        style={{ color: "white" }}
                      />
                    }
                    label={movie.release_date}
                    sx={{ backgroundColor: "#ff9800", color: "white" }}
                  />

                  {movie.genres?.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      variant="outlined"
                      sx={{ color: "white", borderColor: "white" }}
                    />
                  ))}
                </Box>

                {/* Play Trailer Button */}
                {trailerKey && (
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: "#ff0000",
                      color: "white",
                      "&:hover": { backgroundColor: "#cc0000" },
                    }}
                    onClick={() => setOpen(true)}
                  >
                    <FontAwesomeIcon
                      icon={faYoutube}
                      style={{ marginRight: "8px" }}
                    />
                    Play Trailer
                  </Button>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>

      {/* Trailer Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: "10px",
          }}
        >
          {trailerKey ? (
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            ></iframe>
          ) : (
            <Typography variant="body1" color="textSecondary" align="center">
              No trailer available.
            </Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default MovieDetails;
