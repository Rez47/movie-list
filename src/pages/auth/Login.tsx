import { useState } from "react";
import {
  CircularProgress,
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

const fieldValidation = object({
  email: string().email("Email is not valid").required("Email is requiered"),
  password: string()
    .min(6, "Password should be atleast 6")
    .required("Password is requiered"),
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
            {({ handleSubmit, handleChange, touched, errors, values }) => (
              <Form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched["email"] && !!errors["email"]}
                    helperText={touched["email"] && errors["email"]}
                  />

                  <TextField
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched["password"] && !!errors["password"]}
                    helperText={touched["password"] && errors["password"]}
                  />

                  <Alert
                    severity={alert.severity}
                    text={alert.message}
                    showError={showAlert}
                    setShowError={setShowAlert}
                  />

                  <Button label="Login" isSubmit />
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
