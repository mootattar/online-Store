import { useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ThemeContext } from "./ThemeHook";
import Proptypes from "prop-types";

const MuiThemeProvider = ({ children }) => {
  const { darkMode } = useContext(ThemeContext);

  // إعداد الثيم بناءً على darkMode
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;

MuiThemeProvider.propTypes = {
  children: Proptypes.node,
};
