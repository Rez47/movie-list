import { Query } from "../apiTypes";

export const getPopularSeriesList = (page: string): Query => ({
  endpoint: "tv/popular",
  method: "GET",
  input: `page=${page}`,
});
