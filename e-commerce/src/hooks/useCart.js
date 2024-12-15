import { useState, useCallback } from "react";
import * as CartUtils from "../utils/cartUtils";
import { useStore } from "../reducers/ReducerContext";
import { useTranslation } from "react-i18next";
import { useToast } from "../components/shared/Context/ToastContext";

export const useCart = () => {
  const userId = localStorage.getItem("userId");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const { t } = useTranslation();
  const { handleShow } = useToast();
  const { dispatch } = useStore();

  const addToWishlist = useCallback(
    async (product) => {
      return await CartUtils.addToWishlist(
        product,
        userId,
        dispatch,
        handleShow,
        t
      );
    },
    [userId, dispatch, handleShow, t]
  );

  const updateCart = useCallback(
    (isProductExist, newProductNum) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeout = setTimeout(() => {
        CartUtils.updateServer(isProductExist, newProductNum, dispatch);
      }, 200);
      setDebounceTimeout(timeout);
    },
    [dispatch, debounceTimeout]
  );

  const deleteFromCart = useCallback(
    (isProductExist) => {
      return CartUtils.handleDelete(isProductExist, dispatch, handleShow, t);
    },
    [dispatch, handleShow, t]
  );

  return {
    addToWishlist,
    updateCart,
    deleteFromCart,
  };
};
