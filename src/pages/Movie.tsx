import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../services/callApi";
import { Movie as MovieType } from "../services/apiTypes";
import { getMovieDetails } from "../services/Movie/apiGetMovie";
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import Layout from "../Layout";
import Favorite from "@mui/icons-material/Favorite";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import { useDispatch } from "react-redux";
import { addToFavorites, addToWatchlist } from "../store/slices/userSlices";

const Movie = () => {
  const { id } = useParams();
  const [movieData, setMoviesData] = useState<MovieType>();
  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(movieData));
  };

  const handleAddToWatchlist = () => {
    dispatch(addToWatchlist(movieData));
  };

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const movieData = await callApi<MovieType>({
            query: getMovieDetails(id),
          });
          console.log(movieData);
          setMoviesData(movieData);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  const theme = useTheme();
  return (
    <>
      <Layout>
        <Container>
          <Stack
            direction="row"
            justifyContent="center"
            alignContent="center"
            flexWrap={{ xs: "wrap", md: "nowrap" }}
            gap="2rem"
            marginTop="1rem"
            p={4}
          >
            <Stack direction="column">
              <Box
                sx={{
                  padding: "1rem",
                  border: `0.2rem solid ${theme.palette.common.white}`,
                  borderRadius: "0.5rem",
                }}
              >
                <Box
                  width={220}
                  height={320}
                  sx={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData?.poster_path})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    objectFit: "contain",
                    borderRadius: "0.5rem",
                  }}
                ></Box>
              </Box>

              <Stack
                direction="column"
                px={2}
                py={4}
                display={{ xs: "none", md: "flex" }}
                gap={2}
                alignItems="center"
              >
                <Stack
                  direction="row"
                  sx={{ cursor: "pointer" }}
                  gap={1}
                  onClick={handleAddToFavorites}
                >
                  <Favorite />
                  <Typography
                    component="p"
                    variant="body1"
                    sx={{ maxWidth: "max-content" }}
                  >
                    Add to favorites
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  sx={{ cursor: "pointer" }}
                  gap={1}
                  onClick={handleAddToWatchlist}
                >
                  <AddToQueueIcon />
                  <Typography component="p" variant="body1">
                    Add to watchlist
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <Stack
              gap="1rem"
              sx={{
                paddingBottom: "1rem",
              }}
            >
              <Typography
                component="h1"
                variant="h1"
                textAlign={{ xs: "center", md: "start" }}
              >
                {movieData?.original_title}
              </Typography>
              <Typography
                component="p"
                variant="body1"
                color={theme.palette.customColors.gold}
              >
                IMDb rating: {movieData?.vote_average.toFixed(1)}
              </Typography>
              <Typography
                textAlign="left"
                component="h3"
                variant="h3"
                sx={{
                  borderTop: `0.2rem solid ${theme.palette.common.white}`,
                  paddingTop: "1rem",
                  maxWidth: "max-content",
                }}
              >
                Overview:
              </Typography>
              <Typography component="p" variant="body2">
                {movieData?.overview}
              </Typography>
              <Typography component="p" variant="body2">
                <span style={{ color: theme.palette.common.white }}>
                  Lenght:{" "}
                </span>
                {movieData?.runtime} minutes
              </Typography>
              <Typography component="p" variant="body2">
                <span
                  style={{
                    color: `${theme.palette.common.white}`,
                    fontWeight: "600",
                  }}
                >
                  Production Country:{" "}
                </span>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap={1}
                  flexWrap="wrap"
                >
                  {movieData?.production_countries.map(
                    (country, index, array) => (
                      <Typography
                        key={`${index}-${country.name}`}
                        component="p"
                        variant="body2"
                      >
                        {country.name}
                        {index < array.length - 1 && ","}
                      </Typography>
                    )
                  )}
                  ;
                </Stack>
              </Typography>
              <Stack
                direction="row"
                px={2}
                py={4}
                display={{ xs: "flex", md: "none" }}
                gap={6}
                alignItems="center"
                justifyContent="center"
              >
                <Stack
                  direction="row"
                  sx={{ cursor: "pointer" }}
                  gap={1}
                  alignItems="center"
                  onClick={handleAddToFavorites}
                >
                  <Favorite />
                  <Typography>Add to favorites</Typography>
                </Stack>
                <Stack
                  direction="row"
                  sx={{ cursor: "pointer" }}
                  gap={1}
                  alignItems="center"
                  onClick={handleAddToWatchlist}
                >
                  <AddToQueueIcon />
                  <Typography>Add to watchlist</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Layout>
    </>
  );
};

export default Movie;
