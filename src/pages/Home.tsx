import { useEffect, useState } from "react";
import { Movie, MovieList, Series, SeriesList } from "../services/apiTypes";
import {
  getNowPlayingMoviesList,
  getPopularMoviesList,
} from "../services/MoviesList/apiGetMoviesList";
import { callApi } from "../services/callApi";
import SmallMovieList from "../components/SmallComponents/List/SmallMovieList";
import { getPopularSeriesList } from "../services/SeriesList/apiGetSeriesList";
import Layout from "../Layout";

const Home = () => {
  const [popularMoviesData, setPopularMoviesData] = useState<Movie[]>([]);
  const [popularSeriesData, setPopularSeriesData] = useState<Series[]>([]);
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState<Movie[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const popularMoviesData = await callApi<MovieList>({
          query: getPopularMoviesList("1"),
        });

        const popularSeriesData = await callApi<SeriesList>({
          query: getPopularSeriesList("1"),
        });

        const nowPlayingMoviesData = await callApi<MovieList>({
          query: getNowPlayingMoviesList("1"),
        });

        setPopularMoviesData(popularMoviesData.results);

        setPopularSeriesData(popularSeriesData.results);

        setNowPlayingMoviesData(nowPlayingMoviesData.results);
      } catch (err) {
        // setShowAlert(true);
        // setAlert({
        //   message: "There was a problem fetching movies",
        //   severity: "info",
        // });
        console.log(err);
        throw new Error("There was a problem fetching movies: " + err);
      }
    })();
  }, []);

  return (
    <>
      <Layout>
        <SmallMovieList
          title="Popular Movies"
          moviesData={popularMoviesData}
          setMoviesData={setPopularMoviesData}
        />
        <SmallMovieList
          title="Popular Series"
          seriesData={popularSeriesData}
          setSeriesData={setPopularSeriesData}
        />
        <SmallMovieList
          title="Now Playing on Cinema"
          nowPlayingMoviesData={nowPlayingMoviesData}
          setNowPlayingMoviesData={setNowPlayingMoviesData}
        />
      </Layout>
    </>
  );
};

export default Home;
