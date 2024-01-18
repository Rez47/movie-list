import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout";
import { RootState } from "../../store/store";
import { Box, Typography, Stack, Link, Fade } from "@mui/material";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { useState } from "react";
import { removeFromFavorites } from "../../store/slices/userSlices";
import { useNavigate } from "react-router";

const Favorites = () => {
  const favorites = useSelector((state: RootState) => state.user.favorites);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromFavorites = (mediaIdToRemove: any) => {
    dispatch(removeFromFavorites({ id: mediaIdToRemove }));
  };

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
        {favorites.map((media) => (
          // <Link
          //   href={
          //     media.media_type === "tv"
          //       ? `/series/${media.id}`
          //       : `/movie/${media.id}`
          //   }
          //   style={{ textDecoration: "none", color: "inherit" }}
          // >
          <Box key={media.id} sx={{ cursor: "pointer" }}>
            <Box
              width={220}
              height={320}
              sx={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${media?.poster_path})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                objectFit: "contain",
                borderRadius: "0.5rem",
                position: "relative",

                "&:hover .hover-content": {
                  display: "flex",
                  transition: "500ms",
                },
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() =>
                navigate(
                  media.media_type === "tv"
                    ? `/series/${media.id}`
                    : `/movie/${media.id}`
                )
              }
            >
              <Fade in={isHovered} timeout={500}>
                <Box
                  className="hover-content"
                  sx={{
                    position: "absolute",
                    height: "4rem",
                    width: "100%",
                    background: "rgba(0, 0 , 0, 0.8)",
                    display: "none",
                    transition: "500ms",
                    bottom: 0,
                    padding: "0.7rem",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "0 0 0.5rem 0.5rem",
                  }}
                  style={{ transition: "500ms" }}
                  onClick={() => handleRemoveFromFavorites(media.id)}
                >
                  <Typography>Remove from favorites</Typography>
                  <NotInterestedIcon />
                </Box>
              </Fade>
            </Box>
            <Typography component="p" variant="body1">
              {media.title}
            </Typography>
            {/* Display other media details */}
          </Box>
          // </Link>
        ))}
      </Stack>
    </Layout>
  );
};

export default Favorites;
