import { Query } from "../apiTypes";

export const getPopularMoviesList = (page: string): Query => ({
  endpoint: "movie/popular",
  method: "GET",
  input: `page=${page}`,
});

export const getNowPlayingMoviesList = (page: string): Query => ({
  endpoint: "movie/now_playing",
  method: "GET",
  input: `page=${page}`,
});
