import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface CustomizedSnackbarsProps {
  text: string;
  openState: boolean;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CustomizedSnackbars({
  openState,
  setOpenState,
  text,
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
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}
