import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { Spinner } from "@nextui-org/react";

const BASE_TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/";
const MOVIE_BACKDROP_SIZE = "w1280";

const HeroCarousel = ({ isLoading, slideList }) => {
  return (
    <div className="hero-carousel">
      {isLoading && (
        <div className="hero-carousel-loading">
          <Spinner size="lg" color="secondary" />
        </div>
      )}

      {!isLoading && slideList.length > 0 && (
        <Swiper
          className="hero-carousel-swiper"
          centeredSlides
          loop
          loopAdditionalSlides={3}
          effect="cards"
          cardsEffect={{ rotate: false, perSlideOffset: 15 }}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          initialSlide={Math.floor(Math.random() * slideList.length)}
          modules={[Autoplay, EffectCards]}
        >
          {slideList.map((slide) => (
            <SwiperSlide key={slide.movieId} className="hero-carousel-slide">
              <img
                src={`${BASE_TMDB_IMAGE_URL}${MOVIE_BACKDROP_SIZE}${slide.backdropPath}`}
                alt={slide.movieName}
                loading="lazy"
                className="hero-carousel-image"
              />

              <div className="hero-carousel-text">
                <h1>{slide.movieName}</h1>
                <p>{slide.movieDescription.substring(0, 150)}...</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default HeroCarousel;