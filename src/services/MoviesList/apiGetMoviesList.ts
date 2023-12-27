import { Query } from "../apiTypes";

export const getPopularMoviesList = (page: string): Query => ({
  endpoint: "movie/popular",
  method: "GET",
  input: `page=${page}`,
});
