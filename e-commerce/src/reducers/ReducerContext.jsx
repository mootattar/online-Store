import { createContext, useContext, useReducer } from "react";
import StoreReducer, { initialState } from "./StoreReducer";
import PropTypes from "prop-types";

export const ReducerContext = createContext();

export default function ReducerContextProvider({ children }) {
  const [state, dispatch] = useReducer(StoreReducer, initialState);
  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      {children}
    </ReducerContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(ReducerContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a ReducerContextProvider");
  }
  return context;
};

ReducerContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
