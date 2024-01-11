import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import React, { useState } from "react";
import SearchBar from "../../SmallComponents/SearchBar/Searchbar";

import theme from "../../../theme";

interface Pages {
  page: string;
  link: string;
}
const pages: Pages[] = [{ page: "Home", link: "/" }];

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
          <Link href={content.link} sx={{ textDecoration: "none" }}>
            <MenuItem
              key={index}
              onClick={() => handleMenuItemClick()}
              sx={{ color: `${theme.palette.common.black}` }}
            >
              <Typography textAlign="center">{content.page}</Typography>
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
