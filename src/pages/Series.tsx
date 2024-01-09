import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../services/callApi";
import { Series as SeriesType } from "../services/apiTypes";
import { getSeriesDetails } from "../services/Series/apiGetSeries";
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import Layout from "../components/Layout/Layout";

const Series = () => {
  const { id } = useParams();
  const [seriesData, setSeriesData] = useState<SeriesType>();
  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const seriesData = await callApi<SeriesType>({
            query: getSeriesDetails(id),
          });
          setSeriesData(seriesData);
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
            flexWrap={{ xs: "wrap", sm: "nowrap" }}
            gap="2rem"
            marginTop="1rem"
          >
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
        </Container>
      </Layout>
    </>
  );
};

export default Series;
