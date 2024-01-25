import { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Typography, Stack, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { getDocument } from "../../helpers/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { callApi } from "../../services/callApi";
import { getMovieDetails } from "../../services/Movie/apiGetMovie";

const Favorites = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [favouritesData, setFavouritesData] = useState<string[]>([]);
  const [mediaData, setMediaData] = useState<any[]>([]);

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
        const mediaDataArray: any[] = [];

        await Promise.all(
          favouritesData.map(async (media: any) => {
            const movieData = await callApi({ query: getMovieDetails(media) });
            mediaDataArray.push(movieData);
          })
        );
        // console.log(mediaDataArray);
        setMediaData(mediaDataArray);
      }
    })();
  }, [favouritesData]);

  console.log(mediaData);
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
            xs: "repeat(auto-fit, minmax(120px, max-content))",
            md: "repeat(auto-fit, minmax(160px, max-content))",
          },
          gap: 2,
          mt: 2,
          justifyContent: "start",
          padding: "0 4rem",
        }}
      >
        {mediaData?.map((media) => (
          <Stack key={media.id} flexWrap="wrap">
            <Box
              width={170}
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
              <StarIcon />
              <Typography>{media.vote_average}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Layout>
  );
};

export default Favorites;
