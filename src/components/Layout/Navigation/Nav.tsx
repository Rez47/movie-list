import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../SmallComponents/SearchBar/Searchbar";
import { Theme, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase";
import LogoutIcon from "@mui/icons-material/Logout";

const styles = (theme: Theme) => ({
  text: {
    mr: 2,
    display: { xs: "none", sm: "flex" },
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  },
  asd: {
    mr: 2,
    display: { xs: "flex", sm: "none" },
    flexGrow: 1,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    // color: theme.palette.primary.main,
    color: "inherit",
    textDecoration: "none",
  },
});

interface Pages {
  page: string;
  link: string;
}

const pages: Pages[] = [{ page: "Home", link: "/" }];
const settings: string[] = ["Profile", "Favorites", "Watch List"];

const Nav = () => {
  const theme = useTheme();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/auth/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            onClick={() => handleMenuItemClick("/")}
            sx={styles(theme).text}
          >
            MEDIALIST
          </Typography>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", sm: "none" },
                height: "auto",
                minHeight: "10rem",
              }}
            >
              {pages.map((content, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleMenuItemClick(content.link)}
                  sx={{ color: `${theme.palette.common.black}` }}
                >
                  <Typography textAlign="center">{content.page}</Typography>
                </MenuItem>
              ))}
              <Box sx={{ display: { xs: "block", sm: "none" } }}>
                <SearchBar
                  iconColor={`${theme.palette.common.black}`}
                  inputBackground={theme.palette.primary.main}
                  iconMargin="0 0 0 1.2rem"
                  inputMargin="0 1rem"
                />
              </Box>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", sm: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            onClick={() => handleMenuItemClick("/")}
            sx={styles(theme).asd}
          >
            MEDIALIST
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {pages.map((content, index) => (
              <Button
                key={index}
                onClick={() => handleMenuItemClick(content.link)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {content.page}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <SearchBar
              iconColor={`${theme.palette.common.white}`}
              inputBackground={theme.palette.customColors.trasparentGray}
              inputMargin="0 1rem 0 0"
              iconMargin="0 1rem 0 0 "
            />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Typography sx={{ color: `${theme.palette.common.white}` }}>
                  {currentUser ? currentUser.email : "PROFILE"}
                </Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={handleCloseUserMenu}
                  sx={{ color: `${theme.palette.common.black}` }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>

            <IconButton onClick={handleLogout} sx={{ p: 0 }}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
