import { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Typography, Stack, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { getDocument } from "../../helpers/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { callApi } from "../../services/callApi";
import { getMovieDetails } from "../../services/Movie/apiGetMovie";
import { getSeriesDetails } from "../../services/Series/apiGetSeries";
import { Movie, Series } from "../../services/apiTypes";

const Favorites = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [favouritesData, setFavouritesData] = useState<string[]>([]);
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [seriesData, setSeriesData] = useState<Series[]>([]);

  useEffect(() => {
    (async () => {
      const favouriteMediaData: string[] = await getDocument(
        "favourite",
        currentUser.email
      );

      if (favouriteMediaData) setFavouritesData(favouriteMediaData);
    })();
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      if (favouritesData) {
        const moviesData: any[] = [];
        const seriesData: any[] = [];

        await Promise.all(
          favouritesData.map(async (media: any) => {
            if (media.mediaType === "movie") {
              const movieData = await callApi({
                query: getMovieDetails(media.mediaId),
              });
              moviesData.push(movieData);
            } else if (media.mediaType === "tv") {
              const tvData = await callApi({
                query: getSeriesDetails(media.mediaId),
              });
              seriesData.push(tvData);
            }
          })
        );

        setMoviesData(moviesData);
        setSeriesData(seriesData);
      }
    })();
  }, [favouritesData]);

  // TODO: display no data if both movies and series are empty / show only movies or series if other empty / show both if not empty
  // TODO: styles on top
  // TODO: line 72 Grid in Stack
  // TODO: where ? move to terney operator

  return (
    <Layout>
      <Typography
        component="h2"
        variant="h2"
        textAlign="center"
        padding="2rem 4rem"
      >
        Favorites
      </Typography>
      <Stack
        gap={3}
        flexWrap="wrap"
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(auto-fit, minmax(170px, max-content))",
            md: "repeat(auto-fit, minmax(170px, max-content))",
          },
          gap: 2,
          mt: 2,
          justifyContent: "center",
          padding: "0 2rem",
        }}
      >
        {moviesData?.map((media) => (
          <Stack
            key={media.id}
            flexWrap="wrap"
            width={160}
            justifyContent="space-between"
          >
            <Box
              width={160}
              sx={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${media.poster_path})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "5px",
                marginBottom: 1,
                aspectRatio: 4 / 6,
              }}
            />
            <Typography>{media.title}</Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography>{media.release_date.slice(0, 4)}</Typography>
              <Stack direction="row" gap={1} justifyContent="center">
                <StarIcon sx={{ fontSize: "1.4rem" }} />
                <Typography>{media.vote_average.toFixed(1)}</Typography>
              </Stack>
              <Typography>Movie</Typography>
            </Stack>
          </Stack>
        ))}

        {seriesData?.map((media) => (
          <Stack
            key={media.id}
            flexWrap="wrap"
            width={160}
            justifyContent="space-between"
          >
            <Box
              width={160}
              sx={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${media.poster_path})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "5px",
                marginBottom: 1,
                aspectRatio: 4 / 6,
              }}
            />
            <Typography>{media.name}</Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography>{media.first_air_date.slice(0, 4)}</Typography>
              <Stack direction="row" gap={1} justifyContent="center">
                <StarIcon sx={{ fontSize: "1.4rem" }} />
                <Typography>{media.vote_average.toFixed(1)}</Typography>
              </Stack>
              <Typography>Series</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Layout>
  );
};

export default Favorites;
