import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Alert, { AlertType } from "../../components/MUIComponents/Alert";

const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertType>({
    message: "",
    severity: "error",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async () => {
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

    if (confirmPassword === "") {
      setShowAlert(true);
      setAlert({ message: "Confirm Password is required", severity: "error" });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setShowAlert(true);
      setAlert({ message: "Passwords do not match", severity: "error" });
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (user) => {
          navigate("/auth/login");
          setLoading(false);
        }
      );
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
          Register
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

            <TextField
              label="Confirm Password"
              placeholder="Confirm Password"
              variant="outlined"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={alert.message === "Confirm Password is required"}
              helperText={
                alert.message === "Confirm Password is required"
                  ? "Confirm Password is required"
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
          onClick={handleRegister}
        >
          Register
        </Button>

        <Box>
          <Typography component="span" variant="body2">
            Already have an account?{" "}
          </Typography>
          <Link href="/auth/login">Login</Link>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
