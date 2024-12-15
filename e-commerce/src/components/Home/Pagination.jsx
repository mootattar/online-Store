import { Stack, Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useContext } from "react";
import { PaginationContext } from "./context/PaginationContext";

export default function Paginations() {
  const { currentPage, setCurrentPage, totalPages } =
    useContext(PaginationContext);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Stack
      sx={{
        ".MuiPagination-ul": {
          my: "2rem",
          direction: "ltr",
          alignContent: "center",
          justifyContent: "center",
        },
        position: "relative",
        bottom: "0%",
        width: "100%",
      }}
      spacing={2}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => handlePageChange(value)}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
