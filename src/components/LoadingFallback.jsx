import React from 'react';
import './LoadingFallback.css';

/**
 * Loading fallback component for lazy-loaded routes
 * Shows a minimal spinner while route components load
 */
const LoadingFallback = () => {
  return (
    <div className="loading-fallback">
      <div className="loading-fallback-spinner">
        <div className="loading-fallback-ring"></div>
      </div>
      <p className="loading-fallback-text">Loading...</p>
    </div>
  );
};

export default LoadingFallback;
