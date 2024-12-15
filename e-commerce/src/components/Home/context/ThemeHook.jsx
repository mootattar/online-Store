import { createContext, useContext, useState, useEffect } from "react";
import Proptypes from "prop-types";

export const ThemeContext = createContext();

export const ThemeProviders = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "dark"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode ? "dark" : "light");
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

ThemeProviders.propTypes = {
  children: Proptypes.node,
};
