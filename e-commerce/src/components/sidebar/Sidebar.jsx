// react
import React, { useCallback, useMemo, useState } from "react";

// axios
import axios from "axios";

// mui
import {
  Typography,
  Checkbox,
  FormControlLabel,
  Slider,
  AccordionSummary,
} from "@mui/material";

// mui icons
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// translations
import { useTranslation } from "react-i18next";

// styles
import "./styles/sidebar.css";
import { useStore } from "../../reducers/ReducerContext";

const ProductSidebar = React.memo(function Sidebar() {
  // reducers
  const { dispatch } = useStore();
  // translations
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  // states
  const [isExpanded, setIsExpanded] = useState(true);
  const [filters, setFilters] = useState({
    newArrivals: false,
    topRated: false,
    lowestRated: false,
    oldest: false,
    newest: false,
    highestPrice: false,
    lowestPrice: false,
    priceRange: [0, 1000],
  });
  // resetSlider
  const [resetSlider, setResetSlider] = useState(0);

  const filterProducts = useMemo(
    () => async (filters) => {
      try {
        let queryParams = "?populate=*";

        if (filters.newest) {
          queryParams += "&sort[0]=createdAt:desc";
        } else if (filters.oldest) {
          queryParams += "&sort[0]=createdAt:asc";
        }

        if (filters.topRated) {
          queryParams += "&sort[1]=averageRating:desc";
        } else if (filters.lowestRated) {
          queryParams += "&sort[1]=averageRating:asc";
        }

        if (filters.highestPrice) {
          queryParams += "&sort[2]=price:desc";
        } else if (filters.lowestPrice) {
          queryParams += "&sort[2]=price:asc";
        }

        if (filters.priceRange) {
          queryParams += `&filters[price][$gte]=${filters.priceRange[0]}`;
          queryParams += `&filters[price][$lte]=${filters.priceRange[1]}`;
        }

        if (filters.newArrivals) {
          const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
          queryParams += `&filters[createdAt][$gte]=${thirtyDaysAgo.toISOString()}`;
        }

        const response = await axios.get(
          `http://localhost:1337/api/products${queryParams}`
        );
        return response.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return dispatch({ type: "GET_PRODUCTS_FAILURE" });
      }
    },
    [dispatch]
  );

  const handlePriceChange = (event, newValue) => {
    setFilters((prev) => ({ ...prev, priceRange: newValue }));
  };

  const handleFilterChange = (name) => {
    setFilters((prev) => {
      const isCurrentlySelected = prev[name];
      const newFilters = {};
      for (let key in prev) {
        newFilters[key] = false;
      }
      if (!isCurrentlySelected) {
        newFilters[name] = true;
      }
      newFilters.priceRange = prev.priceRange;
      return newFilters;
    });
  };

  const applyFilters = useCallback(async () => {
    const filteredProducts = await filterProducts(filters);
    dispatch({ type: "GET_PRODUCTS", payload: filteredProducts });
  }, [filters, dispatch, filterProducts]);

  const resetFilters = () => {
    setResetSlider((prev) => prev + 1);
    setFilters({
      newArrivals: false,
      topRated: false,
      lowestRated: false,
      oldest: false,
      newest: false,
      highestPrice: false,
      lowestPrice: false,
      priceRange: [0, 1000],
    });
  };

  return (
    <div
      className={`sidebar ${isRTL ? "rtl" : ""} ${
        isExpanded ? "" : "sidebar-not-expanded"
      }`}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            sx={{
              transform: isExpanded ? "rotate(180deg)" : "",
              transition: "all 0.3s ease",
            }}
          />
        }
        aria-controls="filter-content"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <FilterListIcon sx={{ mr: 1 }} fontSize="small" />
        <Typography>{t("filters")}</Typography>
      </AccordionSummary>

      <div className={`${isExpanded ? "expanded" : "not-expanded"}`}>
        <div>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            {t("byAddition")}
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.newArrivals}
                  onChange={() => handleFilterChange("newArrivals")}
                  size="small"
                />
              }
              label={t("newArrivals")}
            />
          </Typography>

          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              {t("byRating")}
            </Typography>
            <div className="flx-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.topRated}
                    onChange={() => handleFilterChange("topRated")}
                    size="small"
                  />
                }
                label={t("highest")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.lowestRated}
                    onChange={() => handleFilterChange("lowestRated")}
                    size="small"
                  />
                }
                label={t("lowest")}
              />
            </div>
          </div>

          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              {t("byDate")}
            </Typography>
            <div className="flx-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.newest}
                    onChange={() => handleFilterChange("newest")}
                    size="small"
                  />
                }
                label={t("newest")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.oldest}
                    onChange={() => handleFilterChange("oldest")}
                    size="small"
                  />
                }
                label={t("oldest")}
              />
            </div>
          </div>

          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              {t("byPrice")}
            </Typography>
            <div className="flx-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.highestPrice}
                    onChange={() => handleFilterChange("highestPrice")}
                    size="small"
                  />
                }
                label={t("highest")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.lowestPrice}
                    onChange={() => handleFilterChange("lowestPrice")}
                    size="small"
                  />
                }
                label={t("lowest")}
              />
            </div>
          </div>

          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            {t("priceRange")}
          </Typography>
          <Slider
            key={resetSlider}
            defaultValue={[0, 1000]}
            onChangeCommitted={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            size="small"
          />
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            {filters.priceRange[0]} - {filters.priceRange[1]} $
          </Typography>
        </div>

        <div className="flx-between">
          <button onClick={resetFilters} className="button-contained">
            {t("reset")}
          </button>
          <button onClick={applyFilters} className="button-contained">
            {t("apply")}
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductSidebar;
