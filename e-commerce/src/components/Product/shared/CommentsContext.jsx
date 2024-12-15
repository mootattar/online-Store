import { createContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useStore } from "../../../reducers/ReducerContext";
import { useToast } from "../../shared/Context/ToastContext";
import { useTranslation } from "react-i18next";

// mainURL
const mainUrl = import.meta.env.VITE_API_URL;

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  // translatoin
  const { t } = useTranslation();
  // custom hooks
  const { state, dispatch } = useStore();
  const { handleShow } = useToast();
  // add comment
  const [error, setError] = useState("");

  // userData
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  // filtered comments
  const [sortOption, setSortOption] = useState("");
  const [filterStars, setFilterStars] = useState(0);

  const handleSort = (option) => {
    setSortOption(option);
  };
  const handleFilter = (stars) => {
    setFilterStars(stars);
  };

  const filteredReviews = useMemo(() => {
    let updatedReviews = [...state.reviews.data];

    if (filterStars !== 0) {
      updatedReviews = updatedReviews.filter(
        (review) => review.attributes.stars === filterStars
      );
    }

    switch (sortOption) {
      case "highest":
        updatedReviews.sort((a, b) => b.attributes.stars - a.attributes.stars);
        break;
      case "lowest":
        updatedReviews.sort((a, b) => a.attributes.stars - b.attributes.stars);
        break;
      case "newest":
        updatedReviews.sort(
          (a, b) =>
            new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
        );
        break;
      case "oldest":
        updatedReviews.sort(
          (a, b) =>
            new Date(a.attributes.createdAt) - new Date(b.attributes.createdAt)
        );
        break;
      default:
        break;
    }

    return updatedReviews;
  }, [state.reviews.data, filterStars, sortOption]);

  // useEffect to get users Data

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setUserName(localStorage.getItem("username"));
  }, []);

  // add comment

  const handleRating = () => {
    const productsWithAverageRating = state.reviews.data.reduce(
      (sum, review) => sum + review.attributes.stars,
      0
    );
    const averageRating =
      state.reviews.data.length > 0
        ? Math.round(productsWithAverageRating / state.reviews.data.length)
        : 0;
    return averageRating;
  };

  const handleAddComment = async (e, id, stars, comment) => {
    e.preventDefault();

    if (comment.trim() === "" || stars === 0) {
      return setError(t("Please select a rating and enter a comment."));
    }
    if (!userId) {
      return setError(t("Please login to submit a review."));
    }

    try {
      dispatch({ type: "GET_REVIEWS_REQUEST" });

      const now = new Date();
      const formattedDate = now.toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        hour12: true,
      });

      const reviewResponse = await fetch(`${mainUrl}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            review: comment,
            auther: userName,
            stars: stars,
            product: id,
            userId: userId,
            Time: formattedDate,
          },
        }),
      });

      if (!reviewResponse.ok) {
        throw new Error("Failed to add review.");
      }

      const reviewData = await reviewResponse.json();
      dispatch({ type: "ADD_REVIEW", payload: reviewData.data });

      handleShow("Review added successfully");

      const productResponse = await fetch(
        `${mainUrl}/api/products/${id}?populate=*`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              averageRating: handleRating(),
            },
          }),
        }
      );

      if (!productResponse.ok) {
        throw new Error("Failed to update product average rating.");
      }
      const productData = await productResponse.json();
      dispatch({ type: "UPDATE_PRODUCT", payload: productData.data });
      setError("");
    } catch (error) {
      dispatch({ type: "GET_REVIEWS_FAILURE" });
      console.error("Error adding comment:", error);
      setError("An error occurred while adding your comment.");
    }
  };

  return (
    <CommentsContext.Provider
      value={{
        error,
        sortOption,
        setSortOption,
        filterStars,
        setFilterStars,
        setError,
        handleAddComment,
        handleSort,
        handleFilter,
        filteredReviews,
        userId,
        userName,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
CommentsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
