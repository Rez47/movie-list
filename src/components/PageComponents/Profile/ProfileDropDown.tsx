import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import theme from "../../../theme";

import { useState } from "react";
import { auth } from "../../../config/firebase";
import { userDropDownPages } from "../../Layout/Navigation/pages";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/slices/userSlices";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { RootState } from "../../../store/store";

const ProfileNav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut().then(() => dispatch(logout()));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {/* Menu icon */}
      <IconButton onClick={handleOpenUserMenu}>
        <AccountCircleIcon sx={{ fontSize: "2.5rem", mr: "1rem" }} />
      </IconButton>

      {/* User menu */}
      <Menu
        sx={{ mt: "45px" }}
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
        <Typography
          component="h5"
          variant="h5"
          sx={{
            px: "1.2rem",
            color: theme.palette.common.black,
            fontWeight: "500",
            fontSize: "1.2rem",
          }}
        >
          {user.email !== "" ? `Hello, ${user.email}` : ""}
        </Typography>

        {/* Menu buttons */}
        {userDropDownPages.map((userDropDownPage, index) => (
          <Link
            href={userDropDownPage.link}
            sx={{
              color: theme.palette.common.black,
            }}
          >
            <MenuItem
              key={`${index}-${userDropDownPage.page}`}
              onClick={handleCloseUserMenu}
              sx={{
                color: `${theme.palette.common.black}`,
              }}
            >
              <Box
                sx={{
                  mr: " .5rem",
                  pt: "0.1rem",
                  color: theme.palette.text.secondary,
                }}
              >
                {userDropDownPage.page === "Profile" ? (
                  <PersonIcon />
                ) : userDropDownPage.page === "Favorites" ? (
                  <FavoriteIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </Box>
              <Typography textAlign="center">
                {userDropDownPage.page}
              </Typography>
            </MenuItem>
          </Link>
        ))}
        <Link onClick={handleLogout} href="/auth/login">
          <MenuItem>
            <LogoutIcon
              sx={{ color: theme.palette.text.secondary, mr: "0.5rem" }}
            />
            <Typography sx={{ color: theme.palette.common.black }}>
              {user.email !== "" ? "Logout" : "Login"}
            </Typography>
          </MenuItem>
        </Link>
      </Menu>
    </Box>
  );
};

export default ProfileNav;
