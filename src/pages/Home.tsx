import { useEffect, useState } from "react";
import { Movie, MovieList, Series, SeriesList } from "../services/apiTypes";
import { getPopularMoviesList } from "../services/MoviesList/apiGetMoviesList";
import { callApi } from "../services/callApi";
import SmallMovieList from "../components/SmallComponents/List/SmallMovieList";
import { getPopularSeriesList } from "../services/SeriesList/apiGetSeriesList";

const Home = () => {
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [seriesData, setSeriesData] = useState<Series[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const popularMoviesData = await callApi<MovieList>({
          query: getPopularMoviesList("1"),
        });

        setMoviesData(popularMoviesData.results);

        const popularSeriesData = await callApi<SeriesList>({
          query: getPopularSeriesList("1"),
        });
        setSeriesData(popularSeriesData.results);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <SmallMovieList
        title="Popular Movies"
        moviesData={moviesData}
        setMoviesData={setMoviesData}
      />
      <SmallMovieList
        title="Popular Series"
        seriesData={seriesData}
        setSeriesData={setSeriesData}
      />
    </>
  );
};

export default Home;
