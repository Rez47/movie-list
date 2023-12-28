import { Box, Typography, Pagination, Stack } from "@mui/material";
import {
  Movie,
  MovieList,
  Series,
  SeriesList,
} from "../../../services/apiTypes";
import MovieCard from "../Cards/MovieCard";
import { Dispatch, SetStateAction, useState } from "react";
import { callApi } from "../../../services/callApi";
import { getPopularMoviesList } from "../../../services/MoviesList/apiGetMoviesList";
import SeriesCard from "../Cards/SeriesCard";
import { getPopularSeriesList } from "../../../services/SeriesList/apiGetSeriesList";

interface SmallMovieListProps {
  title: string;
  moviesData?: Movie[];
  setMoviesData?: Dispatch<SetStateAction<Movie[]>>;
  seriesData?: Series[];
  setSeriesData?: Dispatch<SetStateAction<Series[]>>;
}

const SmallMovieList: React.FC<SmallMovieListProps> = ({
  title,
  moviesData,
  setMoviesData,
  seriesData,
  setSeriesData,
}) => {
  const [moviesPage, setMoviesPage] = useState<number>(1);
  const [seriesPage, setSeriesPage] = useState<number>(1);

  const handleMoviesPageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (moviesPage === value) return;
    setMoviesPage(value);
    if (moviesPage && moviesData && setMoviesData) {
      try {
        const popularMoviesData = await callApi<MovieList>({
          query: getPopularMoviesList(moviesPage.toString()),
        });

        setMoviesData(popularMoviesData.results);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSeriesPageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (seriesPage === value) return;
    setSeriesPage(value);
    if (seriesPage && seriesData && setSeriesData) {
      try {
        const popularSeriesData = await callApi<SeriesList>({
          query: getPopularSeriesList(seriesPage.toString()),
        });

        setSeriesData(popularSeriesData.results);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Box p={5}>
      <Typography component="h2" variant="h2">
        {title}
      </Typography>
      {moviesData && (
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, max-content))",
            gap: 2,
            mt: 2,
            justifyContent: "center",
          }}
        >
          {moviesData.length > 0 &&
            moviesData.map((movieData) => {
              return <MovieCard movieData={movieData} />;
            })}
        </Box>
      )}
      {seriesData && (
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, max-content))",
            gap: 2,
            mt: 2,
            justifyContent: "center",
          }}
        >
          {seriesData.length > 0 &&
            seriesData.map((seriesData) => {
              return <SeriesCard seriesData={seriesData} />;
            })}
        </Box>
      )}
      <Stack spacing={2} justifyContent="center" alignItems="center" mt={4}>
        <Pagination
          count={15}
          variant="outlined"
          shape="rounded"
          onChange={
            moviesData ? handleMoviesPageChange : handleSeriesPageChange
          }
          page={moviesData ? moviesPage : seriesPage}
        />
      </Stack>
    </Box>
  );
};

export default SmallMovieList;
