import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { useScrollFrames } from '../hooks/useScrollFrames';
import { useFrameSequencePreloader, useFrameImage } from '../hooks/useFrameSequencePreloader';
import ScrollContentOverlay from './ScrollContentOverlay';
import CornerCards from './CornerCards';
import './HolographicCityScroll.css';

/**
 * Loading Screen Component
 * Shows blue spinner while priority frames load
 */
const LoadingScreen = ({ progress }) => {
  return (
    <div className="holographic-loading">
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <div className="loading-text">Loading Urban Intelligence...</div>
        <div className="loading-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-label">{progress}%</div>
        </div>
      </div>
    </div>
  );
};

/**
 * Scroll Progress Indicator
 * Thin blue line at top of screen
 */
const ScrollProgressBar = ({ scrollProgress, isMounted }) => {
  if (!isMounted) return null;

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{
        scaleX: scrollProgress,
        transformOrigin: '0%'
      }}
    />
  );
};


/**
 * Canvas Renderer Component
 * Handles drawing frames to canvas with performance optimization
 */
const CanvasRenderer = ({ currentFrame, loadedFrames, containerRef }) => {
  const canvasRef = useRef(null);
  const currentFrameImage = useFrameImage(currentFrame, loadedFrames);

  // Handle canvas resize with maximum quality DPI scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      // Use higher DPI multiplier for better quality
      const dpr = Math.max(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();

      // Set display size (css pixels)
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';

      // Set actual size in memory (scaled to account for extra pixel density)
      // Use even higher resolution for crisp images
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Get context with quality settings
      const ctx = canvas.getContext('2d', {
        alpha: false,
        desynchronized: true,
        willReadFrequently: false
      });

      if (ctx) {
        // Scale context to match DPI
        ctx.scale(dpr, dpr);

        // Enable high-quality image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Canvas rendering with maximum quality
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const img = currentFrameImage;

      // Get display dimensions (CSS pixels)
      const rect = canvas.getBoundingClientRect();
      const displayWidth = rect.width;
      const displayHeight = rect.height;

      if (!img || !img.complete) {
        // Clear to black if no image
        ctx.fillStyle = '#070707';
        ctx.fillRect(0, 0, displayWidth, displayHeight);
        return;
      }

      // Clear canvas with black background
      ctx.fillStyle = '#070707';
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // Re-enable high quality rendering each time (some browsers reset this)
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Calculate aspect ratio to contain image
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = displayWidth / displayHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspect > canvasAspect) {
        // Image is wider - fit to width
        drawWidth = displayWidth;
        drawHeight = displayWidth / imgAspect;
        offsetX = 0;
        offsetY = (displayHeight - drawHeight) / 2;
      } else {
        // Image is taller - fit to height
        drawHeight = displayHeight;
        drawWidth = displayHeight * imgAspect;
        offsetX = (displayWidth - drawWidth) / 2;
        offsetY = 0;
      }

      // Draw image at calculated size for maximum quality
      // Using 9-parameter drawImage for precise control
      ctx.drawImage(
        img,
        0, 0, img.naturalWidth, img.naturalHeight, // Source rectangle (full image)
        offsetX, offsetY, drawWidth, drawHeight // Destination rectangle
      );
    };

    // Render on frame change
    render();
  }, [currentFrame, currentFrameImage]);

  // Glow intensity based on frame (peak during layer separation)
  const getGlowIntensity = () => {
    if (currentFrame >= 30 && currentFrame <= 70) {
      const progress = (currentFrame - 30) / 40;
      return 0.3 + (Math.sin(progress * Math.PI) * 0.3);
    }
    return 0.2;
  };

  return (
    <canvas
      ref={canvasRef}
      className="holographic-canvas"
      style={{
        '--glow-intensity': getGlowIntensity()
      }}
      aria-label={`Frame ${currentFrame} of holographic city animation`}
    />
  );
};

/**
 * Main HolographicCityScroll Component
 * Orchestrates entire scrollytelling experience
 */
const HolographicCityScroll = () => {
  const { containerRef, currentFrame, scrollYProgress, phase, isMounted } = useScrollFrames();
  const { isReady, progress, loadedFrames, isComplete } = useFrameSequencePreloader();

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Force scroll to top on mount/refresh
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);

    // Also handle browser back/forward navigation
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);


  // Keyboard navigation for frames (arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const scrollAmount = e.key === 'ArrowDown' ? 100 : -100;
        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Debug logging
  useEffect(() => {
    console.log('HolographicCityScroll State:', {
      isReady,
      progress,
      currentFrame,
      phase,
      isMounted,
      loadedFramesCount: Object.keys(loadedFrames).length
    });
  }, [currentFrame, phase, isReady]);

  // Show static final frame if reduced motion
  if (prefersReducedMotion) {
    return (
      <section className="holographic-static">
        <div className="holographic-static-content">
          <ScrollContentOverlay currentFrame={200} phase="cta" />
        </div>
      </section>
    );
  }

  // Show loading screen while priority frames load
  if (!isReady) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <div
      ref={containerRef}
      className="holographic-scroll-container"
      role="region"
      aria-label="Holographic city scrollytelling experience"
    >
      {/* Sticky canvas viewport */}
      <div className="holographic-sticky-wrapper">
        <div className="holographic-canvas-container">
          {/* Scroll progress indicator */}
          <ScrollProgressBar scrollProgress={scrollYProgress} isMounted={isMounted} />

          {/* Canvas */}
          <CanvasRenderer
            currentFrame={currentFrame}
            loadedFrames={loadedFrames}
            containerRef={containerRef}
          />

          {/* Scan line overlay */}
          <div className="holographic-scanline" aria-hidden="true"></div>

          {/* Content overlays */}
          <ScrollContentOverlay currentFrame={currentFrame} phase={phase} />

          {/* Corner cards (Phase 2) */}
          <CornerCards currentFrame={currentFrame} />

          {/* Loading status for remaining frames */}
          {!isComplete && (
            <div className="background-loading-indicator" aria-live="polite" aria-atomic="true">
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
            </div>
          )}
        </div>
      </div>

      {/* Spacer for scroll */}
      <div className="holographic-scroll-spacer" aria-hidden="true"></div>
    </div>
  );
};

export default HolographicCityScroll;
