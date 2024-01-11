import { AppBar, Box, Button, Link } from "@mui/material/";

import SearchBar from "../../SmallComponents/SearchBar/Searchbar";
import { useTheme } from "@mui/material";

import Settings from "./Settings";
import Drawer from "./Drawer";
import Logo from "./Logo";

interface Pages {
  page: string;
  link: string;
}
const pages: Pages[] = [{ page: "Home", link: "/" }];

const Nav = () => {
  const theme = useTheme();

  return (
    <AppBar position="static">
      <Box sx={{ display: { xs: "none", sm: "flex", alignItems: "center" } }}>
        <Box sx={{ ml: "2rem" }}>
          <Logo />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          {pages.map((content, index) => (
            <Button
              key={index}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link href={content.link}>{content.page}</Link>
            </Button>
          ))}
        </Box>

        <Box>
          <SearchBar
            iconColor={`${theme.palette.common.white}`}
            inputBackground={theme.palette.customColors.trasparentGray}
            inputMargin="0 1rem 0 0"
            iconMargin="0 1rem 0 0 "
          />
        </Box>
        <Settings />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: { xs: "flex", sm: "none" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Drawer />

        <Box sx={{}}>
          <Logo />
        </Box>

        <Settings />
      </Box>
    </AppBar>
  );
};
export default Nav;
