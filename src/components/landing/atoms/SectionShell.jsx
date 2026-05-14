import React from 'react';
import '../landing.css';
import './SectionShell.css';

/**
 * Outer <section> wrapper for landing-page sections.
 * @param {'deep'|'base'|'lift'} tone — which background tone to apply.
 * @param {string} ariaLabel — accessible label.
 */
const SectionShell = ({ tone = 'base', ariaLabel, children }) => {
  return (
    <section
      className={`landing-section landing-section--${tone}`}
      aria-label={ariaLabel}
    >
      <div className="landing-section__container">
        {children}
      </div>
    </section>
  );
};

export default SectionShell;
