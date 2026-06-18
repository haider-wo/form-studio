import React from 'react';
import "../../styles/Button.css";

const Button = ({ children, variant = 'primary', size = 'md', className = '', onClick, href, ...props }) => {
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      className={`btn btn--${variant} btn--${size} ${className}`}
      onClick={onClick}
      href={href}
      {...props}
    >
      <span className="btn__text">{children}</span>
      <span className="btn__magnetic" aria-hidden="true" />
    </Tag>
  );
};

export default Button;
