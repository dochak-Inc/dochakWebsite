import { useEffect, useRef } from 'react';

/**
 * Snap points configuration (50 frames total)
 * These are the "magnetic" frames where scrolling should slow down
 */
const SNAP_POINTS = [
  { frame: 1, label: 'Intro Start', strength: 0.3 },
  { frame: 6, label: 'Intro Mid', strength: 0.25 },
  { frame: 18, label: 'Expansion Peak', strength: 0.4 },
  { frame: 31, label: 'Deep Dive Peak', strength: 0.4 },
  { frame: 46, label: 'CTA', strength: 0.35 },
  { frame: 50, label: 'End', strength: 0.3 }
];

/**
 * Custom hook for scroll snapping behavior
 * Creates "magnetic" effect at key frames
 *
 * @param {number} currentFrame - Current frame number
 * @param {Object} containerRef - Reference to scroll container
 * @param {boolean} enabled - Whether snapping is enabled
 */
export const useScrollSnap = (currentFrame, containerRef, enabled = true) => {
  const isSnappingRef = useRef(false);
  const snapTimeoutRef = useRef(null);
  const lastScrollTimeRef = useRef(Date.now());
  const velocityRef = useRef(0);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    let lastScrollY = window.scrollY;
    let lastTime = Date.now();

    const handleScroll = () => {
      const now = Date.now();
      const deltaTime = now - lastTime;
      const deltaScroll = window.scrollY - lastScrollY;

      // Calculate scroll velocity
      velocityRef.current = deltaTime > 0 ? Math.abs(deltaScroll / deltaTime) : 0;

      lastScrollY = window.scrollY;
      lastTime = now;
      lastScrollTimeRef.current = now;

      // Clear existing snap timeout
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }

      // Check if we should snap after scrolling stops
      snapTimeoutRef.current = setTimeout(() => {
        if (isSnappingRef.current) return;

        const timeSinceLastScroll = Date.now() - lastScrollTimeRef.current;

        // Only snap if user has stopped scrolling (300ms threshold)
        if (timeSinceLastScroll >= 300) {
          snapToNearestPoint();
        }
      }, 300);
    };

    const snapToNearestPoint = () => {
      // Find the NEXT snap point ahead of current frame
      let nextSnap = null;
      let minDistanceAhead = Infinity;

      SNAP_POINTS.forEach(snap => {
        const distance = snap.frame - currentFrame;

        // Only consider snap points AHEAD (positive distance)
        // Snap if we're within 6 frames BEFORE the snap point
        if (distance > 0 && distance < 6 && distance < minDistanceAhead) {
          minDistanceAhead = distance;
          nextSnap = snap;
        }
      });

      // If we found a snap point ahead and velocity is low, snap FORWARD to it
      if (nextSnap && velocityRef.current < 2) {
        const container = containerRef.current;
        if (!container) return;

        isSnappingRef.current = true;

        // Calculate target scroll position for the snap frame
        const containerTop = container.offsetTop;
        const containerHeight = container.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollableHeight = containerHeight - viewportHeight;

        // Calculate scroll position for target frame
        const frameProgress = (nextSnap.frame - 1) / 49; // 0 to 1 (50 frames)
        const targetScrollY = containerTop + (scrollableHeight * frameProgress);

        // Smooth scroll to snap point
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth'
        });

        console.log(`Snapping FORWARD to frame ${nextSnap.frame} (${nextSnap.label})`);

        // Reset snapping flag after animation
        setTimeout(() => {
          isSnappingRef.current = false;
        }, 500);
      }
    };

    // Throttled scroll listener
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

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
    };
  }, [enabled, currentFrame, containerRef]);

  return {
    isSnapping: isSnappingRef.current,
    snapPoints: SNAP_POINTS
  };
};

export default useScrollSnap;
