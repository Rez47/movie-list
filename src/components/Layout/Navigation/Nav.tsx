import { AppBar, Link, Stack, Button } from "@mui/material/";
import SearchBar from "../../SmallComponents/SearchBar/Searchbar";
import { useTheme } from "@mui/material";
import Drawer from "./Drawer";
import Logo from "./Logo";
import ProfileDropDown from "../../PageComponents/Profile/ProfileDropDown";
import { headerPages } from "./pages";
const Nav = () => {
  const theme = useTheme();

  return (
    <AppBar position="static">
      <Stack
        direction="row"
        alignItems="center"
        display={{ xs: "none", sm: "flex" }}
      >
        <Logo />

        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          flexGrow={1}
        >
          {headerPages.map((page, index) => (
            <Link key={index} href={page.link}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                {page.page}
              </Button>
            </Link>
          ))}
        </Stack>

        <SearchBar
          iconColor={`${theme.palette.common.white}`}
          inputBackground={theme.palette.customColors.trasparentGray}
          inputMargin="0 1rem 0 0"
          iconMargin="0 1rem 0 0 "
        />

        <ProfileDropDown />
      </Stack>

      <Stack
        direction="row"
        display={{ sm: "none" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Drawer />

        <Logo />

        <ProfileDropDown />
      </Stack>
    </AppBar>
  );
};
export default Nav;
