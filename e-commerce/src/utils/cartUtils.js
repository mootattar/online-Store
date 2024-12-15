// src/utils/cartUtils.js
const mainUrl = import.meta.env.VITE_API_URL;
export const addToWishlist = async (product, userId, dispatch, handleShow) => {
  try {
    const res = await fetch(`${mainUrl}/api/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          title: product.attributes.title,
          body: product.attributes.body,
          price: product.attributes.price,
          image: product.attributes.image.data[0].id,
          productNum: 1,
          currentId: product.id,
          userId: userId,
        },
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      handleShow("Error you should login first.");
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...data.data,
        currentId: product.id,
        userId: userId,
        image: product.attributes.image.data[0].attributes.url,
      },
    });
    handleShow("Product added to wishlist successfully");
    return data.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const updateServer = async (isProductExist, newProductNum, dispatch) => {
  if (!isProductExist) return;
  try {
    await fetch(`${mainUrl}/api/carts/${isProductExist.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          productNum: newProductNum,
        },
      }),
    });
    dispatch({
      type: "UPDATE_CART",
      payload: {
        ...isProductExist,
        attributes: {
          ...isProductExist.attributes,
          productNum: newProductNum,
        },
      },
    });
  } catch (error) {
    console.error("Error updating product in cart:", error);
  }
};

export const handleDelete = async (isProductExist, dispatch, handleShow) => {
  try {
    const response = await fetch(`${mainUrl}/api/carts/${isProductExist.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      handleShow("Product removed from wishlist successfully");
      return dispatch({ type: "DELETE_CART", payload: isProductExist.id });
    }
  } catch (error) {
    console.error("Error deleting product from cart:", error);
  }
};
