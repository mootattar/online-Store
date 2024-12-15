import { useState } from "react";
import PropTypes from "prop-types";
import "./styles/Zoom.css";

export function ImageZoom({ src, alt }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      className="zoomable-image-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      style={{
        maxWidth: "450px",
      }}
    >
      <img src={src} alt={alt} className="zoomable-image" />
      {showZoom && (
        <div
          className="zoom-overlay"
          style={{
            backgroundImage: `url(${src})`,
            backgroundColor: "white",
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: "250%",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  );
}

ImageZoom.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
