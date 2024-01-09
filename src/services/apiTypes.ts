export type Query = {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  variables?: { [key: string]: any };
  input?: string;
};

export type CallApiParams = {
  query: Query;
};

export type MovieList = {
  dates?: object;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: number;
  production_countries: { iso_3166_1: string; name: string }[];
};

export type SeriesList = {
  page: number;
  results: Series[];
  total_pages: number;
  total_results: number;
};

export type Series = {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  number_of_seasons: number;
  number_of_episodes: number;
  production_countries: { iso_3166_1: string; name: string }[];
};

export type SearchList = {
  page: number;
  results: SearchResults[];
  total_pages: number;
  total_results: number;
};

export type SearchResults = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
