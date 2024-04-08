import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { ErrorAlertProps } from "../schema";

export function ErrorAlert({ validAuth, type }: ErrorAlertProps) {
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
              {type === "login"
                ? `Invalid email or password`
                : `Invalid user data`}
            </Alert>
          </Stack>
        </center>
      )}
    </>
  );
}
