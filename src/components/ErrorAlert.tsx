import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export interface ErrorAlertProps {
  validAuth: boolean;
}

export function ErrorAlert({ validAuth }: ErrorAlertProps) {
  return (
    <>
      {!validAuth && (
        <center>
          <Stack
            sx={{
              width: "50%",
              position: "relative",
              zIndex: (theme) => theme.zIndex.modal + 1,
            }}
            spacing={10}
          >
            <Alert variant="filled" severity="error" className="error-alert">
              Invalid email or password
            </Alert>
          </Stack>
        </center>
      )}
    </>
  );
}
