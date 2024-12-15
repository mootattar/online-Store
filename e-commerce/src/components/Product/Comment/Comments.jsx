import { Star, Trash2, Pencil } from "lucide-react";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import "./styles/comments.css";
import {
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
} from "../shared/starHandlers";

import { useDialog } from "../../shared/Context/dialogContext";
import { CommentsContext } from "../shared/CommentsContext";
import { useStore } from "../../../reducers/ReducerContext";
import { useToast } from "../../shared/Context/ToastContext";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../../../hooks/useDebounce";
import useReviewsActions from "../../../hooks/useComment";
// mainURL
const mainUrl = import.meta.env.VITE_API_URL;

export default function Comments({ avatar, review }) {
  const { handleShow } = useToast();
  const { dispatch } = useStore();
  const { t } = useTranslation();

  const [currentComment, setCurrentComment] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [selectedStars, setSelectedStars] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const [hoveredStars, setHoveredStars] = useState(0);

  // contexts
  const { userId } = useContext(CommentsContext);

  // custom hooks
  const { showDialog } = useDialog();
  const { debounceFunction } = useDebounce(setEditedComment, 100);
  const { handleDelete, updateReview, error, inputRef } = useReviewsActions(
    mainUrl,
    dispatch,
    handleShow,
    selectedStars,
    editedComment
  );
  const handleUpdate = (id, e) => {
    updateReview(id, e);
    setEditMode(false);
    setEditedComment("");
    setSelectedStars(0);
  };

  const handleEdit = (id, stars, comment) => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
    setEditedComment(comment);
    setSelectedStars(stars);
    setEditMode(true);
    setCurrentComment(id);
  };

  const handleCancel = () => {
    setEditedComment("");
    setEditMode(false);
    setSelectedStars(0);
  };

  return (
    <>
      <div className="user-info-container">
        <div className="user-info">
          <div className="user-details-container">
            <div className="user-details">
              <img src={avatar} alt="User Avatar" className="avatar" />
              <h6 className="username">{review.attributes.auther}</h6>
            </div>
            <p className="timestamp">{review.attributes.Time}</p>
          </div>
        </div>
        <div className="stars-container">
          <div>
            {editMode && currentComment === review.id
              ? [...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="stars"
                    onMouseEnter={() =>
                      handleMouseEnter(index, setHoveredStars)
                    }
                    onMouseLeave={() => handleMouseLeave(setHoveredStars)}
                    onClick={() =>
                      handleClick(index, selectedStars, setSelectedStars)
                    }
                    style={{
                      fill:
                        index < (hoveredStars || selectedStars)
                          ? "#facc15"
                          : "",
                      color: "#facc15",
                      cursor: "pointer",
                    }}
                  />
                ))
              : [...Array(review.attributes.stars)].map((_, index) => (
                  <Star
                    key={index}
                    style={{ color: "#facc15", fill: "#facc15" }}
                  />
                ))}
          </div>
          {review.attributes.userId === userId && (
            <div className="review-actions">
              <div
                className="tooltip"
                onClick={() =>
                  handleEdit(
                    review.id,
                    review.attributes.stars,
                    review.attributes.review
                  )
                }
              >
                <Pencil className="edit-icon" />
                {/* tooltip Text */}
                <span className="tooltiptext"> Edit </span>
                {/* tooltip svg */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 800 800"
                  width="100"
                  height="100"
                  className="tooltip-icon left-arrow"
                >
                  <g
                    strokeWidth="10"
                    stroke="hsl(205, 69%, 50%)"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="matrix(1,0,0,1,-105,0)"
                  >
                    <path
                      d="M281.5704803466797 369.4478759765625Q705.5704803466797 284.4478759765625 370.5704803466797 458.4478759765625 "
                      markerEnd={`url(#SvgjsMarkers${review.id})`}
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
                      id={`SvgjsMarkers${review.id}`}
                    >
                      <polyline
                        points="0,5 5,2.5 0,0"
                        fill="none"
                        strokeWidth="1.6666666666666667"
                        stroke="hsl(205, 69%, 50%)"
                        strokeLinecap="round"
                        transform="matrix(1,0,0,1,1.6666666666666667,2.5)"
                        strokeLinejoin="round"
                      ></polyline>
                    </marker>
                  </defs>
                </svg>
              </div>

              <div
                className="tooltip"
                onClick={() =>
                  showDialog({
                    title: t("are you sure you want to delete this comment?"),
                    action: () => handleDelete(review.id),
                  })
                }
              >
                <Trash2 className="trash-icon" />
                {/* tooltip Text */}
                <span className="tooltiptext trash">{t("Delete")}</span>
                {/* tooltip svg */}
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
                      markerEnd={`url(#SvgjsMarker${review.id})`}
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
                      id={`SvgjsMarker${review.id}`}
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
            </div>
          )}
        </div>
      </div>
      {editMode && currentComment === review.id ? (
        <>
          <form onSubmit={(e) => handleUpdate(review.id, e)}>
            <input
              type="text"
              onChange={(e) => debounceFunction(e)}
              defaultValue={review.attributes.review}
              id="comment"
              className={`edit-input ${error ? "input-error" : ""}`}
              ref={inputRef}
            />
            <label
              htmlFor="comment"
              className={`label ${error ? "label-error" : ""}`}
            >
              {t(error)}
            </label>
            <div className="comment-edit-actions">
              <button className="button" type="submit">
                Submit
              </button>
              <button
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  showDialog({
                    title: t(
                      "are you sure you don't want to update this comment?"
                    ),
                    action: handleCancel,
                  });
                }}
              >
                {t("Cancel")}
              </button>
            </div>
          </form>
        </>
      ) : (
        <p className="comment-text">{review.attributes.review}</p>
      )}
    </>
  );
}

Comments.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    attributes: PropTypes.shape({
      auther: PropTypes.string,
      Time: PropTypes.string,
      review: PropTypes.string,
      stars: PropTypes.number,
      userId: PropTypes.string,
    }),
  }).isRequired,
  avatar: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};
