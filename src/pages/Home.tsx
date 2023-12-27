import { useEffect, useState } from "react";
import { Movie, MovieList } from "../services/apiTypes";
import { getPopularMoviesList } from "../services/MoviesList/apiGetMoviesList";
import { callApi } from "../services/callApi";
import SmallMovieList from "../components/SmallComponents/List/SmallMovieList";

const Home = () => {
  const [moviesData, setMoviesData] = useState<Movie[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const popularMoviesData = await callApi<MovieList>({
          query: getPopularMoviesList("1"),
        });

        setMoviesData(popularMoviesData.results);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return <SmallMovieList title="Popular Movies" moviesData={moviesData} />;
};

export default Home;
