import React from 'react';
import "../../styles/SectionTitle.css";

const SectionTitle = ({ label, title, align = 'left', light = false }) => {
  return (
    <div className={`section-title section-title--${align} ${light ? 'section-title--light' : ''}`}>
      {label && <span className="section-title__label">{label}</span>}
      <h2 className="section-title__heading">{title}</h2>
    </div>
  );
};

export default SectionTitle;
