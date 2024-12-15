import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

// mainURL
const mainUrl = import.meta.env.VITE_API_URL;

// icons
import { Star, Truck, Shield, ShoppingCart, Heart } from "lucide-react";
// styles
import "./styles/product.css";
// avatar
import avatar from "../header/avatarBackground.svg";
// components
import Comments from "./Comment/Comments";
import CommentForm from "./CommentForm";
import ProductSkeleton from "./ProductSkeleton";
import { ImageZoom } from "./imageZoom/ImageZoom";
// context
import { CommentsContext } from "./shared/CommentsContext";
import { useStore } from "../../reducers/ReducerContext";
// framer motion
import { motion } from "framer-motion";
// custom hooks
import { useDialog } from "../shared/Context/dialogContext";
import { useCart } from "../../hooks/useCart";
// translation
import { useTranslation } from "react-i18next";
const SIZES = ["XS", "S", "M", "L", "XL"];
export default function ProductPage() {
  // translations
  const { t } = useTranslation();
  // context
  const { filteredReviews, userId } = useContext(CommentsContext);
  // custom hooks
  const { state, dispatch } = useStore();
  const { updateCart, deleteFromCart, addToWishlist } = useCart();
  const { showDialog } = useDialog();
  // use params
  const { id } = useParams();

  // cart states
  const [productNum, setProductNum] = useState(0);
  const isProductExist = state.cart.data.find(
    (product) => product?.attributes?.currentId === id
  );

  // product states
  const [selectedSize, setSelectedSize] = useState("M");
  const [mainImage, setMainImage] = useState(null);

  // get Product Data
  const fetchData = async (id) => {
    dispatch({ type: "GET_PRODUCT_REQUEST" });
    try {
      const url = `${mainUrl}/api/products/${id}?populate=*`;
      const res = await fetch(url);
      const data = await res.json();
      dispatch({ type: "GET_PRODUCT", payload: data.data });
      dispatch({
        type: "GET_REVIEWS",
        payload: data.data.attributes.reviews.data,
      });
      setMainImage(data.data.attributes.image.data[0].attributes.url);
    } catch (error) {
      dispatch({ type: "GET_PRODUCT_FAILURE" });
      console.error("Error fetching data:", error);
    }
  };
  // get wishlist Data

  const fetshWishlist = async () => {
    try {
      const response = await fetch(
        `${mainUrl}/api/carts?filter[userId][$eq]=${userId}&filter[currentId][$eq]=${id}&populate=*`
      );
      const data = await response.json();
      setProductNum(Number(data.data[0]?.attributes?.productNum) + 1 || 2);
      return dispatch({ type: "GET_CART", payload: data.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleIncrease = () => {
    const newProductNum = productNum + 1;
    setProductNum(newProductNum);
    updateCart(isProductExist, newProductNum);
  };

  const handleDecrease = () => {
    if (productNum > 1) {
      const newProductNum = productNum - 1;
      setProductNum(newProductNum);
      updateCart(isProductExist, newProductNum);
    }
    if (productNum === 1) {
      showDialog({
        title: t(
          "Are you sure you want to remove this product from your wishlist?"
        ),
        action: () => {
          deleteFromCart(isProductExist);
        },
      });
    }
  };

  // use effect to get data
  useEffect(() => {
    fetchData(id);
    fetshWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (isProductExist) {
      setProductNum(Number(isProductExist.attributes.productNum) || 1);
    }
  }, [isProductExist]);

  // Skeleton
  if (!state.product.data) {
    return <ProductSkeleton />;
  }

  return (
    <div className="product-container">
      <div className="product-card-container">
        <div className="product-card">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="image-gallery"
          >
            <ImageZoom
              src={`${mainUrl}${mainImage}`}
              alt={state.product.data.attributes.title}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="images-group"
            >
              {state.product.data.attributes.image.data.map((image) => {
                if (image.attributes.url === mainImage) {
                  return null;
                }
                return (
                  <img
                    key={image.id}
                    onClick={() => setMainImage(image.attributes.url)}
                    className="images-group-img"
                    src={`${mainUrl}${image.attributes.url}`}
                    alt={state.product.data.attributes.title}
                  />
                );
              })}
            </motion.div>
          </motion.div>

          <div className="product-info">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="product-title button-color"
              >
                {state.product.data.attributes.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="product-rating-container"
              >
                <div className="stars-container">
                  {[...Array(state.product.data.attributes.averageRating)].map(
                    (_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: -60, x: -60 }}
                        whileInView={{ opacity: 1, y: 0, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                      >
                        <Star className="stars" />
                      </motion.div>
                    )
                  )}
                </div>
                <span className="details-color">
                  {state.product.data.attributes.reviews.data.length} Reviews
                </span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="product-price"
              >
                <span>{t("Price")}:</span>{" "}
                <span className="button-color">
                  ${state.product.data.attributes.price}
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="description-container"
              >
                <motion.h3
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1 }}
                >
                  {t("Description")}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.3 }}
                  className="details-color"
                >
                  {state.product.data.attributes.body}
                </motion.p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="sizes-container"
            >
              <h3>{t("Sizes")}</h3>
              <div className="sizes-buttons">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`size-button ${
                      selectedSize === size ? "selected" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div
                className={`add-to-cart ${
                  isProductExist ? "add-to-cart-exist" : ""
                }`}
                onClick={() => {
                  if (!isProductExist) {
                    () => addToWishlist(state.product.data);
                  }
                }}
              >
                {isProductExist ? (
                  <>
                    <button
                      onClick={handleDecrease}
                      className="text-color productMinus-icon"
                    >
                      -
                    </button>
                    <p>{productNum}</p>

                    <button
                      onClick={handleIncrease}
                      className="text-color productPlus-icon"
                    >
                      +
                    </button>
                  </>
                ) : (
                  <button
                    className="add-to-cart-button"
                    onClick={() => addToWishlist(state.product.data)}
                  >
                    <Heart />
                    {t("Add to Cart")}
                  </button>
                )}
              </div>
              <Link to="/payment">
                <button className="buy-now-button">
                  <ShoppingCart />
                  {t("Buy Now")}
                </button>
              </Link>
            </motion.div>

            <div className="free-shipping">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex items-center gap-3"
              >
                <Truck />
                <span className="details-color">
                  {t("Free shipping on orders over")} $100
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="flex items-center gap-3"
              >
                <Shield />
                <span className="details-color">
                  {t("2-year warranty included")}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="comments-container">
        <h3>{t("Reviews")}</h3>
        <CommentForm id={id} />
        <div className="comments">
          {filteredReviews.map((review) => (
            <motion.div
              className="comment-card"
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Comments review={review} avatar={avatar} userId={userId} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
