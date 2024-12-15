export const handleMouseEnter = (index, setHoveredStars) => {
  setHoveredStars(index + 1);
};

export const handleMouseLeave = (setHoveredStars) => {
  setHoveredStars(0);
};

export const handleClick = (index, selectedStars, setSelectedStars) => {
  if (index + 1 === selectedStars) {
    setSelectedStars(0);
  } else {
    setSelectedStars(index + 1);
  }
};
