import { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Typography, Stack } from "@mui/material";
import { getDocument } from "../../helpers/firestore";
import { Media } from "../../helpers/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Watchlist = () => {
  const [watchlistMediaData, setWatchlistMediaData] = useState<Media[]>([]);
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    (async () => {
      const watchlistMediaData = await getDocument(
        "watchlist",
        currentUser.email
      );

      if (watchlistMediaData) setWatchlistMediaData(watchlistMediaData);
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
        Watch List
      </Typography>
      <Stack gap={3}>
        {watchlistMediaData ? (
          <>
            {watchlistMediaData.map((media) => {
              if (watchlistMediaData.length > 0) {
                return <Typography key={media.id}>No Watchlist</Typography>;
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

export default Watchlist;
