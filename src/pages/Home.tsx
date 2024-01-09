import { useEffect, useState } from "react";
import { Movie, MovieList, Series, SeriesList } from "../services/apiTypes";
import {
  getNowPlayingMoviesList,
  getPopularMoviesList,
} from "../services/MoviesList/apiGetMoviesList";
import { callApi } from "../services/callApi";
import SmallMovieList from "../components/SmallComponents/List/SmallMovieList";
import { getPopularSeriesList } from "../services/SeriesList/apiGetSeriesList";
import Layout from "../components/Layout/Layout";

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

        setPopularMoviesData(popularMoviesData.results);

        const popularSeriesData = await callApi<SeriesList>({
          query: getPopularSeriesList("1"),
        });
        setPopularSeriesData(popularSeriesData.results);

        const nowPlayingMoviesData = await callApi<MovieList>({
          query: getNowPlayingMoviesList("1"),
        });
        setNowPlayingMoviesData(nowPlayingMoviesData.results);
      } catch (err) {
        console.log(err);
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
