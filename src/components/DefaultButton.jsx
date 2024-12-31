import React from "react";
import PropTypes from "prop-types";
import "./DefaultButton.css";

const DefaultButton = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      className={`default-button  ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

DefaultButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default DefaultButton;
