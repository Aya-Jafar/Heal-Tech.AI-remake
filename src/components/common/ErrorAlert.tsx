import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ErrorAlertProps } from "../../schema";

export default function ErrorAlert({ validAuth, type }: ErrorAlertProps) {
  const [open, setOpen] = React.useState(!validAuth); // Set open state based on validAuth prop

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    // Update the open state when validAuth changes
    setOpen(!validAuth);
  }, [validAuth]);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {type === "login" ? `Invalid email or password` : `Invalid user data`}
        </Alert>
      </Snackbar>
    </div>
  );
}
