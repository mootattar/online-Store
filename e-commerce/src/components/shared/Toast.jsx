import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function Toast({ open, setOpen, message }) {
  const { t } = useTranslation();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Stack sx={{ width: "100%", direction: "ltr" }} spacing={2}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
      >
        <Alert
          action={action}
          variant="filled"
          severity={
            message === "Error you should login first." ? "error" : "success"
          }
          sx={{ color: "white" }}
        >
          {t(message)}.
        </Alert>
      </Snackbar>
    </Stack>
  );
}

Toast.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  message: PropTypes.string,
};
