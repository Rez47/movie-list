import { Box, Link, Stack, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";

const Logo = () => {
  return (
    <Box sx={{ ml: "2rem" }}>
      <Link href="/" sx={{ textDecoration: "none" }}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <AdbIcon sx={{ mr: 1 }} />
          <Typography
            variant="h5"
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
