import Avatar from "@mui/material/Avatar";
import { Button, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRef, useState, memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";

function Signup() {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";
  const [error, setError] = useState({});
  const [signup, setSignup] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const UserRef = useRef(null);
  const EmailRef = useRef(null);
  const PasswordRef = useRef(null);
  const ConfirmRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newError = {};

    if (!signup.userName.trim()) {
      newError.userName = t("User Name cannot be empty");
      UserRef.current.focus();
    }
    if (!signup.email.trim()) {
      newError.email = t("Email cannot be empty");
      EmailRef.current.focus();
    }
    if (!signup.password.trim()) {
      newError.password = t("Password cannot be empty");
      PasswordRef.current.focus();
    }
    if (signup.confirmPassword !== signup.password) {
      newError.confirmPassword = t("Passwords do not match");
      ConfirmRef.current.focus();
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: signup.userName,
            email: signup.email,
            password: signup.password,
          }),
        }
      );
      const data = await response.json();

      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("userId", data.user.id);
        window.location.href = "/";
        return data.user;
      } else {
        console.error("Server error:", data);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const textFieldSx = {
    "& .MuiInputLabel-asterisk": {
      transition: "none",
    },
    "& .MuiInputBase-root": {
      direction: isRTL ? "rtl" : "ltr",
    },
    "& .MuiInputBase-input": {
      textAlign: isRTL ? "right" : "left",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      textAlign: isRTL ? "right" : "left",
    },
    "& .MuiInputLabel-root": {
      left: isRTL ? "inherit" : "2px",
      right: isRTL ? "32px" : "inherit",
      transformOrigin: isRTL ? "right" : "left",
    },
    "& .MuiInputLabel-shrink": {
      transform: isRTL
        ? "translate(16px, -9px) scale(0.75)"
        : "translate(14px, -9px) scale(0.75)",
    },
  };

  const textFieldSlotProps = {
    formHelperText: {
      style: {
        textAlign: isRTL ? "right" : "left",
      },
    },
    input: {
      dir: isRTL ? "rtl" : "ltr",
    },
  };

  return (
    <Container component="main" maxWidth="xs">
      <div
        style={{
          marginTop: "64px",
          marginBottom: "64px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "info.main", marginTop: "8px" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("Sign Up")}
        </Typography>
        <form
          onSubmit={handleRegister}
          style={{ width: "100%", marginTop: "24px" }}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                color="info"
                required
                fullWidth
                inputRef={UserRef}
                id="username"
                label={t("User Name")}
                name="userName"
                autoComplete="username"
                autoFocus
                value={signup.userName}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    EmailRef.current.focus();
                  }
                }}
                sx={textFieldSx}
                helperText={error.userName}
                error={!!error.userName}
                slotProps={textFieldSlotProps}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                color="info"
                required
                fullWidth
                inputRef={EmailRef}
                id="email"
                label={t("Email Address")}
                name="email"
                autoComplete="email"
                value={signup.email}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    PasswordRef.current.focus();
                  }
                }}
                sx={textFieldSx}
                helperText={error.email}
                error={!!error.email}
                slotProps={textFieldSlotProps}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                color="info"
                required
                fullWidth
                inputRef={PasswordRef}
                name="password"
                label={t("Password")}
                type="password"
                id="password"
                autoComplete="current-password"
                value={signup.password}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    ConfirmRef.current.focus();
                  }
                }}
                sx={textFieldSx}
                helperText={error.password}
                error={!!error.password}
                slotProps={textFieldSlotProps}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                color="info"
                required
                fullWidth
                inputRef={ConfirmRef}
                name="confirmPassword"
                label={t("Confirm Password")}
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={signup.confirmPassword}
                onChange={handleInputChange}
                sx={textFieldSx}
                helperText={error.confirmPassword}
                error={!!error.confirmPassword}
                slotProps={textFieldSlotProps}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="info"
            sx={{ marginTop: 3 }}
            type="submit"
          >
            {t("Sign Up")}
          </Button>
          <Grid
            container
            justifyContent={isRTL ? "flex-end" : "flex-start"}
            sx={{ marginTop: 2 }}
          >
            <Grid item>
              <Link
                to={"/login"}
                variant="body2"
                style={{
                  textDecoration: "none",
                  color: dark ? "#fff" : "#000",
                }}
              >
                {t("Already have an account? Sign in")}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default memo(Signup);
