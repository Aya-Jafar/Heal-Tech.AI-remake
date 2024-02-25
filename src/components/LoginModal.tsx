import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useAuth } from "../store/auth";
import { AuthSchema } from "../schema";
import { logIn } from "../Firebase/auth";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { loginBoxStyle } from "../dynamicStyles";
import { ErrorAlert } from "./ErrorAlert";

function LoginModal() {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    setCurrentUser,
    currentUser,
    setIsSignUpModalOpen,
  } = useAuth() as AuthSchema;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validAuth, setValidAuth] = useState<boolean>(true);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    await logIn(formData.email, formData.password, setCurrentUser);

    if (localStorage.getItem("token")) {
      setIsLoginModalOpen(false);
      setValidAuth(true);
    } else {
      setValidAuth(false);
    }

    setTimeout(() => {
      setValidAuth(true);
    }, 1000);
  };

  return (
    <>
      <ErrorAlert validAuth={validAuth} />

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

            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
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
    </>
  );
}

export default LoginModal;
