import {
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

import { Star } from "lucide-react";
// motion
import { motion } from "framer-motion";

import {
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
} from "./shared/starHandlers";
import { CommentsContext } from "./shared/CommentsContext";
import { useContext, useState } from "react";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../../hooks/useDebounce";
export default function CommentForm({ id }) {
  const {
    handleAddComment,
    error,
    sortOption,
    setSortOption,
    filterStars,
    handleSort,
    handleFilter,
  } = useContext(CommentsContext);
  const { t } = useTranslation();
  const [comment, setComment] = useState("");
  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0);
  const { debounceFunction } = useDebounce(setComment, 200);
  console.log("Rerendering CommentForm");

  const handleAdd = (e) => {
    e.preventDefault();
    handleAddComment(e, id, selectedStars, comment);
    if (selectedStars !== 0 && comment !== "") {
      e.target.reset();
      setComment("");
      setSelectedStars(0);
    }
  };

  return (
    <div className="comment-input">
      <form onSubmit={(e) => handleAdd(e)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Star
                  className="stars"
                  onMouseEnter={() => handleMouseEnter(index, setHoveredStars)}
                  onMouseLeave={() => handleMouseLeave(setHoveredStars)}
                  onClick={() =>
                    handleClick(index, selectedStars, setSelectedStars)
                  }
                  style={{
                    fill:
                      index < (hoveredStars || selectedStars) ? "#facc15" : "",
                    color: "#facc15",
                    cursor: "pointer",
                  }}
                />
              </motion.div>
            ))}
          </div>
          <TextField
            id="standard-basic"
            label={t("Review")}
            variant="outlined"
            size="small"
            onChange={(e) => debounceFunction(e)}
            helperText={!!error && error}
            error={!!error}
          />
        </div>
        <Button type="submit">{t("Submit")}</Button>
      </form>
      <div className="filter-sort">
        <FormControl variant="outlined" size="small" sx={{ width: 100 }}>
          <InputLabel>{t("Sort By")}</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              handleSort(e.target.value);
            }}
            label={t("Sort By")}
          >
            <MenuItem value="highest">{t("highest")}</MenuItem>
            <MenuItem value="lowest">{t("lowest")}</MenuItem>
            <MenuItem value="newest">{t("newest")}</MenuItem>
            <MenuItem value="oldest">{t("oldest")}</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" sx={{ width: 100 }}>
          <InputLabel>{t("Filter By Stars")}</InputLabel>
          <Select
            value={filterStars}
            onChange={(e) => handleFilter(e.target.value)}
            label={t("Filter By Stars")}
          >
            <MenuItem value={0}>{t("All")}</MenuItem>
            {[1, 2, 3, 4, 5].map((stars) => (
              <MenuItem key={stars} value={stars}>
                {stars} {t("Stars")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

CommentForm.propTypes = {
  id: PropTypes.string.isRequired,
};
