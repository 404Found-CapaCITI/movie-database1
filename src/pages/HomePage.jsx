import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { MainLayout } from "../components/MainLayout";
import  MovieList  from "../components/MovieList";
import { useGetDiscoverMoviesQuery } from "../hooks/use-get-discover-movies-query";
import  HeroCarousel  from "../components/HeroCarousel";

const populateHeroCarouselData = (movieList) => {
  if (movieList.length >= 10) {
    return [...movieList].splice(0, 10).map((movie) => ({
      movieId: movie.id,
      movieName: movie.original_title,
      movieDescription: movie.overview,
      backdropPath: movie.backdrop_path
    }));
  }
  return [];
};

const HomePage = () => {
  const [firstRender, setFirstRender] = useState(true);
  const [sortBy, setSortBy] = useState("popularity.desc");

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetDiscoverMoviesQuery({
      queryParams: {
        sortBy
      }
    });
  
  const [slideData, setSlideData] = useState([]);

  useEffect(() => {
    if (
      !isLoading &&
      data &&
      data?.pages[0].results?.length > 0 &&
      firstRender
    ) {
      setFirstRender(false);
      setSlideData(populateHeroCarouselData(data.pages[0].results));
    }
  }, [isLoading, data, firstRender]);

  return (
    <MainLayout
      hero={
        <HeroCarousel
          slideList={slideData}
          isLoading={isLoading && firstRender}
        />
      }
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-4xl">Discover Movies</h1>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center my-16">
          <Spinner size="lg" color="secondary" />
        </div>
      )}

      <div className="flex flex-col gap-y-8">
        {data?.pages?.map((page) => (
          <MovieList key={page.page} movieList={page?.results ?? []} />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <Button
            isLoading={isFetchingNextPage}
            onPress={() => fetchNextPage()}
          >
            Load more
          </Button>
        </div>
      )}
    </MainLayout>
  );
};

export default HomePage;