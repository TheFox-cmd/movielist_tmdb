import { LoginForm } from "../types/LoginForm";
import { Form, ErrorMessage, Field, Formik } from "formik";
import FormValidation from "../schema/FormValidation";
import TextField from "@mui/material/Textfield";
import LoadingButton from '@mui/lab/LoadingButton';
import Box from "@mui/material/Box";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();
  console.log(isLoading);

  const initialForm: LoginForm = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values: LoginForm) => {
    try {
      const res = await login(values.username, values.password);
      if (!res.success) {
        setLoginFailed(true);
        return;
      }

      setLoginFailed(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialForm}
      validationSchema={FormValidation}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "300px",
              margin: "auto",
            }}
          >
            <Box
              sx={{
                fontSize: "36px",
                fontWeight: "semibold",
                textAlign: "center",
              }}
            >
              Login
            </Box>
            {loginFailed && (
              <Box
                sx={{
                  color: "red",
                  textAlign: "center",
                }}
              >
                Failed to login
              </Box>
            )}
            <Field
              as={TextField}
              name="username"
              label="Username"
              variant="standard"
              type="text"
              fullWidth
              error={touched.username && errors.username !== undefined}
              helperText={<ErrorMessage name="username" />}
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              variant="standard"
              type="password"
              fullWidth
              error={touched.password && errors.password !== undefined}
              helperText={<ErrorMessage name="password" />}
            />
            <LoadingButton
              loading={isLoading}
              type="submit"
              variant="outlined"
              disabled={isSubmitting}
              sx={{
                width: "100%",
                backgroundColor: `${isLoading ? "lightgray" : "#3f51b5"}`,
                color: "white",
                padding: "6px 16px",
                fontWeight: "500",
                borderRadius: "4px",
              }}
            >
              SUBMIT
            </LoadingButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
