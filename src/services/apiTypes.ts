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
};

export type SeriesList = {
  page: number;
  results: any;
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
};
