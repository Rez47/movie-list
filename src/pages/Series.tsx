import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../services/callApi";
import { Series as SeriesType } from "../services/apiTypes";
import { getSeriesDetails } from "../services/Series/apiGetSeries";
import {
  AlertColor,
  Box,
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
import { useSelector } from "react-redux";
import { handleMediaFavorite } from "../helpers/functions";
import { getDocument } from "../helpers/firestore";
import Snackbar from "../components/MUIComponents/Snackbar";
import { RootState } from "../store/store";
import { MediaData } from "../helpers/types";

const Series = () => {
  const { id } = useParams();
  const [seriesData, setSeriesData] = useState<SeriesType>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isWatchlist, setIsWatchlist] = useState<boolean>(false);
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
    if (!seriesData) return;

    const body: MediaData = {
      mediaId: seriesData.id.toString(),
      mediaType: "tv",
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
    if (!seriesData) return;

    const body: MediaData = {
      mediaId: seriesData.id.toString(),
      mediaType: "tv",
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

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const seriesData = await callApi<SeriesType>({
            query: getSeriesDetails(id),
          });
          setSeriesData(seriesData);

          const favoritesData = await getDocument(
            "favourite",
            currentUser.email
          );

          const favoritesIndex = favoritesData.indexOf(id);

          setIsFavorite(favoritesIndex !== -1);

          const watchlistData = await getDocument(
            "watchlist",
            currentUser.email
          );

          const watchlistIndex = watchlistData.indexOf(id);

          setIsWatchlist(watchlistIndex !== -1);
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
            flexWrap={{ xs: "wrap", sm: "nowrap" }}
            gap="2rem"
            marginTop="1rem"
            p={4}
          >
            <Stack>
              <Box
                sx={{
                  padding: "1rem",
                  border: `0.2rem solid ${theme.palette.common.white}`,
                  borderRadius: "0.5rem",
                }}
              >
                <Box
                  width={250}
                  height={350}
                  sx={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${seriesData?.poster_path})`,
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
                    {isFavorite ? "Remove from favorites" : "Add to favorites"}
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
                    {isWatchlist ? "Remove from watchlist" : "Add to watchlist"}
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
                textAlign={{ xs: "center", sm: "start" }}
              >
                {seriesData?.original_name}
              </Typography>
              <Typography
                component="p"
                variant="body1"
                color={theme.palette.customColors.gold}
              >
                IMDb rating: {seriesData?.vote_average.toFixed(1)}
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
                {seriesData?.overview}
              </Typography>
              <Typography component="p" variant="body2">
                <span
                  style={{
                    color: `${theme.palette.common.white}`,
                    fontWeight: "600",
                  }}
                >
                  Number of Seasons:{" "}
                </span>
                {seriesData?.number_of_seasons}
              </Typography>
              <Typography component="p" variant="body2">
                <span
                  style={{
                    color: `${theme.palette.common.white}`,
                    fontWeight: "600",
                  }}
                >
                  Number of Episodes:{" "}
                </span>
                {seriesData?.number_of_episodes}
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
                {seriesData?.production_countries.map(
                  (country) => country.name
                )}
              </Typography>
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

export default Series;
