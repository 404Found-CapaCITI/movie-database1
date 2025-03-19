import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "05c0d8143a45b7ef5afd85d20acdce23";

export const useGetDiscoverMoviesQuery = ({ queryParams = {} } = {}) => {
  return useInfiniteQuery({
    queryKey: ["discover_movies", queryParams],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        // Direct API call within the queryFn
        const response = await axios.get(`${API_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            page: pageParam,
            sort_by: queryParams.sortBy, // Sorting by popularity, rating, etc.
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPageExist = lastPage.page < lastPage.total_pages;
      return nextPageExist ? lastPage.page + 1 : undefined;
    },
  });
};