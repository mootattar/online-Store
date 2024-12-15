import React from "react";
import "./styles/Home.css";

import { Box } from "@mui/material";
// components

import Sidebar from "../../components/sidebar/Sidebar";
import ProductsContainer from "../../components/Home/ProductsContainer";
import Paginations from "../../components/Home/Pagination";

const Home = React.memo(function Home() {
  return (
    <>
      <Box
        sx={{
          mt: 4,
          px: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            gap: "2rem",
            position: "relative",
          }}
        >
          <Sidebar />
          <ProductsContainer />
        </div>
        <Paginations />
      </Box>
    </>
  );
});

export default Home;
