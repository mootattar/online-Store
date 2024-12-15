import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useHeaderState } from "../hooks/useHeaderState";

function DesktopMenu({ pages, theme, t }) {
  const { alignment, setAlignment } = useHeaderState();

  const handleAlignmentChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  return (
    <Box sx={{ flexGrow: 1, display: "flex", ml: 4 }}>
      <ToggleButtonGroup
        color={theme.palette.mode === "dark" ? "warning" : "info"}
        value={alignment}
        exclusive
        onChange={handleAlignmentChange}
        aria-label="Platform"
      >
        {pages.map((page) =>
          page === "SIGN UP" || page === "SIGN IN" ? null : page ===
            "About Me" ? (
            <div style={{ display: "flex" }} key={page}>
              <hr
                style={{
                  margin: "0 4px",
                  border:
                    theme.palette.mode === "dark"
                      ? "1px solid #fa0"
                      : "1px solid #29b6f6",
                  borderRadius: "1rem",
                }}
              />
              <Link to="/aboutme">
                <ToggleButton
                  sx={{
                    border: "none",
                    transition: "all 0.3s ease",
                    backgroundColor: "transparent",
                    color: theme.palette.mode === "dark" ? "white" : "black",
                    "&.Mui-selected": {
                      bgcolor: "transparent",
                    },
                    "&.Mui-selected:after": {
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#ffa726" : "#29b6f6",
                      transform: "scaleX(1)",
                    },
                    "&::after": {
                      background:
                        theme.palette.mode === "dark" ? "#fff" : "#000",
                    },
                  }}
                  className="underLine"
                  value={page}
                >
                  {t(page)}
                </ToggleButton>
              </Link>
            </div>
          ) : (
            <Link to={`/${page.toLowerCase().replace(" ", "")}`} key={page}>
              <ToggleButton
                sx={{
                  border: "none",
                  transition: "all 0.3s ease",
                  color: theme.palette.mode === "dark" ? "white" : "black",
                  backgroundColor: "transparent",
                  "&.Mui-selected": {
                    bgcolor: "transparent",
                  },
                  "&.Mui-selected:after": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#ffa726" : "#29b6f6",
                    transform: "scaleX(1)",
                  },
                  "&::after": {
                    background: theme.palette.mode === "dark" ? "#fff" : "#000",
                  },
                }}
                className="underLine"
                value={page}
              >
                {t(page)}
              </ToggleButton>
            </Link>
          )
        )}
      </ToggleButtonGroup>
    </Box>
  );
}

DesktopMenu.propTypes = {
  pages: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default DesktopMenu;
