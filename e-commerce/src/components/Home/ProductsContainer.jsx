// mui components
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
// mui Loading Skeleton
import ProductCardSkeleton from "./skeletonProgress/ProductCardSkeleton";
// components
import Card from "./Card";
// hooks
import { useCallback, useContext, useEffect, useState } from "react";
// custom hooks
import { useStore } from "../../reducers/ReducerContext";
// contexts
import { PaginationContext } from "./context/PaginationContext";
// motion
import { motion } from "framer-motion";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

// mainURL
const mainUrl = import.meta.env.VITE_API_URL;

// styles
import "./styles/productContainer.css";

export default function ProductsContainer() {
  const theme = useTheme();
  const { state, dispatch } = useStore();
  const { currentPage, setTotalPages } = useContext(PaginationContext);
  // translations
  const { t } = useTranslation();
  const categories = ["Products", "Men", "Women"];

  // categories filters state
  const [alignment, setAlignment] = useState("Products");
  const handleToggle = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const fetchData = useCallback(
    async (url) => {
      dispatch({ type: "GET_PRODUCTS_REQUEST" });
      try {
        const res = await fetch(url);
        const data = await res.json();
        dispatch({ type: "GET_PRODUCTS", payload: data.data });
        setTotalPages(data.meta.pagination.pageCount);
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch({ type: "GET_PRODUCTS_FAILURE" });
      }
    },
    [dispatch, setTotalPages]
  );
  useEffect(() => {
    const getWishlist = async () => {
      dispatch({ type: "GET_CART_REQUEST" });
      try {
        const response = await fetch(
          `${mainUrl}/api/carts?filter[userId][$eq]=${localStorage.getItem(
            "userId"
          )}&populate=*`
        );
        const data = await response.json();
        dispatch({ type: "GET_CART", payload: data.data });
      } catch (error) {
        dispatch({ type: "GET_CART_FAILURE" });
        console.error("Error fetching data:", error);
      }
    };
    getWishlist();
  }, [dispatch]);

  useEffect(() => {
    let url = `${mainUrl}/api/products?pagination[page]=${currentPage}&pagination[pageSize]=12&populate=image`;

    switch (alignment) {
      case "Men":
        url = `${mainUrl}/api/products?filters[cat][$eq]=men&pagination[pageSize]=12&populate=image`;
        break;
      case "Women":
        url = `${mainUrl}/api/products?filters[cat][$eq]=women&pagination[pageSize]=12&populate=image`;
        break;
      case "Products":
      default:
        url = `${mainUrl}/api/products?pagination[page]=${currentPage}&pagination[pageSize]=12&populate=image`;
        break;
    }

    fetchData(url);
  }, [fetchData, currentPage, alignment]);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ margin: "1rem" }}>
        <ToggleButtonGroup
          color={theme.palette.mode === "dark" ? "warning" : "info"}
          value={alignment}
          exclusive
          onChange={handleToggle}
          aria-label="Platform"
        >
          {categories.map((category) => (
            <ToggleButton
              key={category}
              sx={{
                border: "none",
                transition: "all 0.3s ease",
                color: theme.palette.mode === "dark" ? "white" : "black",
                backgroundColor: "transparent",
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
              value={category}
              onClick={handleToggle}
            >
              {t(category)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        {state.products.loading ? (
          [...Array(5)].map((_, index) => (
            <Grid
              item
              key={index}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
              xs={12}
              md={4}
              lg={3}
            >
              <ProductCardSkeleton />
            </Grid>
          ))
        ) : (
          <>
            {state?.products?.data?.map((product) => {
              return (
                <Grid
                  item
                  key={product.id}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  component={motion.div}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card product={product} />
                </Grid>
              );
            })}
            {state?.products?.data?.length === 0 && (
              <h1>{t("No products found")}</h1>
            )}
          </>
        )}
      </Grid>
    </div>
  );
}
