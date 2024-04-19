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

  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
    name: "",
    specialization: "",
    phoneNumber: "",
  });

  const handleInputChange = (e: any) => {
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
        password2: !doesNotMatchConfirmPassword,
      }));

      // Set different error messages based on conditions
      if (isShortPassword) {
        setValidAuth((prevState) => ({
          ...prevState,
          password1: false,
          password1ErrorMessage: "Password should be at least 8 characters",
        }));
      } else if (doesNotMatchConfirmPassword) {
        setValidAuth((prevState) => ({
          ...prevState,
          password1: false,
          password1ErrorMessage: "Passwords do not match",
        }));
      } else {
        // Clear the error message if no error
        setValidAuth((prevState) => ({
          ...prevState,
          password1ErrorMessage: "",
        }));
      }
    } else if (name === "password2") {
      setValidAuth((prevState) => ({
        ...prevState,
        password2: formData.password1 === value,
      }));
    } else if (name === "Phone number") {
      setValidAuth((prevState) => ({
        ...prevState,
        phoneNumber: isValidIraqiPhoneNumber(value),
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
              helperText={!validAuth.password1 && validAuth.password1ErrorMessage}
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
              helperText={!validAuth.password2 && validAuth.password1ErrorMessage}
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
    </>
  );
}

export default SignUpModal;
