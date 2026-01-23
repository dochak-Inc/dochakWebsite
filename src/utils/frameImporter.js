/**
 * Frame Importer using webpack's require.context
 * This pre-imports all frames for reliable loading
 * Using webp format (100 frames)
 */

// Import all frames at build time using webpack's require.context
const importAllFrames = () => {
  const frames = {};

  try {
    // Use webpack's require.context to import all webp frames
    const requireContext = require.context(
      '../assets/Sequence 01_frames',
      false,
      /Sequence 01_frame_\d{3}\.webp$/
    );

    requireContext.keys().forEach((fileName) => {
      // Extract frame number from filename (e.g., "./Sequence 01_frame_001.webp" -> 1)
      const match = fileName.match(/Sequence 01_frame_(\d{3})\.webp$/);
      if (match) {
        const frameNumber = parseInt(match[1], 10);
        frames[frameNumber] = requireContext(fileName);
      }
    });

    console.log(`Successfully imported ${Object.keys(frames).length} webp frames`);
  } catch (error) {
    console.error('Failed to import frames:', error);
  }

  return frames;
};

// Import all frames immediately
export const FRAME_IMPORTS = importAllFrames();

/**
 * Get frame path by number
 * @param {number} frameNumber - Frame number (1-104)
 * @returns {string} Frame path
 */
export const getFrameImport = (frameNumber) => {
  return FRAME_IMPORTS[frameNumber] || FRAME_IMPORTS[1] || '';
};

/**
 * Get all frame paths in order (200 frames)
 * @returns {string[]} Array of frame paths
 */
export const getAllFrameImports = () => {
  const frames = [];
  for (let i = 1; i <= 200; i++) {
    if (FRAME_IMPORTS[i]) {
      frames.push(FRAME_IMPORTS[i]);
    }
  }
  return frames;
};

/**
 * Get priority frames (first 40 for smoother start)
 * @returns {string[]} Array of priority frame paths
 */
export const getPriorityFrameImports = () => {
  const frames = [];
  for (let i = 1; i <= 40; i++) {
    if (FRAME_IMPORTS[i]) {
      frames.push(FRAME_IMPORTS[i]);
    }
  }
  return frames;
};

/**
 * Get remaining frames (after priority)
 * @returns {string[]} Array of remaining frame paths
 */
export const getRemainingFrameImports = () => {
  const frames = [];
  for (let i = 41; i <= 200; i++) {
    if (FRAME_IMPORTS[i]) {
      frames.push(FRAME_IMPORTS[i]);
    }
  }
  return frames;
};

export default {
  FRAME_IMPORTS,
  getFrameImport,
  getAllFrameImports,
  getPriorityFrameImports,
  getRemainingFrameImports
};
