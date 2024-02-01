import {
  Box,
  Typography,
  Pagination,
  Stack,
  CircularProgress,
  Grid,
} from "@mui/material";
import {
  Movie,
  MovieList,
  Series,
  SeriesList,
} from "../../../services/apiTypes";
import MovieCard from "../Cards/MovieCard";
import { Dispatch, SetStateAction, useState } from "react";
import { callApi } from "../../../services/callApi";
import {
  getNowPlayingMoviesList,
  getPopularMoviesList,
} from "../../../services/MoviesList/apiGetMoviesList";
import SeriesCard from "../Cards/SeriesCard";
import { getPopularSeriesList } from "../../../services/SeriesList/apiGetSeriesList";

// SmallMovieList prop types
interface SmallMovieListProps {
  title: string;
  moviesData?: Movie[];
  setMoviesData?: Dispatch<SetStateAction<Movie[]>>;
  seriesData?: Series[];
  setSeriesData?: Dispatch<SetStateAction<Series[]>>;
  nowPlayingMoviesData?: Movie[];
  setNowPlayingMoviesData?: Dispatch<SetStateAction<Movie[]>>;
}

const styles = {
  listGrid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: {
      xs: "repeat(auto-fit, minmax(120px, max-content))",
      md: "repeat(auto-fit, minmax(160px, max-content))",
    },
    gap: 2,
    mt: 2,
    justifyContent: "center",
  },
};

const SmallMovieList: React.FC<SmallMovieListProps> = ({
  title,
  moviesData,
  setMoviesData,
  seriesData,
  setSeriesData,
  nowPlayingMoviesData,
  setNowPlayingMoviesData,
}) => {
  const [moviesPage, setMoviesPage] = useState<number>(1);
  const [seriesPage, setSeriesPage] = useState<number>(1);
  const movieType = moviesData
    ? "popular"
    : nowPlayingMoviesData
    ? "nowPlaying"
    : "popular";

  //API calls for the movie lists
  const handleMoviesPageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (moviesPage === value) return;

    setMoviesPage(value);
    if (value) {
      try {
        const getMoviesData = await callApi<MovieList>({
          query:
            movieType === "popular"
              ? getPopularMoviesList(value.toString())
              : movieType === "nowPlaying"
              ? getNowPlayingMoviesList(value.toString())
              : getPopularMoviesList(value.toString()),
        });

        if (moviesData && setMoviesData) {
          setMoviesData(getMoviesData.results);
        } else if (nowPlayingMoviesData && setNowPlayingMoviesData) {
          setNowPlayingMoviesData(getMoviesData.results);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // API calls for the series lists
  const handleSeriesPageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (seriesPage === value) return;
    setSeriesPage(value);
    if (value && seriesData && setSeriesData) {
      try {
        const popularSeriesData = await callApi<SeriesList>({
          query: getPopularSeriesList(value.toString()),
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
      {/* List Grid */}
      <Grid sx={styles.listGrid}>
        {moviesData && (
          <>
            {moviesData.length > 0 &&
              moviesData.map((movieData) => {
                return <MovieCard movieData={movieData} />;
              })}
            {moviesData.length === 0 && (
              <Stack
                height="100%"
                gap={6}
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress
                  size="4rem"
                  thickness={5}
                  sx={{ animationDuration: "200ms" }}
                />{" "}
                <Typography component="h3" variant="h3">
                  Loading...
                </Typography>
              </Stack>
            )}
          </>
        )}
        {nowPlayingMoviesData && (
          <>
            {nowPlayingMoviesData.length > 0 &&
              nowPlayingMoviesData.map((movieData) => {
                return <MovieCard movieData={movieData} />;
              })}
            {nowPlayingMoviesData.length === 0 && (
              <Stack
                height="100%"
                gap={6}
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress
                  size="4rem"
                  thickness={5}
                  sx={{ animationDuration: "200ms" }}
                />{" "}
                <Typography component="h3" variant="h3">
                  Loading...
                </Typography>
              </Stack>
            )}
          </>
        )}
      </Grid>

      {seriesData && (
        <Grid sx={styles.listGrid}>
          {seriesData.length > 0 &&
            seriesData.map((seriesData) => {
              return <SeriesCard seriesData={seriesData} />;
            })}
          {seriesData.length === 0 && (
            <Stack
              height="100%"
              gap={6}
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress
                size="4rem"
                thickness={5}
                sx={{ animationDuration: "200ms" }}
              />{" "}
              <Typography component="h3" variant="h3">
                Loading...
              </Typography>
            </Stack>
          )}
        </Grid>
      )}
      <Stack spacing={2} justifyContent="center" alignItems="center" mt={4}>
        <Pagination
          count={15}
          variant="outlined"
          shape="rounded"
          onChange={
            moviesData || nowPlayingMoviesData
              ? handleMoviesPageChange
              : handleSeriesPageChange
          }
          page={moviesData || nowPlayingMoviesData ? moviesPage : seriesPage}
        />
      </Stack>
    </Box>
  );
};

export default SmallMovieList;
