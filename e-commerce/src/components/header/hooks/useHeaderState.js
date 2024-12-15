// hooks/useHeaderState.js
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useHeaderState = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [alignment, setAlignment] = useState("");
  const location = useLocation();

  useEffect(() => {
    const closeSettings = () => setShowSettings(false);
    document.addEventListener("click", closeSettings);
    return () => document.removeEventListener("click", closeSettings);
  }, []);

  useEffect(() => {
    if (
      location.pathname !== "/home" &&
      location.pathname !== "/reviews" &&
      location.pathname !== "/aboutme"
    ) {
      setAlignment(null);
    }
    if (location.pathname === "/home") {
      setAlignment("Home");
    }
    if (location.pathname === "/reviews") {
      setAlignment("reviews");
    }
    if (location.pathname === "/aboutme") {
      setAlignment("About Me");
    }
  }, [location.pathname]);

  return {
    anchorElNav,
    setAnchorElNav,
    showSettings,
    setShowSettings,
    alignment,
    setAlignment,
  };
};
