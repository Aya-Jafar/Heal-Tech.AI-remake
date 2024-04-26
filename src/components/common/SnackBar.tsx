import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { CustomizedSnackbarsProps } from "../../schema";

export default function CustomizedSnackbars({
  openState,
  setOpenState,
  text,
  type="success",
}: CustomizedSnackbarsProps) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenState(false);
  };

  return (
    <div>
      <Snackbar open={openState} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}
