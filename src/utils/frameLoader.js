/**
 * Frame Loader Utility for Holographic City Scroll
 * Generates frame paths and manages frame sequence for canvas rendering
 */

import {
  getFrameImport,
  getAllFrameImports,
  getPriorityFrameImports,
  getRemainingFrameImports
} from './frameImporter';

const FRAME_CONFIG = {
  prefix: 'Sequence 01_frame_',
  extension: '.webp',
  totalFrames: 100,
  priority: 40, // Number of priority frames to load first
};

/**
 * Generate the path for a specific frame number
 * @param {number} frameNumber - Frame number (1-100)
 * @returns {string} Frame path
 */
export const getFramePath = (frameNumber) => {
  return getFrameImport(frameNumber);
};

/**
 * Generate all frame paths
 * @returns {string[]} Array of all frame paths
 */
export const getAllFramePaths = () => {
  return getAllFrameImports();
};

/**
 * Get priority frame paths (first N frames for quick initial load)
 * @returns {string[]} Array of priority frame paths
 */
export const getPriorityFramePaths = () => {
  return getPriorityFrameImports();
};

/**
 * Get remaining frame paths (after priority frames)
 * @returns {string[]} Array of remaining frame paths
 */
export const getRemainingFramePaths = () => {
  return getRemainingFrameImports();
};

/**
 * Map scroll progress to frame number
 * @param {number} scrollProgress - Scroll progress (0.0 to 1.0)
 * @returns {number} Frame number (1 to 100)
 */
export const scrollToFrame = (scrollProgress) => {
  // Clamp scroll progress between 0 and 1
  const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

  // Map to frame number (1-100)
  // Frame 1 at 0%, Frame 100 at 100%
  const frameIndex = Math.floor(clampedProgress * (FRAME_CONFIG.totalFrames - 1)) + 1;

  return Math.max(1, Math.min(FRAME_CONFIG.totalFrames, frameIndex));
};

/**
 * Determine content phase based on frame number (100 frames total)
 * @param {number} frameNumber - Current frame number
 * @returns {string} Phase name
 */
export const getContentPhase = (frameNumber) => {
  if (frameNumber <= 24) return 'intro';
  if (frameNumber <= 48) return 'expansion';
  if (frameNumber <= 77) return 'deepDive';
  return 'cta';
};

/**
 * Calculate phase progress (0-1) within current phase
 * @param {number} frameNumber - Current frame number
 * @returns {number} Phase progress (0.0 to 1.0)
 */
export const getPhaseProgress = (frameNumber) => {
  if (frameNumber <= 24) {
    return (frameNumber - 1) / 23; // Frames 1-24
  }
  if (frameNumber <= 48) {
    return (frameNumber - 25) / 23; // Frames 25-48
  }
  if (frameNumber <= 77) {
    return (frameNumber - 49) / 28; // Frames 49-77
  }
  return (frameNumber - 78) / 22; // Frames 78-100
};

export default {
  getFramePath,
  getAllFramePaths,
  getPriorityFramePaths,
  getRemainingFramePaths,
  scrollToFrame,
  getContentPhase,
  getPhaseProgress,
  FRAME_CONFIG,
};
