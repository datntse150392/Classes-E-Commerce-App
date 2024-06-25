import React, { useState } from "react";

function ColorSelector({ color, colorHex }) {
  const [hoveredColor, setHoveredColor] = useState(null);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Colors</h3>
      <div className="flex space-x-2">
        <span
          key={color}
          onMouseEnter={() => setHoveredColor(color)}
          onMouseLeave={() => setHoveredColor(null)}
          data-tooltip-id="my-tooltip"
          data-tooltip-content={color}
          data-tooltip-place="top"
          className="w-8 h-8 cursor-pointer rounded-full border border-gray-300"
          style={{
            backgroundColor: colorHex,
            opacity: hoveredColor === color ? 0.7 : 1, // Makes the color lighter on hover
            transition: "opacity 0.3s ease-in-out",
            boxShadow:
              hoveredColor === color
                ? "0 0 8px 2px rgba(255, 255, 255, 0.8)"
                : "none", // Optional shadow effect
          }}
        />
      </div>
    </div>
  );
}

export default ColorSelector;
