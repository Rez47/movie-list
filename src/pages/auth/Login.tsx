import { useState } from "react";
import {
  Container,
  Stack,
  Typography,
  TextField,
  CircularProgress,
  Button,
  useTheme,
  Link,
  Box,
} from "@mui/material";
import Alert, { AlertType } from "../../components/MUIComponents/Alert";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/userSlices";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertType>({
    message: "",
    severity: "error",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    setShowAlert(false);
    setAlert({ message: "", severity: "error" });

    if (email === "") {
      setShowAlert(true);
      setAlert({ message: "Email Address is required", severity: "error" });
      setLoading(false);
      return;
    }

    if (password === "") {
      setShowAlert(true);
      setAlert({ message: "Password is required", severity: "error" });
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password).then((user) => {
        dispatch(login(user));
        navigate("/");
        setLoading(false);
      });
    } catch (error: any) {
      setLoading(false);
      setShowAlert(true);
      setAlert({ message: error.message.substring(10), severity: "error" });
      console.log(error);
      throw new Error("Could not create user " + error);
    }
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        width="100%"
        maxWidth="40rem"
        justifyContent="center"
        alignItems="center"
        direction="column"
        gap={5}
        sx={{
          bgcolor: theme.palette.secondary.main,
          borderRadius: "10px",
          p: 5,
        }}
      >
        <Typography component="h2" variant="h2">
          Login
        </Typography>

        {!loading ? (
          <>
            <TextField
              label="Email Address"
              placeholder="Email Address"
              variant="outlined"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              error={alert.message === "Email Address is required"}
              helperText={
                alert.message === "Email Address is required"
                  ? "Email Address is required"
                  : ""
              }
              required
            />

            <TextField
              label="Password"
              placeholder="Password"
              variant="outlined"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              error={alert.message === "Password is required"}
              helperText={
                alert.message === "Password is required"
                  ? "Password is required"
                  : ""
              }
              required
            />
          </>
        ) : (
          <CircularProgress />
        )}

        <Alert
          severity={alert.severity}
          text={alert.message}
          showError={showAlert}
          setShowError={setShowAlert}
          isStatic
        />

        <Button
          variant="contained"
          sx={{ bgcolor: theme.palette.info.main }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={1}
        >
          <Box>
            <Typography component="span" variant="body2">
              Don't have account?{" "}
            </Typography>
            <Link href="/auth/register">Register</Link>
          </Box>

          <Box>
            <Link href="/">
              <Typography
                component="p"
                variant="body2"
                sx={{ fontSize: "0.8rem" }}
              >
                Just want to checkout? Click to go to homepage.
              </Typography>
            </Link>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
