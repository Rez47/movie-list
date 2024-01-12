import { useState } from "react";
import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "../../SmallComponents/SearchBar/Searchbar";
import theme from "../../../theme";
import { headerPages } from "./pages";

const Drawer = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuItemClick = () => {
    handleCloseNavMenu();
  };

  return (
    <Box>
      <IconButton size="large" onClick={handleOpenNavMenu}>
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
          minHeight: "10rem",
        }}
      >
        {headerPages.map((page, index) => (
          <Link href={page.link}>
            <MenuItem
              key={index}
              onClick={() => handleMenuItemClick()}
              sx={{ color: `${theme.palette.common.black}` }}
            >
              <Typography textAlign="center">{page.page}</Typography>
            </MenuItem>
          </Link>
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
  );
};

export default Drawer;
