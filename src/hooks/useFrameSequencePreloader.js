import { useState, useEffect, useRef } from 'react';
import imagePreloader from '../utils/imagePreloader';
import {
  getPriorityFramePaths,
  getRemainingFramePaths,
  getAllFramePaths
} from '../utils/frameLoader';

/**
 * Custom hook for preloading frame sequences
 * Loads priority frames first, then progressively loads remaining frames
 *
 * @returns {Object} Loading state and loaded images
 */
export const useFrameSequencePreloader = () => {
  const [loadingState, setLoadingState] = useState({
    priority: 'loading',
    remaining: 'idle',
    overall: 'loading'
  });

  const [loadedFrames, setLoadedFrames] = useState({});
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const loadFrames = async () => {
      try {
        // Phase 1: Load priority frames (first 20)
        const priorityPaths = getPriorityFramePaths();
        console.log('Starting to load priority frames:', priorityPaths.length);
        const loadedPriority = {};

        for (let i = 0; i < priorityPaths.length; i++) {
          if (!isMounted.current) return;

          try {
            const path = priorityPaths[i];
            console.log(`Loading frame ${i + 1}:`, path);
            const img = await imagePreloader.preloadImage(path);
            loadedPriority[i + 1] = img;

            // Update progress during priority load
            const priorityProgress = ((i + 1) / priorityPaths.length) * 0.5; // 0-50%
            setProgress(Math.round(priorityProgress * 100));
            setLoadedFrames(prev => ({ ...prev, ...loadedPriority }));
          } catch (err) {
            console.error(`Failed to load priority frame ${i + 1}:`, err);
          }
        }

        if (!isMounted.current) return;

        // Mark priority loading complete
        setLoadingState(prev => ({
          ...prev,
          priority: 'complete',
          remaining: 'loading',
          overall: 'loading'
        }));

        // Phase 2: Load remaining frames progressively
        const remainingPaths = getRemainingFramePaths();
        const loadedRemaining = {};

        for (let i = 0; i < remainingPaths.length; i++) {
          if (!isMounted.current) return;

          try {
            const frameNumber = i + priorityPaths.length + 1;
            const img = await imagePreloader.preloadImage(remainingPaths[i]);
            loadedRemaining[frameNumber] = img;

            // Update progress during remaining load
            const remainingProgress = 0.5 + ((i + 1) / remainingPaths.length) * 0.5; // 50-100%
            setProgress(Math.round(remainingProgress * 100));
            setLoadedFrames(prev => ({ ...prev, ...loadedRemaining }));
          } catch (err) {
            console.warn(`Failed to load frame ${i + priorityPaths.length + 1}:`, err);
          }
        }

        if (!isMounted.current) return;

        // All frames loaded
        setLoadingState({
          priority: 'complete',
          remaining: 'complete',
          overall: 'complete'
        });
        setProgress(100);

      } catch (err) {
        console.error('Error loading frame sequence:', err);
        setError(err);
        setLoadingState(prev => ({
          ...prev,
          overall: 'error'
        }));
      }
    };

    loadFrames();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return {
    loadingState,
    loadedFrames,
    progress,
    error,
    isReady: loadingState.priority === 'complete', // Ready when priority frames loaded
    isComplete: loadingState.overall === 'complete'
  };
};

/**
 * Hook to get a specific frame image from loaded frames
 * Returns the image if loaded, or previous frame as fallback
 *
 * @param {number} frameNumber - Frame number to get
 * @param {Object} loadedFrames - Object of loaded frame images
 * @returns {HTMLImageElement|null} Frame image or null
 */
export const useFrameImage = (frameNumber, loadedFrames) => {
  const [frameImage, setFrameImage] = useState(null);

  useEffect(() => {
    // Try to get exact frame
    if (loadedFrames[frameNumber]) {
      setFrameImage(loadedFrames[frameNumber]);
      return;
    }

    // Fallback: Try previous frame
    let fallbackFrame = frameNumber - 1;
    while (fallbackFrame > 0) {
      if (loadedFrames[fallbackFrame]) {
        setFrameImage(loadedFrames[fallbackFrame]);
        return;
      }
      fallbackFrame--;
    }

    // No frame available
    setFrameImage(null);
  }, [frameNumber, loadedFrames]);

  return frameImage;
};

export default useFrameSequencePreloader;
