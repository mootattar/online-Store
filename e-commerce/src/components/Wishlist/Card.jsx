// mui
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import { Trash2 } from "lucide-react";

// react
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// styles
import "./wishlist.css";

// propTypes
import Proptypes from "prop-types";
import { useTranslation } from "react-i18next";
// custom hooks
import { useCart } from "../../hooks/useCart";
import { useDialog } from "../shared/Context/dialogContext";
export default function ProductCard({ product }) {
  // transilation
  const { t } = useTranslation();
  // card states
  const [productNumber, setProductNumber] = useState(
    Number(product.attributes.productNum)
  );
  const currentPrice = product.attributes.price;
  const [price, setPrice] = useState(Number(currentPrice) * productNumber);
  // custom hooks
  const { showDialog } = useDialog();
  const { updateCart, deleteFromCart } = useCart();

  // functions = ()=>{}
  const handleDelete = () => {
    showDialog({
      title: "are you sure you want to remove this product from your wishlist?",
      action: () => {
        deleteFromCart(product);
      },
    });
  };
  const handlePlus = () => {
    const newProductNum = productNumber + 1;
    setProductNumber(newProductNum);
    updateCart(product, newProductNum);
  };
  const handleMinus = () => {
    if (productNumber === 1) {
      return handleDelete();
    }
    const newProductNum = productNumber - 1;
    setProductNumber(newProductNum);
    updateCart(product, newProductNum);
  };

  // useEffect
  useEffect(() => {
    const calculatedPrice = Number(currentPrice) * productNumber;
    setPrice(parseFloat(calculatedPrice.toFixed(2)));
  }, [productNumber, currentPrice]);

  return (
    <Grid item xs={12}>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          overflow: "visible",
        }}
      >
        <Link to={`/product/${product.attributes.currentId}`}>
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100%", sm: 120 },
              height: { xs: 200, sm: 120 },
              borderRadius: 1,
            }}
            image={
              `http://localhost:1337${product?.attributes?.image?.data[0]?.attributes?.url}` ||
              `http://localhost:1337${product?.image}`
            }
            alt={product.attributes.title}
          />
        </Link>
        <CardContent
          sx={{
            flex: 1,
            ml: { xs: 0, sm: 2 },
            mt: { xs: 1, sm: 0 },
          }}
        >
          <Typography variant="h6">{product.attributes.title}</Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "1rem",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              {product.attributes.body}
            </Typography>
            <Typography className="button-color">
              {product.attributes.sizes}
            </Typography>
          </div>
          <Typography variant="body1" color="primary">
            {price} $
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            gap: 1,
          }}
        >
          <button
            className="text-color productMinus-icon"
            onClick={handleMinus}
          >
            -
          </button>
          <Typography variant="h6">{productNumber}</Typography>
          <button className="text-color productPlus-icon" onClick={handlePlus}>
            +
          </button>
          <Link to="/payment">
            <button className="button">{t("buy Now")}</button>
          </Link>
          <div
            style={{ alignSelf: "flex-end" }}
            className="tooltip"
            onClick={handleDelete}
          >
            <Trash2 className="trash-icon" size={22} />
            <span className="tooltiptext trash">{t("Delete")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 800 800"
              width="100"
              height="100"
              className="tooltip-icon right-arrow"
            >
              <g
                strokeWidth="10"
                stroke="hsl(0, 100%, 70%)"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="matrix(1,0,0,1,-105,0)"
              >
                <path
                  d="M281.5704803466797 369.4478759765625Q705.5704803466797 284.4478759765625 370.5704803466797 458.4478759765625 "
                  markerEnd={`url(#SvgjsMarker${product.id})`}
                ></path>
              </g>
              <defs>
                <marker
                  markerWidth="10"
                  markerHeight="10"
                  refX="5"
                  refY="5"
                  viewBox="0 0 10 10"
                  orient="auto"
                  id={`SvgjsMarker${product.id}`}
                >
                  <polyline
                    points="0,5 5,2.5 0,0"
                    fill="none"
                    strokeWidth="1.6666666666666667"
                    stroke="hsl(0, 100%, 70%)"
                    strokeLinecap="round"
                    transform="matrix(1,0,0,1,1.6666666666666667,2.5)"
                    strokeLinejoin="round"
                  ></polyline>
                </marker>
              </defs>
            </svg>
          </div>
        </Box>
      </Card>
    </Grid>
  );
}

ProductCard.propTypes = {
  product: Proptypes.object,
  handleMinus: Proptypes.func,
  handlePlus: Proptypes.func,
  handleDelete: Proptypes.func,
  showDialog: Proptypes.func,
};
