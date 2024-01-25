import { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Typography, Stack } from "@mui/material";
import { getDocument } from "../../helpers/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { callApi } from "../../services/callApi";
import { getMovieDetails } from "../../services/Movie/apiGetMovie";

const Favorites = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [favouritesData, setFavouritesData] = useState<string[]>();
  const [mediaData, setMediaData] = useState<any[]>();

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
        let mediaDataArray: any[] = [];

        favouritesData.map(async (media: any) => {
          const movieData = await callApi({ query: getMovieDetails(media) });

          mediaDataArray.push(movieData);
        });

        setMediaData(mediaDataArray);
      }
    })();
  }, [favouritesData]);

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
      <Stack gap={3}>
        {mediaData?.map((media) => (
          <p key={media.id}>{media.title}</p>
        ))}
      </Stack>
    </Layout>
  );
};

export default Favorites;
