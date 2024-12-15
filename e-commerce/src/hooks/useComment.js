import { useState, useRef } from "react";

const useReviewsActions = (
  mainUrl,
  dispatch,
  handleShow,
  selectedStars,
  editedComment
) => {
  const inputRef = useRef(null);
  const [error, setError] = useState("");

  const handleDelete = (id) => {
    fetch(`${mainUrl}/api/reviews/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        handleShow("Review deleted successfully");
        return response.json();
      })
      .then(() => {
        dispatch({ type: "DELETE_REVIEW", payload: id });
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  const updateReview = (id, e) => {
    e.preventDefault();
    if (selectedStars === 0 || editedComment === "") {
      inputRef.current.focus();
      return setError("Please select a rating and enter a comment.");
    }
    fetch(`${mainUrl}/api/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          review: editedComment,
          stars: selectedStars,
        },
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
    dispatch({
      type: "UPDATE_REVIEW",
      payload: { id, stars: selectedStars, review: editedComment },
    });
    handleShow("Review updated successfully");
  };

  return {
    handleDelete,
    updateReview,
    error,
    inputRef,
  };
};

export default useReviewsActions;
