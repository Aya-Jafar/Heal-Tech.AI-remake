import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useAuth } from "../../store/auth";
import { AuthSchema, ValidAuth } from "../../schema";
import { createAccount } from "../../Firebase/auth";
import {
  signupBoxStyle,
  labelStyles,
  fieldsetStyles,
  inputTextStyles,
} from "../../utils/dynamicStyles";
import { isValidEmail, isValidIraqiPhoneNumber } from "../../utils/helpers";
import CustomizedSnackbar from "./SnackBar";

function SignUpModal() {
  const {
    isSignUpModalOpen,
    setIsSignUpModalOpen,
    setCurrentUser,
    currentUser,
    setIsLoginModalOpen,
  } = useAuth() as AuthSchema;

  // const [emailError, setEmailError] = useState("");
  const [validAuth, setValidAuth] = useState<ValidAuth>({
    email: true,
    password1: true,
    password2: true,
    name: true,
    specialization: true,
    phoneNumber: true,
    password1ErrorMessage: "",
  });
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
    name: "",
    specialization: "",
    phoneNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setValidAuth((prevState) => ({
        ...prevState,
        email: isValidEmail(value),
      }));
    } else if (name === "password1") {
      const isShortPassword = value.length < 8;
      const doesNotMatchConfirmPassword = value !== formData.password2;

      setValidAuth((prevState) => ({
        ...prevState,
        password1: !isShortPassword,
        password1ErrorMessage: isShortPassword
          ? "Password should be at least 8 characters"
          : doesNotMatchConfirmPassword
          ? "Passwords do not match"
          : "",
      }));

      // Clear the error message for password2 if it was previously shown
      if (!doesNotMatchConfirmPassword) {
        setValidAuth((prevState) => ({
          ...prevState,
          password2: true,
        }));
      }
    } else if (name === "password2") {
      const doesNotMatchPassword = value !== formData.password1;
      setValidAuth((prevState) => ({
        ...prevState,
        password2: !doesNotMatchPassword,
      }));
    } else if (name === "Phone number") {
      setValidAuth((prevState) => ({
        ...prevState,
        phoneNumber: isValidIraqiPhoneNumber(value),
      }));
    } else if (
      name === "name" ||
      name === "specialization" ||
      name === "Phone number"
    ) {
      // Validate other fields based on specific criteria
      const isValid =
        (name === "name" && value.trim() !== "") ||
        (name === "specialization" && value.trim() !== "") ||
        (name === "Phone number" && isValidIraqiPhoneNumber(value));

      setValidAuth((prevState) => ({
        ...prevState,
        [name]: isValid,
      }));
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    await createAccount(
      formData.email,
      formData.name,
      formData.password1,
      formData.specialization,
      formData.phoneNumber
    );
    if (localStorage.getItem("token")) {
      setIsSignUpModalOpen(false);
      // setValidAuth(true);
      setShowSnackbar(true);
    } else {
      // setValidAuth(false);
    }

    setTimeout(() => {
      // setValidAuth(true);
    }, 3000);
  };

  return (
    <>
      {/* <ErrorAlert validAuth={validAuth} /> */}

      <Modal
        open={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      >
        <Box sx={signupBoxStyle}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Register
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
              helperText={!validAuth.email && "Invalid email"}
              sx={{
                width: "100%",
                ...(validAuth.email
                  ? { "& label": labelStyles }
                  : { "& label": { color: "#d74a53 !important" } }),
                ...(validAuth.email
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
            <br />
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              onChange={handleInputChange}
              style={{ marginBottom: "20px" }}
              name="name"
              sx={{
                width: "100%",
                "& label": labelStyles,
                "& fieldset": fieldsetStyles,
              }}
              inputProps={{
                style: inputTextStyles,
              }}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Specialization"
              variant="outlined"
              name="specialization"
              onChange={handleInputChange}
              style={{ marginBottom: "20px" }}
              sx={{
                width: "100%",
                "& label": labelStyles,
                "& fieldset": fieldsetStyles,
              }}
              inputProps={{
                style: inputTextStyles,
              }}
            />
            <br />

            <TextField
              id="outlined-basic"
              label="Phone number"
              variant="outlined"
              name="Phone number"
              onChange={handleInputChange}
              style={{ marginBottom: "20px" }}
              helperText={!validAuth.phoneNumber && "Invalid phone number"}
              sx={{
                width: "100%",
                ...(validAuth.phoneNumber
                  ? { "& label": labelStyles }
                  : { "& label": { color: "#d74a53 !important" } }),
                ...(validAuth.phoneNumber
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
            <br />

            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              name="password1"
              onChange={handleInputChange}
              style={{ marginBottom: "20px" }}
              helperText={
                !validAuth.password1 && validAuth.password1ErrorMessage
              }
              sx={{
                width: "100%",
                ...(validAuth.password1
                  ? { "& label": labelStyles }
                  : { "& label": { color: "#d74a53 !important" } }),
                ...(validAuth.password1
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
            <br />
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              name="password2"
              type="password"
              onChange={handleInputChange}
              style={{ marginBottom: "20px" }}
              helperText={
                !validAuth.password2 && validAuth.password1ErrorMessage
              }
              sx={{
                width: "100%",
                ...(validAuth.password2
                  ? { "& label": labelStyles }
                  : { "& label": { color: "#d74a53 !important" } }),
                ...(validAuth.password2
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
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                  },
                }}
              >
                <button id="login-btn" className="btn">
                  Sign up
                </button>
              </Box>
              <br />
              <p className="login-text">
                Already have an account? {"  "}
                <strong
                  onClick={() => {
                    setIsSignUpModalOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                >
                  Log in
                </strong>
              </p>
            </center>
          </form>
        </Box>
      </Modal>

      <CustomizedSnackbar
        text="User signed up successfully"
        openState={showSnackbar}
        setOpenState={setShowSnackbar}
      />
    </>
  );
}

export default SignUpModal;
