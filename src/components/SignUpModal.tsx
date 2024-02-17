import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useAuth } from "../store/auth";
import { AuthSchema } from "../schema";
import { createAccount } from "../firebase/auth";
import FormHelperText from "@mui/material";

function SignUpModal() {
  const {
    isSignUpModalOpen,
    setIsSignUpModalOpen,
    setCurrentUser,
    currentUser,
  } = useAuth() as AuthSchema;

  const [emailError, setEmailError] = useState("");

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 550,
    bgcolor: "#282828",
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
  };

  const handleSubmit = () => {
    createAccount(
      formData.email,
      formData.name,
      formData.password1,
      setCurrentUser
    );
    if (currentUser !== null) {
      setIsSignUpModalOpen(false);
    //   setEmailError("");
    }
  };

  console.log("current user", currentUser);

  return (
    <>
      <Modal
        open={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      >
        <Box sx={style}>
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
            </center>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default SignUpModal;
