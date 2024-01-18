import { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Typography, Stack } from "@mui/material";
import { getDocument } from "../../helpers/firestore";
import { Media } from "../../helpers/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Favorites = () => {
  const [favouriteMediaData, setFavouriteMediaData] = useState<Media[]>([]);
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    (async () => {
      const favouriteMediaData = await getDocument(
        "favourite",
        currentUser.email
      );

      if (favouriteMediaData) setFavouriteMediaData(favouriteMediaData);
    })();
  }, [currentUser]);

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
        {favouriteMediaData ? (
          <>
            {favouriteMediaData.map((media) => {
              if (favouriteMediaData.length === 0) {
                return <Typography key={media.id}>No movies</Typography>;
              }
              return <Typography key={media.id}>{media.id}</Typography>;
            })}
          </>
        ) : (
          "Loading..."
        )}
      </Stack>
    </Layout>
  );
};

export default Favorites;
