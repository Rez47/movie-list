import { Query } from "../apiTypes";

export const getSeriesDetails = (series_id: string): Query => ({
  endpoint: `tv/${series_id}`,
  method: "GET",
});
