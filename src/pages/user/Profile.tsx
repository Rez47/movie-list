import { Avatar, Box, Container, Link, Typography } from "@mui/material";
import Layout from "../../Layout";
import theme from "../../theme";

const Profile = () => {
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
        <Box
          width={"80%"}
          display="flex"
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={4}
          sx={{ backgroundColor: theme.palette.secondary.dark, py: "4rem" }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={4}>
            <Avatar
              sx={{
                maxwidth: 200,
                maxheight: 400,
                backgroundColor: theme.palette.secondary.light,
                objectFit: "fill",
              }}
            />
            <Typography textAlign={"center"}>Name Of The Profile</Typography>
          </Box>

          <Box>
            <Typography component="h2" variant="h2" mb={2}>
              Profile stats:
            </Typography>

            <Box>
              <Typography>Number of liked media: N/a</Typography>
              <Typography>Number of media in watch list: N/a</Typography>
            </Box>

            <Box display={"flex"} flexDirection={"column"} gap={1} mt={6}>
              <Link href="./favorites">Favorites</Link>
              <Link href="./watchlist">Watchlist</Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Profile;
