import { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Typography, Stack, Box, Link, Container, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { getDocument } from "../../helpers/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getMovieDetails } from "../../services/Movie/apiGetMovie";
import { getSeriesDetails } from "../../services/Series/apiGetSeries";
import { callApi } from "../../services/callApi";
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

const Watchlist = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [watchlistMediaData, setWatchlistMediaData] = useState<string[]>();
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [seriesData, setSeriesData] = useState<Series[]>([]);

  useEffect(() => {
    (async () => {
      const watchlistMediaData = await getDocument(
        "watchlist",
        currentUser.email
      );

      if (watchlistMediaData) setWatchlistMediaData(watchlistMediaData);
      console.log(watchlistMediaData);
    })();
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      if (watchlistMediaData) {
        const moviesData: any[] = [];
        const seriesData: any[] = [];

        await Promise.all(
          watchlistMediaData.map(async (media: any) => {
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
  }, [watchlistMediaData]);

  return (
    <Layout>
      <Container
        sx={{
          p: "1rem 0",
        }}
      >
        <Typography
          component="h2"
          variant="h2"
          textAlign="center"
          p="2rem 4rem"
        >
          Watchlist
        </Typography>
        {/* Watchlist for movies */}
        {seriesData &&
        moviesData &&
        watchlistMediaData &&
        watchlistMediaData.length !== 0 ? (
          <motion.div
            key="watchlist"
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: "0vw" }}
            transition={{ duration: 1 }}
          >
            <Stack gap="2rem" p="2rem 4rem">
              <Box sx={styles.mediaListTitle}>
                <Typography component="h3" variant="h3">
                  Movies to watch
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
                        <Typography>
                          {media.release_date.slice(0, 4)}
                        </Typography>
                        <Stack direction="row" gap={1} justifyContent="center">
                          <StarIcon sx={{ fontSize: "1.4rem" }} />
                          <Typography>
                            {media.vote_average.toFixed(1)}
                          </Typography>
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
                  Series to watch
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
                          <Typography>
                            {media.vote_average.toFixed(1)}
                          </Typography>
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
              Your watchlist is empty
            </Typography>
          </motion.div>
        )}
      </Container>
    </Layout>
  );
};

export default Watchlist;
