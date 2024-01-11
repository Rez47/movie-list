import { Box, Link, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";

const Logo = () => {
  return (
    <>
      <Link href="/" sx={{ textDecoration: "none" }}>
        <Box display="flex" justifyContent="center" alignItems="center">
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
        </Box>
      </Link>
    </>
  );
};

export default Logo;
