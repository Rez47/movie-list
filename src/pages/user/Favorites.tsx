import { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Typography, Stack, Box, Link, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { getDocument } from "../../helpers/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { callApi } from "../../services/callApi";
import { getMovieDetails } from "../../services/Movie/apiGetMovie";
import { getSeriesDetails } from "../../services/Series/apiGetSeries";
import { Movie, Series } from "../../services/apiTypes";
import { motion } from "framer-motion";
import theme from "../../theme";

const styles = {
  listGrid: {
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
  },
  mediaImage: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "5px",
    marginBottom: 1,
    aspectRatio: 4 / 6,
  },
  mediaListTitle: {
    pb: "1rem",
    pr: "2rem",
    borderBottom: `0.2rem solid ${theme.palette.grey[800]}`,
    maxWidth: "max-content",
  },
};

const Favorites = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [favouritesMediaData, setFavouritesMediaData] = useState<string[]>([]);
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [seriesData, setSeriesData] = useState<Series[]>([]);
  console.log(favouritesMediaData);

  useEffect(() => {
    (async () => {
      const favouriteMediaData: string[] = await getDocument(
        "favourite",
        currentUser.email
      );

      if (favouriteMediaData) setFavouritesMediaData(favouriteMediaData);
    })();
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      if (favouritesMediaData) {
        const moviesData: any[] = [];
        const seriesData: any[] = [];

        await Promise.all(
          favouritesMediaData.map(async (media: any) => {
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
  }, [favouritesMediaData]);

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
      {/* Watchlist for movies */}
      {seriesData &&
      moviesData &&
      favouritesMediaData &&
      favouritesMediaData.length !== 0 ? (
        <motion.div
          key="watchlist"
          initial={{ opacity: 0, x: "-100vw" }}
          animate={{ opacity: 1, x: "0vw" }}
          transition={{ duration: 1 }}
        >
          <Stack gap="2rem" p="2rem 4rem">
            <Box sx={styles.mediaListTitle}>
              <Typography component="h3" variant="h3">
                Favorite Movies
              </Typography>
            </Box>
            <Grid gap={3} flexWrap="wrap" sx={styles.listGrid}>
              {moviesData.map((media) => (
                <Link href={`/movie/${media.id}`}>
                  <Stack
                    key={media.id}
                    flexWrap="wrap"
                    width={160}
                    justifyContent="space-between"
                  >
                    <Box
                      width={160}
                      sx={{
                        ...styles.mediaImage,
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${media.poster_path})`,
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
                </Link>
              ))}
            </Grid>

            {/* Watchlist for series */}
            <Box sx={styles.mediaListTitle}>
              <Typography component="h3" variant="h3">
                Favorite Series
              </Typography>
            </Box>

            <Grid gap={3} flexWrap="wrap" sx={styles.listGrid}>
              {seriesData.map((media) => (
                <Link href={`/series/${media.id}`}>
                  <Stack
                    key={media.id}
                    flexWrap="wrap"
                    width={160}
                    justifyContent="space-between"
                  >
                    <Box
                      width={160}
                      sx={{
                        ...styles.mediaImage,
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${media.poster_path})`,
                      }}
                    />
                    <Typography>{media.name}</Typography>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>
                        {media.first_air_date.slice(0, 4)}
                      </Typography>
                      <Stack direction="row" gap={1} justifyContent="center">
                        <StarIcon sx={{ fontSize: "1.4rem" }} />
                        <Typography>{media.vote_average.toFixed(1)}</Typography>
                      </Stack>
                      <Typography>Series</Typography>
                    </Stack>
                  </Stack>
                </Link>
              ))}
            </Grid>
          </Stack>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            component="h3"
            variant="h3"
            textAlign="center"
            padding="2rem 4rem"
          >
            Your favorites are empty
          </Typography>
        </motion.div>
      )}
    </Layout>
  );
};

export default Favorites;
