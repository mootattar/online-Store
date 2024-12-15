// React imports
import { memo, lazy, Suspense } from "react";

// styles
import "./styles/header.css";

// PropTypes for type checking
import PropTypes from "prop-types";

// React Router imports
import { Link } from "react-router-dom";

// Material-UI imports
import { useTheme, useMediaQuery } from "@mui/material";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Button,
} from "@mui/material";
import { Heart } from "lucide-react";

// Internationalization
import { useTranslation } from "react-i18next";

// Local imports
import img from "./avatarBackground.svg";
import SwitchTheme from "../switch/SwitchTheme";

// Lazy loaded components
const MobileMenu = lazy(() => import("./components/MobileMenu"));
const DesktopMenu = lazy(() => import("./components/DesktopMenu"));
const UserMenu = lazy(() => import("./components/UserMenu"));
const AuthButtons = lazy(() => import("./components/AuthButtons"));
const Logo = lazy(() => import("./components/Logo"));

// utils
import { pages } from "./utils/constants";
import { useStore } from "../../reducers/ReducerContext";

// hooks

function Header({ changeLanguage }) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  // Custom hook for header state

  const darkMode = theme.palette.mode === "dark";
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const username = localStorage.getItem("username");
  const language = i18n.language;
  const { state } = useStore();

  return (
    <AppBar
      position="sticky"
      sx={{
        width: "100%",
        backgroundColor: "var(--background-color)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {isSmallScreen && (
              <Suspense fallback={<div>Loading...</div>}>
                <MobileMenu
                  pages={pages}
                  changeLanguage={changeLanguage}
                  language={language}
                  t={t}
                  username={username}
                />
              </Suspense>
            )}
            <Suspense fallback={<div>Loading...</div>}>
              <Logo />
            </Suspense>
            <SwitchTheme />
          </Box>

          {!isSmallScreen && (
            <Suspense fallback={<div>Loading...</div>}>
              <DesktopMenu
                pages={pages}
                theme={theme}
                t={t}
                username={username}
              />
            </Suspense>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!isSmallScreen && (
              <Button onClick={changeLanguage} variant="outlined" size="medium">
                {language === "en" ? "AR" : "EN"}
              </Button>
            )}
            <IconButton component={Link} to="/wishlist">
              <Heart />
              {state?.cart?.data && (
                <span className="cart-badge">{state.cart.data.length}</span>
              )}
            </IconButton>
            {username ? (
              <Suspense fallback={<div>Loading...</div>}>
                <UserMenu
                  username={username}
                  t={t}
                  theme={theme}
                  language={language}
                  imgSrc={img}
                />
              </Suspense>
            ) : (
              !isSmallScreen && (
                <Suspense fallback={<div>Loading...</div>}>
                  <AuthButtons darkMode={darkMode} t={t} />
                </Suspense>
              )
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Header.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default memo(Header);
