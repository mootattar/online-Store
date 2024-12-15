import { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import ProductCard from "./Card";
import { useStore } from "../../reducers/ReducerContext";
const mainUrl = import.meta.env.VITE_API_URL;

export default function Wishlist() {
  const { state, dispatch } = useStore();

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, [dispatch]);

  return (
    <Container
      sx={{
        mt: 4,
      }}
    >
      <Grid container spacing={2}>
        {state.cart.loading && (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>loading...</h1>
          </div>
        )}
        {state?.cart?.data?.length === 0 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>your wishlist is empty</h1>
          </div>
        )}
        {state?.cart?.data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
}
