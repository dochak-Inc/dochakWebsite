/**
 * Frame Duplication System
 * Duplicates key frames to make them stay visible longer during scroll
 */

/**
 * Key frames to hold/duplicate (200 frames total - 2x smoother)
 * duration: how many times to repeat the frame (higher = stickier)
 */
const KEY_FRAME_HOLDS = [
  { frame: 1, duration: 15, label: 'Intro Start' },
  { frame: 76, duration: 8, label: 'Expansion Peak' },
  { frame: 135, duration: 12, label: 'Deep Dive Start' },
  { frame: 200, duration: 30, label: 'CTA End' }
];

/**
 * Build frame sequence with duplications and controlled speed
 * @returns {number[]} Extended frame sequence with duplications
 */
export const buildExtendedFrameSequence = () => {
  const sequence = [];
  let currentFrame = 1;

  while (currentFrame <= 200) {
    // Check if this frame should be held
    const hold = KEY_FRAME_HOLDS.find(h => h.frame === currentFrame);

    if (hold) {
      // Add the frame multiple times (sticky moment)
      for (let i = 0; i < hold.duration; i++) {
        sequence.push(currentFrame);
      }
      console.log(`Frame ${currentFrame} (${hold.label}) held for ${hold.duration} positions`);
      currentFrame++;
    } else {
      // Show every frame once for faster playback
      const nextHold = KEY_FRAME_HOLDS.find(h => h.frame > currentFrame);
      const distanceToNextHold = nextHold ? (nextHold.frame - currentFrame) : 200;

      // Within 10 frames of a sticky point, show all frames
      if (distanceToNextHold <= 10) {
        sequence.push(currentFrame);
      } else {
        // Regular frames: show each frame once (faster animation)
        sequence.push(currentFrame);
      }

      currentFrame++;
    }
  }

  console.log(`Extended sequence: ${sequence.length} total positions for 200 unique frames (smoother animation)`);
  return sequence;
};

// Build the sequence once
export const EXTENDED_FRAME_SEQUENCE = buildExtendedFrameSequence();

/**
 * Map scroll progress to actual frame number (with duplication)
 * @param {number} scrollProgress - Scroll progress (0.0 to 1.0)
 * @returns {number} Frame number to display (1-100)
 */
export const mapScrollToFrame = (scrollProgress) => {
  const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

  // Map progress to position in extended sequence
  const sequenceIndex = Math.floor(clampedProgress * (EXTENDED_FRAME_SEQUENCE.length - 1));
  const clampedIndex = Math.max(0, Math.min(EXTENDED_FRAME_SEQUENCE.length - 1, sequenceIndex));

  return EXTENDED_FRAME_SEQUENCE[clampedIndex];
};

/**
 * Get total number of scroll positions (including duplicates)
 * @returns {number} Total positions
 */
export const getTotalScrollPositions = () => {
  return EXTENDED_FRAME_SEQUENCE.length;
};

/**
 * Get key frame holds info
 * @returns {Array} Key frame holds
 */
export const getKeyFrameHolds = () => {
  return KEY_FRAME_HOLDS;
};

export default {
  buildExtendedFrameSequence,
  EXTENDED_FRAME_SEQUENCE,
  mapScrollToFrame,
  getTotalScrollPositions,
  getKeyFrameHolds
};
