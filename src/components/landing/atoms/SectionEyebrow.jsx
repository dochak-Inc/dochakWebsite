import React from 'react';
import './SectionEyebrow.css';

/** Small "01 · MISSION"-style label. Pass the full string in via the `text` prop. */
const SectionEyebrow = ({ text }) => {
  return <span className="landing-eyebrow">{text}</span>;
};

export default SectionEyebrow;
