import { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { useMotionValue } from 'motion/react';
import { getContentPhase, getPhaseProgress } from '../utils/frameLoader';
import { mapScrollToFrame } from '../utils/frameDuplication';

/**
 * Custom hook to map scroll position to frame index
 * Uses custom scroll tracking for better reliability
 *
 * @param {Object} options - Configuration options
 * @param {number} options.totalFrames - Total number of frames (default: 50)
 * @returns {Object} Scroll frame data and refs
 */
export const useScrollFrames = ({ totalFrames = 50 } = {}) => {
  const containerRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [phase, setPhase] = useState('intro');
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const scrollYProgress = useMotionValue(0);

  // Wait for component to mount
  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  // Custom scroll tracking
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      // Get container position
      const rect = container.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Current scroll position
      const scrollTop = window.scrollY;

      // Calculate how far we've scrolled into the container
      const scrollIntoContainer = scrollTop - containerTop;

      // Total scrollable distance (container height minus viewport)
      const scrollableDistance = containerHeight - viewportHeight;

      // Calculate progress (0 to 1)
      let progress = 0;
      if (scrollableDistance > 0) {
        progress = scrollIntoContainer / scrollableDistance;
        progress = Math.max(0, Math.min(1, progress));
      }

      // Update motion value
      scrollYProgress.set(progress);

      // Calculate frame number using duplication mapping (1 to 50)
      const frame = mapScrollToFrame(progress);
      const clampedFrame = Math.max(1, Math.min(totalFrames, frame));

      // Debug logging
      if (Math.abs(clampedFrame - currentFrame) > 0) {
        console.log('Scroll Update:', {
          scrollTop,
          containerTop,
          scrollIntoContainer,
          scrollableDistance,
          progress: progress.toFixed(3),
          frame: clampedFrame
        });
      }

      if (clampedFrame !== currentFrame) {
        setCurrentFrame(clampedFrame);
        setPhase(getContentPhase(clampedFrame));
        setPhaseProgress(getPhaseProgress(clampedFrame));
      }
    };

    // Initial calculation after a short delay to ensure DOM is ready
    const timer = setTimeout(handleScroll, 100);

    // Listen for scroll events with throttling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isMounted, currentFrame, totalFrames, scrollYProgress]);

  return {
    containerRef,
    currentFrame,
    scrollYProgress,
    phase,
    phaseProgress,
    isMounted
  };
};

/**
 * Hook for scroll-linked opacity animations
 * Fades content in/out based on frame range
 *
 * @param {number} startFrame - Frame to start fading in
 * @param {number} peakStartFrame - Frame to reach full opacity
 * @param {number} peakEndFrame - Frame to start fading out
 * @param {number} endFrame - Frame to complete fade out
 * @param {number} currentFrame - Current frame number
 * @returns {number} Opacity value (0-1)
 */
export const useFrameOpacity = (
  startFrame,
  peakStartFrame,
  peakEndFrame,
  endFrame,
  currentFrame
) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let newOpacity = 0;

    if (currentFrame < startFrame || currentFrame > endFrame) {
      newOpacity = 0;
    } else if (currentFrame >= peakStartFrame && currentFrame <= peakEndFrame) {
      newOpacity = 1;
    } else if (currentFrame < peakStartFrame) {
      // Fade in
      newOpacity = (currentFrame - startFrame) / (peakStartFrame - startFrame);
    } else {
      // Fade out
      newOpacity = 1 - (currentFrame - peakEndFrame) / (endFrame - peakEndFrame);
    }

    setOpacity(Math.max(0, Math.min(1, newOpacity)));
  }, [currentFrame, startFrame, peakStartFrame, peakEndFrame, endFrame]);

  return opacity;
};

/**
 * Hook for scroll-linked position animations
 * Moves content based on frame progress
 *
 * @param {Object} config - Animation configuration
 * @param {number} config.startFrame - Frame to start animation
 * @param {number} config.endFrame - Frame to end animation
 * @param {number} config.fromX - Starting X position
 * @param {number} config.toX - Ending X position
 * @param {number} config.fromY - Starting Y position
 * @param {number} config.toY - Ending Y position
 * @param {number} currentFrame - Current frame number
 * @returns {Object} Position object { x, y }
 */
export const useFramePosition = (
  { startFrame, endFrame, fromX = 0, toX = 0, fromY = 0, toY = 0 },
  currentFrame
) => {
  const [position, setPosition] = useState({ x: fromX, y: fromY });

  useEffect(() => {
    if (currentFrame < startFrame) {
      setPosition({ x: fromX, y: fromY });
    } else if (currentFrame > endFrame) {
      setPosition({ x: toX, y: toY });
    } else {
      const progress = (currentFrame - startFrame) / (endFrame - startFrame);
      const x = fromX + (toX - fromX) * progress;
      const y = fromY + (toY - fromY) * progress;
      setPosition({ x, y });
    }
  }, [currentFrame, startFrame, endFrame, fromX, toX, fromY, toY]);

  return position;
};

/**
 * Hook to determine if content should be visible in current phase
 *
 * @param {string} targetPhase - Phase to check ('intro', 'expansion', 'deepDive', 'cta')
 * @param {string} currentPhase - Current phase
 * @returns {boolean} Is content visible
 */
export const usePhaseVisibility = (targetPhase, currentPhase) => {
  return targetPhase === currentPhase;
};

export default useScrollFrames;
