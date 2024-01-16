import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import theme from "../../../theme";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { userDropDownPages } from "../../Layout/Navigation/pages";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/userSlices";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProfileNav = () => {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log(user);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);

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
      <IconButton onClick={handleOpenUserMenu}>
        <AccountCircleIcon sx={{ fontSize: "2.5rem" }} />
      </IconButton>

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
        <Typography component="p" variant="body1"></Typography>
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
            <Typography
              sx={{
                color: theme.palette.common.black,
              }}
            >
              {currentUser ? "Logout" : "Login"}
            </Typography>
          </MenuItem>
        </Link>
      </Menu>
    </Box>
  );
};

export default ProfileNav;
