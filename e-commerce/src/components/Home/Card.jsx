import Proptypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { useStore } from "../../reducers/ReducerContext";
import { useState } from "react";
const mainUrl = import.meta.env.VITE_API_URL;
export default function Card({ product }) {
  const { state } = useStore();
  const { t } = useTranslation();
  const { addToWishlist, updateCart } = useCart();
  const isProductExist = state?.cart?.data?.find(
    (item) => item?.attributes?.currentId == product.id
  );
  const [productNum, setProductNum] = useState(
    Number(isProductExist?.attributes?.productNum) + 1 || 2
  );
  const handleAdd = () => {
    if (isProductExist) {
      setProductNum(productNum + 1);
      return updateCart(isProductExist, productNum);
    }
    addToWishlist(product);
  };
  return (
    <>
      <div className="card-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <img
            src={`${mainUrl}${product.attributes.image.data[0].attributes.url}`}
            alt={product.attributes.title}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              backgroundColor: "var(--card-background)",
              borderRadius: "10px",
            }}
            loading="lazy"
          />
          <div className="fadeInDown card-title">
            <div className="flx-center">
              <p className="card-rating">+{product.attributes.averageRating}</p>
              <Star size={16} className="card-stars" />
            </div>
            <div>
              {product.attributes.title
                .split("")
                .map((char, index) =>
                  char === " " ? (
                    <span key={index} style={{ whiteSpace: "pre" }}></span>
                  ) : (
                    <span key={index}>{char}</span>
                  )
                )}
            </div>
          </div>
          <div
            style={{
              alignSelf: "flex-start",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            className="details-color"
          >
            {product.attributes.body}
          </div>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ direction: "ltr" }}>
            <span className="dolarIcon">$</span>
            <span className="fadeInDown product-price">
              {product.attributes.price
                .toString()
                .split("")
                .map((char, index) => (
                  <span key={index}>{char}</span>
                ))}
            </span>
          </div>
          <div className="flx-center card-actions">
            <Link to={`/product/${product.id}`} className="tooltip">
              <svg
                width="25"
                height="25"
                viewBox="0 0 30 30"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="eye-icon"
              >
                <defs>
                  <path
                    d="M0,15.089434 C0,16.3335929 5.13666091,24.1788679 14.9348958,24.1788679 C24.7325019,24.1788679 29.8697917,16.3335929 29.8697917,15.089434 C29.8697917,13.8456167 24.7325019,6 14.9348958,6 C5.13666091,6 0,13.8456167 0,15.089434 Z"
                    id={`path-${product.id}`}
                  ></path>
                  <mask id={`mask-${product.id}`}>
                    <rect width="100%" height="100%" fill="white"></rect>
                    <use
                      xlinkHref={`#path-${product.id}`}
                      className="lid"
                      fill="black"
                    />
                  </mask>
                </defs>
                <g className="eye">
                  <path
                    d="M0,15.089434 C0,16.3335929 5.13666091,24.1788679 14.9348958,24.1788679 C24.7325019,24.1788679 29.8697917,16.3335929 29.8697917,15.089434 C29.8697917,13.8456167 24.7325019,6 14.9348958,6 C5.13666091,6 0,13.8456167 0,15.089434 Z M14.9348958,22.081464 C11.2690863,22.081464 8.29688487,18.9510766 8.29688487,15.089434 C8.29688487,11.2277914 11.2690863,8.09740397 14.9348958,8.09740397 C18.6007053,8.09740397 21.5725924,11.2277914 21.5725924,15.089434 C21.5725924,18.9510766 18.6007053,22.081464 14.9348958,22.081464 L14.9348958,22.081464 Z M18.2535869,15.089434 C18.2535869,17.0200844 16.7673289,18.5857907 14.9348958,18.5857907 C13.1018339,18.5857907 11.6162048,17.0200844 11.6162048,15.089434 C11.6162048,13.1587835 13.1018339,11.593419 14.9348958,11.593419 C15.9253152,11.593419 14.3271242,14.3639878 14.9348958,15.089434 C15.451486,15.7055336 18.2535869,14.2027016 18.2535869,15.089434 L18.2535869,15.089434 Z"
                    fill="#FFFFFF"
                  ></path>
                  <use
                    xlinkHref={`#path-${product.id}`}
                    mask={`url(#mask-${product.id})`}
                    fill="#FFFFFF"
                  />
                </g>
              </svg>
              <span className="tooltiptext">{t("See more")}</span>
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
                      stroke="hsl(205, 69%, 50%)"
                      strokeLinecap="round"
                      transform="matrix(1,0,0,1,1.6666666666666667,2.5)"
                      strokeLinejoin="round"
                    ></polyline>
                  </marker>
                </defs>
              </svg>
            </Link>
            <div className="tooltip" onClick={handleAdd}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cart-icon"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.04047 2.29242C2.6497 2.15503 2.22155 2.36044 2.08416 2.7512C1.94678 3.14197 2.15218 3.57012 2.54295 3.7075L2.80416 3.79934C3.47177 4.03406 3.91052 4.18961 4.23336 4.34802C4.53659 4.4968 4.67026 4.61723 4.75832 4.74609C4.84858 4.87818 4.91828 5.0596 4.95761 5.42295C4.99877 5.80316 4.99979 6.29837 4.99979 7.03832L4.99979 9.64C4.99979 12.5816 5.06302 13.5523 5.92943 14.4662C6.79583 15.38 8.19028 15.38 10.9792 15.38H16.2821C17.8431 15.38 18.6236 15.38 19.1753 14.9304C19.727 14.4808 19.8846 13.7164 20.1997 12.1875L20.6995 9.76275C21.0466 8.02369 21.2202 7.15417 20.7762 6.57708C20.3323 6 18.8155 6 17.1305 6H6.49233C6.48564 5.72967 6.47295 5.48373 6.4489 5.26153C6.39517 4.76515 6.27875 4.31243 5.99677 3.89979C5.71259 3.48393 5.33474 3.21759 4.89411 3.00139C4.48203 2.79919 3.95839 2.61511 3.34187 2.39838L3.04047 2.29242ZM13 8.25C13.4142 8.25 13.75 8.58579 13.75 9V10.25H15C15.4142 10.25 15.75 10.5858 15.75 11C15.75 11.4142 15.4142 11.75 15 11.75H13.75V13C13.75 13.4142 13.4142 13.75 13 13.75C12.5858 13.75 12.25 13.4142 12.25 13V11.75H11C10.5858 11.75 10.25 11.4142 10.25 11C10.25 10.5858 10.5858 10.25 11 10.25H12.25V9C12.25 8.58579 12.5858 8.25 13 8.25Z"
                  fill="#1C274C"
                />
                <path
                  className="left-couche"
                  d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                  fill="#1C274C"
                />
                <path
                  className="right-couche"
                  d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                  fill="#1C274C"
                />
              </svg>
              <span className="tooltiptext">{t("add to cart")}</span>
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
                  stroke="hsl(205, 69%, 50%)"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="matrix(1,0,0,1,-105,0)"
                >
                  <path
                    d="M281.5704803466797 369.4478759765625Q705.5704803466797 284.4478759765625 370.5704803466797 458.4478759765625 "
                    markerEnd={`url(#SvgjsMarke${product.id})`}
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
                    id={`SvgjsMarke${product.id}`}
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
          </div>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  product: Proptypes.object,
};
