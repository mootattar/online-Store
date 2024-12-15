import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useHeaderState } from "../hooks/useHeaderState";

function MobileMenu({ pages, changeLanguage, language, t }) {
  const username = localStorage.getItem("username");
  const { anchorElNav, setAnchorElNav } = useHeaderState();
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const renderMenuItem = (page) => {
    if ((page === "SIGN UP" || page === "SIGN IN") && username) return null;
    const path = `/${page.toLowerCase().replace(" ", "")}`;
    return (
      <MenuItem key={page} onClick={handleCloseNavMenu}>
        <Link style={{ textDecoration: "none", color: "inherit" }} to={path}>
          {t(page)}
        </Link>
      </MenuItem>
    );
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="primer"
        sx={{ padding: 0 }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: language === "ar" ? "right" : "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: language === "ar" ? "right" : "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        {pages.map(renderMenuItem)}
        <MenuItem onClick={changeLanguage}>
          <button className="language-btn">
            {language === "en" ? "AR" : "EN"}
          </button>
        </MenuItem>
      </Menu>
    </Box>
  );
}

MobileMenu.propTypes = {
  pages: PropTypes.array.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default MobileMenu;
