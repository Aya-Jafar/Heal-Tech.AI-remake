import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useAuth } from "../store/auth";
import { AuthSchema } from "../schema";
import { createAccount } from "../Firebase/auth";
import { signupBoxStyle } from "../dynamicStyles";
import { ErrorAlert } from "./ErrorAlert";

function SignUpModal() {
  const {
    isSignUpModalOpen,
    setIsSignUpModalOpen,
    setCurrentUser,
    currentUser,
    setIsLoginModalOpen,
  } = useAuth() as AuthSchema;

  const [emailError, setEmailError] = useState("");
  const [validAuth, setValidAuth] = useState<boolean>(true);

  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
    name: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(value);

      setEmailError(isValidEmail ? "" : "Invalid email address");
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
      setCurrentUser
    );
    if (localStorage.getItem("token")) {
      setIsSignUpModalOpen(false);
      setValidAuth(true);
    } else {
      setValidAuth(false);
    }

    setTimeout(() => {
      setValidAuth(true);
    }, 3000);
  };

  return (
    <>
      <ErrorAlert validAuth={validAuth} />

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
              error={!!emailError}
              helperText={emailError}
              onChange={handleInputChange}
              style={{ marginBottom: "20px" }}
              sx={{
                width: "100%",
                "& label": {
                  color: "white", // Label color
                },
                "& fieldset": {
                  borderColor: "white !important", // Border color
                },
              }}
              inputProps={{
                style: {
                  color: "white", // Text color
                },
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
                "& label": {
                  color: "white", // Label color
                },
                "& fieldset": {
                  borderColor: "white !important", // Border color
                },
              }}
              inputProps={{
                style: {
                  color: "white", // Text color
                },
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
              sx={{
                width: "100%",
                "& label": {
                  color: "white", // Label color
                },
                "& fieldset": {
                  borderColor: "white !important", // Border color
                },
              }}
              inputProps={{
                style: {
                  color: "white", // Text color
                },
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
              style={{ marginBottom: "50px" }}
              sx={{
                width: "100%",
                "& label": {
                  color: "white", // Label color
                },
                "& fieldset": {
                  borderColor: "white !important", // Border color
                },
              }}
              inputProps={{
                style: {
                  color: "white", // Text color
                },
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
