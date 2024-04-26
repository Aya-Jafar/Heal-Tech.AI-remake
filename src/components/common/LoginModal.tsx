import React, { useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useAuth } from "../../store/auth";
import { AuthSchema } from "../../schema";
import { logIn } from "../../Firebase/auth";
import CustomizedSnackbar from "./SnackBar";
import {
  fieldsetStyles,
  inputTextStyles,
  labelStyles,
  loginBoxStyle,
} from "../../utils/dynamicStyles";
import { isValidEmail } from "../../utils/helpers";

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, setIsSignUpModalOpen } =
    useAuth() as AuthSchema;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setFormData((prevData) => ({ ...prevData, email: value }));
      setValidEmail(isValidEmail(value));
    } else if (name === "password") {
      setFormData((prevData) => ({ ...prevData, password: value }));
      setValidPassword(value.length >= 8);
    }
  };

  const handleSubmit = async () => {
    const { email, password } = formData;
    const isValidCredentials = validEmail && validPassword;

    if (isValidCredentials) {
      try {
        await logIn(email, password);
        if (localStorage.getItem("token")) {
          setIsLoginModalOpen(false);
          setShowSnackbar(true);
        }
      } catch (error) {
        // Handle login failure (e.g., show error message)
        setShowSnackbar(true);
      }
    } else {
      // Display snackbar for validation errors
      setShowSnackbar(true);
    }
  };

  return (
    <>
      <Modal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <Box sx={loginBoxStyle}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Login
          </Typography>

          <form
            className="aurh-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            style={{ marginTop: "40px" }}
          >
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              onChange={handleInputChange}
              style={{ marginBottom: "20px" }}
              error={!validEmail}
              helperText={!validEmail && "Invalid email"}
              sx={{
                width: "100%",
                ...(validEmail
                  ? { "& label": labelStyles }
                  : { "& label": { color: "#d74a53 !important" } }),
                ...(validEmail
                  ? { "& fieldset": fieldsetStyles }
                  : {
                      "& fieldset": {
                        borderColor: "#d74a53 !important",
                        border: "2px solid #d74a53",
                      },
                    }),
              }}
              inputProps={{
                style: inputTextStyles,
              }}
            />

            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              onChange={handleInputChange}
              style={{ marginBottom: "20px" }}
              error={!validPassword}
              helperText={!validPassword && "Invalid Password"}
              sx={{
                width: "100%",
                ...(validPassword
                  ? { "& label": labelStyles }
                  : { "& label": { color: "#d74a53 !important" } }),
                ...(validPassword
                  ? { "& fieldset": fieldsetStyles }
                  : {
                      "& fieldset": {
                        borderColor: "#d74a53 !important",
                        border: "2px solid #d74a53",
                      },
                    }),
              }}
              inputProps={{
                style: inputTextStyles,
              }}
            />
            <center>
              <Box
                sx={{
                  "& > :not(style)": {
                    width: "50%",
                    mt: 5,
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                  },
                }}
              >
                <button id="login-btn" className="btn">
                  Login
                </button>
              </Box>
              <br />
              <p className="login-text">
                Don't have an account yet?{" "}
                <strong
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    setIsSignUpModalOpen(true);
                  }}
                >
                  Register now
                </strong>
              </p>
            </center>
          </form>
        </Box>
      </Modal>
      <CustomizedSnackbar
        text={
          validEmail && validPassword 
            ? "User logged in successfully"
            : "Please enter the right credentials"
        }
        type={validEmail && validPassword ? "success" : "error"}
        openState={showSnackbar}
        setOpenState={setShowSnackbar}
      />
    </>
  );
}
