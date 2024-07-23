import React from "react";

interface LogoActionxProps {
  width?: number;
  height?: number;
}

const LogoActionx: React.FC<LogoActionxProps> = ({
  width = "155",
  height = "148",
}) => {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 155 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group 1">
          <path
            id="Star 1"
            d="M94.5325 22.2333L78.865 53.1502L119.266 119.732L61.3424 69.7878L29.6556 83.8331L45.323 52.9161L32.4384 21.7999L62.8456 36.2786L94.5325 22.2333Z"
            className="fill-theme-dark"
          />
          <path
            id="Star 2"
            d="M78.7366 35.8242L71.0932 52.1019L108.286 106.858L62.1033 60.6377L45.4516 67.4279L53.095 51.1503L45.4179 34.0626L62.085 42.6144L78.7366 35.8242Z"
            className="fill-theme-light"
          />
        </g>
      </svg>
    </div>
  );
};
export default LogoActionx;
