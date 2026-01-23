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
  totalFrames: 200,
  priority: 40, // Number of priority frames to load first
};

/**
 * Generate the path for a specific frame number
 * @param {number} frameNumber - Frame number (1-104)
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
 * @returns {number} Frame number (1 to 200)
 */
export const scrollToFrame = (scrollProgress) => {
  // Clamp scroll progress between 0 and 1
  const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

  // Map to frame number (1-200)
  // Frame 1 at 0%, Frame 200 at 100%
  const frameIndex = Math.floor(clampedProgress * (FRAME_CONFIG.totalFrames - 1)) + 1;

  return Math.max(1, Math.min(FRAME_CONFIG.totalFrames, frameIndex));
};

/**
 * Determine content phase based on frame number (200 frames total)
 * @param {number} frameNumber - Current frame number
 * @returns {string} Phase name
 */
export const getContentPhase = (frameNumber) => {
  if (frameNumber <= 48) return 'intro';
  if (frameNumber <= 96) return 'expansion';
  if (frameNumber <= 154) return 'deepDive';
  return 'cta';
};

/**
 * Calculate phase progress (0-1) within current phase
 * @param {number} frameNumber - Current frame number
 * @returns {number} Phase progress (0.0 to 1.0)
 */
export const getPhaseProgress = (frameNumber) => {
  if (frameNumber <= 48) {
    return (frameNumber - 1) / 47; // Frames 1-48
  }
  if (frameNumber <= 96) {
    return (frameNumber - 49) / 47; // Frames 49-96
  }
  if (frameNumber <= 154) {
    return (frameNumber - 97) / 57; // Frames 97-154
  }
  return (frameNumber - 155) / 45; // Frames 155-200
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
