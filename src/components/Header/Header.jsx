import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header-container">
        <h1 className="logo">SyntaxSprint</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="38px"
          viewBox="0 -960 960 960"
          width="38px"
          fill="#65c96a"
          className="logo-svg"
        >
          <path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
        </svg>
      </div>
    </>
  );
};

export default Header;
