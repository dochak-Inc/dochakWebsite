import React from 'react';
import { motion } from 'motion/react';
import { useFrameOpacity } from '../hooks/useScrollFrames';
import './CornerCards.css';

/**
 * Feature Card for Four-Corner Layout
 * Displays during expansion phase (Frames 25-48)
 */
const FeatureCard = ({ title, metric, ctaLink, position, currentFrame, accentColor = '#58BDEC' }) => {
  // Fade in quickly: frames 25-32, FULLY visible by frame 36 (sticky frame), fade out: 43-48
  const opacity = useFrameOpacity(25, 32, 43, 48, currentFrame);

  // Position-specific slide-in animations
  const getInitialOffset = () => {
    switch (position) {
      case 'top-left':
        return { x: -100, y: -100 };
      case 'top-right':
        return { x: 100, y: -100 };
      case 'bottom-left':
        return { x: -100, y: 100 };
      case 'bottom-right':
        return { x: 100, y: 100 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialOffset = getInitialOffset();
  const progress = Math.max(0, Math.min(1, (currentFrame - 25) / 7)); // 0-1 over frames 25-32

  const slideX = initialOffset.x * (1 - progress);
  const slideY = initialOffset.y * (1 - progress);

  return (
    <motion.div
      className={`corner-card corner-card-${position}`}
      style={{
        opacity,
        '--accent-color': accentColor
      }}
      data-slide-x={slideX}
      data-slide-y={slideY}
      aria-hidden={opacity === 0}
    >
      <div className="corner-card-content">
        <div className="corner-card-metric">{metric}</div>
        <a href={ctaLink} className="corner-card-title">{title}</a>
      </div>
      <div className="corner-card-glow"></div>
    </motion.div>
  );
};

/**
 * CornerCards Component
 * Four-corner feature showcase for expansion phase
 */
const CornerCards = ({ currentFrame }) => {
  // Only render if in expansion phase (frames 25-48)
  if (currentFrame < 25 || currentFrame > 48) {
    return null;
  }

  const features = [
    {
      position: 'top-left',
      title: 'Research Papers',
      metric: '47+',
      ctaLink: '/disclosure',
      accentColor: '#58BDEC'
    },
    {
      position: 'top-right',
      title: 'Expert Team',
      metric: '15+',
      ctaLink: '/team',
      accentColor: '#10b981'
    },
    {
      position: 'bottom-left',
      title: 'Training Courses',
      metric: '10+',
      ctaLink: '/training',
      accentColor: '#10b981'
    },
    {
      position: 'bottom-right',
      title: 'Integrated Solutions',
      metric: '7+',
      ctaLink: '/solutions',
      accentColor: '#58BDEC'
    }
  ];

  return (
    <div className="corner-cards-container">
      {features.map((feature) => (
        <FeatureCard
          key={feature.position}
          {...feature}
          currentFrame={currentFrame}
        />
      ))}
    </div>
  );
};

export default CornerCards;
