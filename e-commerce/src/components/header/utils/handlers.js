// utils/handlers.js
export const handleSignOut = () => {
  localStorage.clear();
  window.location.href = "/";
};

export const toggleSettings = (event, setShowSettings) => {
  event.stopPropagation();
  setShowSettings((prev) => !prev);
};
