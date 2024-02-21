import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useAuth } from "../store/auth";
import { AuthSchema } from "../schema";
import { logIn } from "../Firebase/auth";

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

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
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
    height: 400,
    bgcolor: "#282828",
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
  };

  const handleSubmit = () => {
    logIn(formData.email, formData.password, setCurrentUser);

    console.log("user after submission",currentUser);
    
    // TODO: Don't close the madal if some fields is invalid
    
    // if (currentUser !== null) {
      setIsLoginModalOpen(false);
    // }
  };

  return (
    <>
      <Modal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <Box sx={style}>
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
