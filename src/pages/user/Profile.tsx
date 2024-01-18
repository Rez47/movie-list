import { Avatar, Box, Container, Link, Typography } from "@mui/material";
import Layout from "../../Layout";
import theme from "../../theme";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Stack } from "@mui/system";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  console.log(user);
  return (
    <Layout>
      <Container
        sx={{
          width: "100%",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          width={"80%"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={4}
          sx={{ backgroundColor: theme.palette.secondary.dark, py: "4rem" }}
        >
          <Stack
            flexDirection={"column"}
            gap={8}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Avatar
              sx={{
                maxwidth: 200,
                maxheight: 400,
                backgroundColor: theme.palette.secondary.light,
                objectFit: "fill",
              }}
            />
            <Typography textAlign={"center"}>
              {user ? user.email : ""}
            </Typography>
          </Stack>

          <Box>
            <Typography component="h2" variant="h2" mb={2}>
              Profile stats:
            </Typography>

            <Box>
              <Typography>Number of liked media: N/a</Typography>
              <Typography>Number of media in watch list: N/a</Typography>
            </Box>

            <Box display={"flex"} flexDirection={"column"} gap={1} mt={6}>
              <Link href="./favorites" sx={{ maxWidth: "max-content" }}>
                Favorites
              </Link>
              <Link href="./watchlist" sx={{ maxWidth: "max-content" }}>
                Watchlist
              </Link>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Layout>
  );
};

export default Profile;
