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
    <div className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
      {isLoading && (
        <div className="flex justify-center items-center min-h-[500px]">
          <Spinner size="lg" color="secondary" />
        </div>
      )}

      {!isLoading && slideList.length > 0 && (
        <Swiper
          className="shadow-xl"
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
            <SwiperSlide key={slide.movieId} className="relative w-full h-full">
              <img
                src={`${BASE_TMDB_IMAGE_URL}${MOVIE_BACKDROP_SIZE}${slide.backdropPath}`}
                alt={slide.movieName}
                loading="lazy"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>

              <div className="absolute bottom-10 left-10 text-white max-w-2xl">
  <h1 className="text-xl md:text-3xl font-bold">{slide.movieName}</h1>
  <p className="mt-2 text-sm md:text-base hidden md:block">
    {slide.movieDescription.substring(0, 150)}...
  </p>
</div>

            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default HeroCarousel;
