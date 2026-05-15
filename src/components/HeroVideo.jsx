import React, { useEffect, useState } from 'react';
import './HeroVideo.css';

const POSTER_SRC = '/videos/hero-smart-city-poster.jpg';
const POSTER_ALT = 'Holographic smart city — Dochak';
const WEBM_SRC = '/videos/hero-smart-city.webm';
const MP4_SRC = '/videos/hero-smart-city.mp4';

const Headline = () => (
  <h1 className="hero-video__headline">
    Smarter cities.<br />
    Seamless <span className="hero-video__accent">mobility</span>.
  </h1>
);

const ScrollCue = ({ isIdle }) => (
  <a
    href="#main"
    className={`hero-video__scroll-cue${isIdle ? ' is-idle' : ''}`}
    aria-label="Scroll to next section"
  >
    <span className="hero-video__scroll-label">SCROLL</span>
    <span className="hero-video__scroll-line" aria-hidden="true" />
  </a>
);

/**
 * HeroVideo — supports three render modes for use inside a sticky stage:
 *   - "full" (default): video + foreground text in one section. Standalone use.
 *   - "bg":   only the video/poster/vignette/scanline (no headline, no scroll cue).
 *             Used as the sticky-pinned background layer.
 *   - "fg":   only the headline + scroll cue, transparent background.
 *             Used as the scrolling foreground layer over a separate pinned bg.
 *
 * Playback: the video plays through its full intro once, then freezes on the
 * final frame. The `videoEnded` state is used to switch the scroll cue into
 * its idle breathing animation; no replay or loop logic.
 */
const HeroVideo = ({ render = 'full' }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const onChange = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // In split mode, the fg layer needs a way to know when the video ended
  // (so the scroll cue can switch to its idle breathing). The bg layer fires
  // onEnded on its own video; the fg layer falls back to a 6s timer matching
  // the encoded video duration.
  useEffect(() => {
    if (render !== 'fg') return;
    const t = setTimeout(() => setVideoEnded(true), 6000);
    return () => clearTimeout(t);
  }, [render]);

  const handleVideoEnded = () => setVideoEnded(true);

  // --- render branches ---

  if (render === 'bg') {
    return (
      <section className="hero-video hero-video--bg-only" aria-hidden="true">
        {prefersReducedMotion ? (
          <img className="hero-video__media" src={POSTER_SRC} alt="" aria-hidden="true" />
        ) : (
          <video
            className="hero-video__media"
            poster={POSTER_SRC}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onEnded={handleVideoEnded}
          >
            <source src={WEBM_SRC} type="video/webm" />
            <source src={MP4_SRC} type="video/mp4" />
          </video>
        )}
        <div className="hero-video__vignette" aria-hidden="true" />
        {!prefersReducedMotion && (
          <div className="hero-video__scanline" aria-hidden="true" />
        )}
      </section>
    );
  }

  if (render === 'fg') {
    return (
      <section
        className="hero-video hero-video--fg-only"
        role="banner"
        aria-label="Dochak smart mobility hero"
      >
        <Headline />
        <ScrollCue isIdle={videoEnded} />
      </section>
    );
  }

  // Full mode — original standalone behavior, used by HeroVideo.test.js and any
  // future page that wants the hero without the pinned-stage decomposition.
  if (prefersReducedMotion) {
    return (
      <section
        className="hero-video hero-video--static"
        role="banner"
        aria-label="Dochak smart mobility hero"
      >
        <img className="hero-video__media" src={POSTER_SRC} alt={POSTER_ALT} />
        <div className="hero-video__vignette" aria-hidden="true" />
        <Headline />
        <ScrollCue isIdle={videoEnded} />
      </section>
    );
  }

  return (
    <section
      className="hero-video"
      role="banner"
      aria-label="Dochak smart mobility hero"
    >
      <video
        className="hero-video__media"
        poster={POSTER_SRC}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onEnded={handleVideoEnded}
      >
        <source src={WEBM_SRC} type="video/webm" />
        <source src={MP4_SRC} type="video/mp4" />
      </video>
      <div className="hero-video__vignette" aria-hidden="true" />
      <div className="hero-video__scanline" aria-hidden="true" />
      <Headline />
      <ScrollCue isIdle={videoEnded} />
    </section>
  );
};

export default HeroVideo;
