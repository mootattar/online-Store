export const initialState = {
  products: {
    data: [],
    loading: false,
    error: false,
  },
  product: {
    data: null,
    loading: false,
    error: false,
  },
  cart: {
    data: [],
    loading: false,
    error: false,
  },
  reviews: {
    data: [],
    loading: false,
    error: false,
  },
};

export default function StoreReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCT_REQUEST":
      return {
        ...state,
        product: {
          loading: true,
          error: false,
        },
      };
    case "GET_PRODUCT_FAILURE":
      return {
        ...state,
        product: {
          loading: true,
          error: true,
        },
      };
    case "GET_PRODUCT":
      return {
        ...state,
        product: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };

    case "GET_PRODUCTS_REQUEST":
      return {
        ...state,
        products: {
          loading: true,
          error: false,
        },
      };
    case "GET_PRODUCTS_FAILURE":
      return {
        ...state,
        products: {
          loading: true,
          error: true,
        },
      };
    case "GET_PRODUCTS":
      return {
        ...state,
        products: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        product: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };
    case "GET_CART_REQUEST":
      return {
        ...state,
        cart: {
          loading: true,
          error: false,
        },
      };
    case "GET_CART_FAILURE":
      return {
        ...state,
        cart: {
          loading: false,
          error: true,
        },
      };

    case "GET_CART":
      return {
        ...state,
        cart: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };

    case "ADD_TO_CART": {
      const newProduct = [...state.cart.data, action.payload];
      return {
        ...state,
        cart: {
          data: newProduct,
          loading: false,
          error: false,
        },
      };
    }
    case "DELETE_CART": {
      const deletedProduct = state.cart.data.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        cart: {
          data: deletedProduct,
          loading: false,
          error: false,
        },
      };
    }

    case "GET_REVIEWS_REQUEST":
      return {
        ...state,
        reviews: {
          data: [...state.reviews.data],
          loading: true,
          error: false,
        },
      };
    case "GET_REVIEWS_FAILURE":
      return {
        ...state,
        reviews: {
          data: [...state.reviews.data],
          loading: false,
          error: true,
        },
      };
    case "GET_REVIEWS":
      return {
        ...state,
        reviews: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };

    case "ADD_REVIEW": {
      const newReview = [...state.reviews.data, action.payload];
      return {
        ...state,
        reviews: {
          data: newReview,
          loading: false,
          error: false,
        },
      };
    }

    case "UPDATE_REVIEW":
      return {
        ...state,
        reviews: {
          data: state.reviews.data.map((review) => {
            if (review.id === action.payload.id) {
              return {
                ...review,
                attributes: {
                  ...review.attributes,
                  review: action.payload.review,
                  stars: action.payload.stars,
                },
              };
            }
            return review;
          }),
          loading: false,
          error: false,
        },
      };

    case "DELETE_REVIEW":
      return {
        ...state,
        reviews: {
          data: state.reviews.data.filter(
            (review) => review.id !== action.payload
          ),
          loading: false,
          error: false,
        },
      };
    default:
      return state;
  }
}
