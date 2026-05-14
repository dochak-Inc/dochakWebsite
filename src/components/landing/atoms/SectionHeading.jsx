import React from 'react';
import './SectionHeading.css';

/** Section-level heading. Defaults to <h2>. */
const SectionHeading = ({ children, as: Tag = 'h2', className = '' }) => {
  return (
    <Tag className={`landing-heading ${className}`}>
      {children}
    </Tag>
  );
};

export default SectionHeading;
