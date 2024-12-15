import { Typography, Avatar, Button } from "@mui/material";
import PropTypes from "prop-types";
// styles
import "./styles/style.css";
import { useHeaderState } from "../hooks/useHeaderState";
import { toggleSettings, handleSignOut } from "../utils/handlers";

function UserMenu({ t, theme, language, imgSrc }) {
  const username = localStorage.getItem("username");
  const { showSettings, setShowSettings } = useHeaderState();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={(e) => toggleSettings(e, setShowSettings)}
      className="dropDown"
    >
      <Typography
        sx={{
          mr: language === "en" ? 1 : 0,
          ml: language === "ar" ? 1 : 0,
          fontWeight: "bold",
          fontSize: { sm: "2vw" },
          mt: 1,
          color: theme.palette.mode === "dark" ? "white" : "black",
        }}
      >
        {username}
      </Typography>
      <div className="tooltip">
        <Avatar
          sx={{
            width: { xs: 30, md: 50 },
            height: { xs: 30, md: 50 },
          }}
          alt={username}
          src={imgSrc}
        />
        <span className="tooltiptext">{t("Open settings")}</span>
      </div>
      <div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleSignOut();
          }}
          className={`${showSettings ? "show" : ""} settings`}
        >
          <Button>{t("Logout")}</Button>
        </div>
      </div>
    </div>
  );
}

UserMenu.propTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default UserMenu;
