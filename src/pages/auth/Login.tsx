import { useState } from "react";
import {
  Box,
  CircularProgress,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import Button from "../../components/MUIComponents/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import Alert, { AlertType } from "../../components/MUIComponents/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/userSlices";
import theme from "../../theme";

const fieldValidation = object({
  email: string().required("Email is required").email("Email is not valid"),
  password: string()
    .required("Password is required")
    .min(6, "Password should be atleast 6"),
});

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertType>({
    message: "",
    severity: "error",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (values: LoginFormValues) => {
    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      ).then((user) => {
        if (!user) throw new Error("Invalid user");

        const currentUser = {
          uid: user.user.uid,
          email: user.user.email,
        };

        dispatch(login(currentUser));
        navigate("/");
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowAlert(true);
      setAlert({
        message: (error as Error).message,
        severity: "error",
      });
    }
  };

  return (
    <Stack
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Paper sx={{ width: "100%", maxWidth: "600px", padding: 4 }}>
        <Stack justifyContent="center" alignItems="center" gap={2} mb={2}>
          <Typography component="h1" variant="h1">
            Movie List
          </Typography>

          <Typography component="h2" variant="h3">
            Login
          </Typography>
        </Stack>

        {!loading ? (
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={fieldValidation}
            enableReinitialize
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              touched,
              errors,
              values,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Stack spacing={2} alignItems="center">
                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      (touched["email"] || !!errors["email"]) &&
                      !!errors["email"]
                    }
                    helperText={
                      (touched["email"] || !!errors["email"]) && errors["email"]
                    }
                  />

                  <TextField
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      (touched["password"] || !!errors["password"]) &&
                      !!errors["password"]
                    }
                    helperText={
                      (touched["password"] || !!errors["password"]) &&
                      errors["password"]
                    }
                  />

                  <Alert
                    severity={alert.severity}
                    text={alert.message}
                    showError={showAlert}
                    setShowError={setShowAlert}
                  />
                  <Box>
                    <Button
                      label="Login"
                      isSubmit
                      sx={{
                        textAlign: "center",
                        px: "2rem",
                        py: "0.5rem",
                        bgcolor: theme.palette.info.main,
                        margin: "1rem",
                      }}
                    />
                  </Box>
                  <Stack
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                  >
                    <Box>
                      <Typography component="span" variant="body2">
                        Already have an account?{" "}
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
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        ) : (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            my={6}
          >
            <CircularProgress />
          </Stack>
        )}
      </Paper>
    </Stack>
  );
};

export default Login;
