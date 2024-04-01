import React from "react";
import PropTypes from 'prop-types';

export default function Button({ children, textOnly = '', className, ...props }) {
  const cssClasses = textOnly
    ? `text-button ${className}`
    : `button ${className}`;
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string,
  textOnly: PropTypes.bool,
  className: PropTypes.string,
  props: PropTypes.object,
}