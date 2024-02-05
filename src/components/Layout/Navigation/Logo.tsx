import { Box, Link, Stack, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";

const Logo = () => {
  return (
    <Box>
      <Link href="/" sx={{ textDecoration: "none" }}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Box
            component="image"
            sx={{
              backgroundImage: "url(./Logo1.svg)",
              width: "2rem",
              height: "2rem",
              backgroundSize: "contain",
              mx: "2rem",
              ml: { xs: "2rem", sm: "4rem" },
            }}
          ></Box>
          <Typography
            variant="h3"
            noWrap
            component="a"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            MEDIALIST
          </Typography>
        </Stack>
      </Link>
    </Box>
  );
};

export default Logo;
