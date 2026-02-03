import React from 'react';
import { motion } from 'motion/react';
import { useFrameOpacity } from '../hooks/useScrollFrames';
import logo from '../assets/logo.webp';
import './ScrollContentOverlay.css';
import { Link } from 'react-router-dom';

/**
 * Phase 1: Introduction Content (Frames 1-12)
 * City on RIGHT, content on LEFT
 */
const IntroContent = ({ currentFrame }) => {
  // Fully visible immediately at frame 1, fade out before frame 12
  const opacity = useFrameOpacity(1, 1, 10, 12, currentFrame);

  return (
    <motion.div
      className="scroll-content intro-content"
      style={{
        opacity,
        transform: 'translateY(0px)',
      }}
    >
      <div className="intro-text-block">
        <img src={logo} alt="Dochak Logo" className="intro-logo" />
        <h1 className="intro-title">
          Urban Mobility Revolution
        </h1>
        <p className="intro-tagline">Driving the Future: Smarter, Safer, and Seamless Mobility</p>
        <Link to="/about" className="intro-cta-button">
          Learn More
          <svg className="intro-cta-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

/**
 * Phase 3: Deep Dive Content (Frames 25-38)
 * City on LEFT, content on RIGHT
 */
const DeepDiveContent = ({ currentFrame }) => {
  const opacity = useFrameOpacity(25, 26, 37, 38, currentFrame);
  const descOpacity = useFrameOpacity(26, 26, 37, 38, currentFrame);
  const codeOpacity = useFrameOpacity(27, 27, 37, 38, currentFrame);

  return (
    <motion.div
      className="scroll-content deepdive-content"
      style={{ opacity }}
    >
      <div className="deepdive-text-block">
        <h2 className="deepdive-heading">Smart Mobility Centre of Excellence</h2>

        <p
          className="deepdive-description"
          style={{ opacity: descOpacity }}
        >
          Revolutionizing urban mobility through cutting-edge AI-driven autonomous driving, intelligent traffic operations, and innovative management solutions
        </p>

        <div
          className="deepdive-code-snippet"
          style={{ opacity: codeOpacity }}
        >
          <pre>
            <code>{`{
  "projects": [
    "Naepo Digital Twin",
    "Daejeon-Jeju Tele-driving",
    "Daejeon Public Transport",
    "Incheon Airport Parking"
  ],
  "status": "Ongoing",
  "impact": "City-wide"
}`}</code>
          </pre>
          <Link to="/projects" className="deepdive-code-cta">
            View All Projects
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Phase 4: Call to Action (Frames 39-50)
 * City on LEFT, CTA on RIGHT
 */
const CTAContent = ({ currentFrame }) => {
  // Fade in quickly, FULLY visible by frame 43 (before frame 50 sticky), stay until end
  const opacity = useFrameOpacity(37, 43, 50, 51, currentFrame);

  return (
    <motion.div
      className="scroll-content cta-content"
      style={{ opacity }}
    >
      <div className="cta-text-block">
        <h2 className="cta-heading">Shape the Future of Urban Mobility</h2>
        <p className="cta-subheading">
          Together, with innovation, dedication, and teamwork, we can make our vision a reality
        </p>

        <div className="cta-buttons">
          <Link to="/solutions" className="cta-button cta-primary">
            Explore Solutions
          </Link>
          <Link to="/get-in-touch" className="cta-button cta-secondary">
            Get in Touch
          </Link>
        </div>

        <div className="cta-trust-badge">
          Serving Korea, Middle East, Australia & Southeast Asia
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Main ScrollContentOverlay Component
 * Renders appropriate content based on current frame/phase
 */
const ScrollContentOverlay = ({ currentFrame, phase }) => {
  return (
    <div className="scroll-content-overlay">
      {/* Phase 1: Introduction (frames 1-12) */}
      {phase === 'intro' && <IntroContent currentFrame={currentFrame} />}

      {/* Phase 3: Deep Dive (frames 25-38) */}
      {phase === 'deepDive' && <DeepDiveContent currentFrame={currentFrame} />}

      {/* Phase 4: CTA (frames 39-50) */}
      {phase === 'cta' && <CTAContent currentFrame={currentFrame} />}
    </div>
  );
};

export default ScrollContentOverlay;
