import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import theme from "../../../theme";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { userDropDownPages } from "../../Layout/Navigation/pages";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/userSlices";

const ProfileNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      navigate("/auth/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu}>
        <AccountCircleIcon sx={{ fontSize: "3rem" }} />
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
          <MenuItem
            key={`${index}-${userDropDownPage.page}`}
            onClick={handleCloseUserMenu}
            sx={{
              color: `${theme.palette.common.black}`,
            }}
          >
            <Link
              href={userDropDownPage.link}
              sx={{
                color: theme.palette.common.black,
              }}
            >
              <Typography textAlign="center">
                {userDropDownPage.page}
              </Typography>
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

export default ProfileNav;
