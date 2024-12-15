import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function AuthButtons({ darkMode, t }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Button
        sx={{
          display: "block",
          transition: "all 0.3s ease",
          "&.MuiButton-root": {
            backgroundColor: darkMode ? "#f37021" : "#29b6f6",
            color: "#fff",
            border: `1px solid ${darkMode ? "#f37021" : "#29b6f6"}`,
            "&:hover": {
              borderRadius: "10px",
            },
          },
        }}
        component={Link}
        to="/login"
      >
        {t("SIGN IN")}
      </Button>
      <Button
        sx={{
          display: "block",
          "&.MuiButton-root": {
            backgroundColor: "transparent",
            color: darkMode ? "#fff" : "#29b6f6",
            border: `1px solid ${darkMode ? "#f37021" : "#29b6f6"}`,
            "&:hover": {
              backgroundColor: darkMode ? "#f37021" : "#29b6f6",
              color: "white",
              borderRadius: "5px",
            },
          },
        }}
        variant="outlined"
        color="inherit"
        component={Link}
        to="/register"
      >
        {t("SIGN UP")}
      </Button>
    </div>
  );
}

AuthButtons.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default AuthButtons;
