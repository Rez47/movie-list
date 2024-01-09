import { Query } from "../apiTypes";

export const getMovieDetails = (movie_id: string): Query => ({
  endpoint: `movie/${movie_id}`,
  method: "GET",
});
