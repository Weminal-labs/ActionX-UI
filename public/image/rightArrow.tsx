import React from "react";

interface rightArrowProps {
  width?: string;
  height?: string;
}

const RightArrow: React.FC<rightArrowProps> = ({
  width = "32",
  height = "33",
}) => {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 52 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.6531 24.4826L3.71922 52.577L51.6947 23.2854L0.462587 0.78058L32.6531 24.4826Z"
          fill="black"
          className="fill-theme-dark"
        />
      </svg>
    </div>
  );
};

export default RightArrow;
