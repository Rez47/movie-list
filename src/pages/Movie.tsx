import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../services/callApi";
import { Movie as MovieType } from "../services/apiTypes";
import { getMovieDetails } from "../services/Movie/apiGetMovie";
import {
  AlertColor,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import RemoveFromQueueIcon from "@mui/icons-material/RemoveFromQueue";
import Layout from "../Layout";
import { handleMediaFavorite } from "../helpers/functions";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Snackbar from "../components/MUIComponents/Snackbar";
import { getDocument } from "../helpers/firestore";
import { MediaData } from "../helpers/types";

const Movie = () => {
  const { id } = useParams();
  const theme = useTheme();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [movieData, setMoviesData] = useState<MovieType>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isWatchlist, setIsWatchlist] = useState<boolean>(false);
  const [favoritesData, setFavoritesData] = useState<boolean>(false);
  const [watchlistData, setWatchlistData] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarContent, setSnackbarContent] = useState<{
    message: string;
    severity: AlertColor;
  }>({
    message: "",
    severity: "success",
  });

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const movieDataCall = await callApi<MovieType>({
            query: getMovieDetails(id),
          });

          const favoritesData = await getDocument(
            "favourite",
            currentUser.email
          );

          const watchlistData = await getDocument(
            "watchlist",
            currentUser.email
          );

          if (movieDataCall) {
            setMoviesData(movieDataCall);
          }

          if (favoritesData) {
            setFavoritesData(favoritesData);
          }
          if (watchlistData) {
            setWatchlistData(watchlistData);
          }

          if (favoritesData) {
            console.log(favoritesData);
            const isThereFavoriteMediaId = favoritesData.findIndex(
              (item: any) => item.mediaId === id
            );
            console.log(isThereFavoriteMediaId);
            setIsFavorite(true ? isThereFavoriteMediaId !== -1 : false);
          }

          if (watchlistData) {
            const isThereWatchlistMediaId = watchlistData.findIndex(
              (item: any) => item.mediaId === id
            );

            setIsWatchlist(true ? isThereWatchlistMediaId !== -1 : false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id, currentUser]);

  const handleAddToFavorites = async () => {
    if (!movieData) return;

    const body: MediaData = {
      mediaId: movieData.id.toString(),
      mediaType: "movie",
    };

    await handleMediaFavorite(body, currentUser.email, "favourite").then(() => {
      setIsFavorite(!isFavorite);
      setSnackbarContent({
        message: isFavorite ? "Removed from favorites" : "Added to favorites",
        severity: "success",
      });
      setOpenSnackbar(true);
    });
  };

  const handleAddToWatchlist = async () => {
    if (!movieData) return;
    const body: MediaData = {
      mediaId: movieData.id.toString(),
      mediaType: "movie",
    };

    await handleMediaFavorite(body, currentUser.email, "watchlist").then(() => {
      setIsWatchlist(!isWatchlist);
      setSnackbarContent({
        message: isWatchlist ? "Removed from watchlist" : "Added to watchlist",
        severity: "success",
      });
      setOpenSnackbar(true);
    });
  };

  // TODO: moves styles on top
  // TODO: ? to ternery operator

  return (
    <>
      <Layout>
        {movieData && favoritesData && watchlistData ? (
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignContent="center"
              flexWrap={{ xs: "wrap", md: "nowrap" }}
              gap="2rem"
              marginTop="1rem"
              p={4}
              maxWidth="80%"
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
                    {isFavorite ? <NotInterestedIcon /> : <Favorite />}
                    <Typography
                      component="p"
                      variant="body1"
                      sx={{ maxWidth: "max-content" }}
                    >
                      {isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{ cursor: "pointer" }}
                    gap={1}
                    onClick={handleAddToWatchlist}
                  >
                    {isWatchlist ? <RemoveFromQueueIcon /> : <AddToQueueIcon />}
                    <Typography component="p" variant="body1">
                      {isWatchlist
                        ? "Remove from watchlist"
                        : "Add to watchlist"}
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
                  <Typography
                    component="span"
                    variant="body2"
                    style={{ color: theme.palette.common.white }}
                  >
                    Lenght:{" "}
                  </Typography>
                  {movieData?.runtime} minutes
                </Typography>
                <Typography component="p" variant="body2">
                  <Typography
                    component="span"
                    variant="body2"
                    style={{
                      color: `${theme.palette.common.white}`,
                      fontWeight: "600",
                    }}
                  >
                    Production Country:{" "}
                  </Typography>
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
                    {isFavorite ? <NotInterestedIcon /> : <Favorite />}
                    <Typography>
                      {isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{ cursor: "pointer" }}
                    gap={1}
                    alignItems="center"
                    onClick={handleAddToWatchlist}
                  >
                    {isWatchlist ? <RemoveFromQueueIcon /> : <AddToQueueIcon />}
                    <Typography>
                      {isWatchlist
                        ? "Remove from watchlist"
                        : "Add to watchlist"}
                    </Typography>
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
        ) : (
          <Stack
            justifyContent="center"
            alignItems="center"
            height="90vh"
            my="auto"
            gap={6}
          >
            <CircularProgress size="6rem" />
            <Typography component="h3" variant="h3">
              Fetching movie information...
            </Typography>
          </Stack>
        )}
      </Layout>
    </>
  );
};

export default Movie;
