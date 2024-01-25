import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../services/callApi";
import { Movie as MovieType } from "../services/apiTypes";
import { getMovieDetails } from "../services/Movie/apiGetMovie";
import {
  AlertColor,
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Layout from "../Layout";
import Favorite from "@mui/icons-material/Favorite";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import { handleMediaFavorite } from "../helpers/functions";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Snackbar from "../components/MUIComponents/Snackbar";
import { getDocument } from "../helpers/firestore";

const Movie = () => {
  const { id } = useParams();
  const [movieData, setMoviesData] = useState<MovieType>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarContent, setSnackbarContent] = useState<{
    message: string;
    severity: AlertColor;
  }>({
    message: "",
    severity: "success",
  });

  const handleAddToFavorites = async () => {
    if (!movieData) return;
    await handleMediaFavorite(
      movieData.id.toString(),
      currentUser.email,
      "favourite"
    ).then(() => {
      setIsFavorite(!isFavorite);
      setSnackbarContent({
        message: isFavorite ? "Remove from favorites" : "Added to favorites",
        severity: "success",
      });
      setOpenSnackbar(true);
    });
  };

  const handleAddToWatchlist = async () => {
    if (!movieData) return;
    await handleMediaFavorite(
      movieData.id.toString(),
      currentUser.email,
      "watchlist"
    ).then(() => {
      setSnackbarContent({
        message: "Added to favorites",
        severity: "success",
      });
      setOpenSnackbar(true);
    });
  };

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const movieData = await callApi<MovieType>({
            query: getMovieDetails(id),
          });
          setMoviesData(movieData);

          const favoritesData = await getDocument(
            "favourite",
            currentUser.email
          );

          const index = favoritesData.indexOf(id);

          if (index === -1) {
            setIsFavorite(false);
          } else {
            setIsFavorite(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id, currentUser]);

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
                    {isFavorite ? "Remove from favorites" : "Add to favorites"}
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

          <Snackbar
            message={snackbarContent.message}
            severity={snackbarContent.severity}
            open={openSnackbar}
            setOpen={setOpenSnackbar}
          />
        </Container>
      </Layout>
    </>
  );
};

export default Movie;
