import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState({
    title: "",
    action: () => {},
  });

  const showDialog = ({ title, action }) => {
    setDialogData({ title, action });
    setIsOpen(true);
  };

  const hideDialog = () => {
    setIsOpen(false);
    setDialogData({ title: "", action: () => {} });
  };

  return (
    <DialogContext.Provider
      value={{ isOpen, dialogData, showDialog, hideDialog }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);

DialogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
