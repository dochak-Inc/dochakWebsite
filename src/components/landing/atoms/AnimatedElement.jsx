import React from 'react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import './AnimatedElement.css';

/**
 * Wraps children in a scroll-triggered fade-up animation.
 * @param {number} delay — animation delay in ms.
 * @param {string} className — additional class names for the wrapper.
 */
const AnimatedElement = ({ children, delay = 0, className = '' }) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={elementRef}
      className={`landing-animated ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;
