import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import theme from "../../../theme";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase";

interface Pages {
  page: string;
  link: string;
}

const settings: Pages[] = [
  { page: "Profile", link: "/user/profile" },
  { page: "Favorites", link: "/user/favorites" },
  { page: "Watch List", link: "/user/watchlist" },
];

const Settings = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
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

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Typography
            sx={{ color: `${theme.palette.common.white}`, mr: "2rem" }}
          >
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
        {settings.map((content, index) => (
          <MenuItem
            key={`${index}-${content.page}`}
            onClick={handleCloseUserMenu}
            sx={{ color: `${theme.palette.common.black}` }}
          >
            <Link
              href={content.link}
              sx={{
                color: theme.palette.common.black,
                textDecoration: "none",
              }}
            >
              <Typography textAlign="center">{content.page}</Typography>
            </Link>
          </MenuItem>
        ))}
        <IconButton
          onClick={handleLogout}
          sx={{
            color: theme.palette.common.black,
            fontSize: "1rem",
            pl: "1rem",
          }}
        >
          {currentUser ? "Logout" : "Login"}
        </IconButton>
      </Menu>
    </Box>
  );
};

export default Settings;
