import React, { useEffect, useState } from 'react';
import './HeroVideo.css';

/**
 * HeroVideo — supports three render modes for use inside a sticky stage:
 *   - "full" (default): video + foreground text in one section. Standalone use.
 *   - "bg":   only the video/poster/vignette/scanline (no headline, no scroll cue).
 *             Used as the sticky-pinned background layer.
 *   - "fg":   only the headline + scroll cue, transparent background.
 *             Used as the scrolling foreground layer over a separate pinned bg.
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

  const Background = ({ ariaHidden = false }) => (
    <>
      {prefersReducedMotion ? (
        <img
          className="hero-video__media"
          src="/videos/hero-smart-city-poster.jpg"
          alt={ariaHidden ? '' : 'Holographic smart city — Dochak'}
          {...(ariaHidden ? { 'aria-hidden': 'true' } : {})}
        />
      ) : (
        <video
          className="hero-video__media"
          poster="/videos/hero-smart-city-poster.jpg"
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onEnded={() => setVideoEnded(true)}
        >
          <source src="/videos/hero-smart-city.webm" type="video/webm" />
          <source src="/videos/hero-smart-city.mp4" type="video/mp4" />
        </video>
      )}
      <div className="hero-video__vignette" aria-hidden="true" />
      {!prefersReducedMotion && (
        <div className="hero-video__scanline" aria-hidden="true" />
      )}
    </>
  );

  const Headline = () => (
    <h1 className="hero-video__headline">
      Smarter cities.<br />
      Seamless <span className="hero-video__accent">mobility</span>.
    </h1>
  );

  const ScrollCue = () => (
    <a
      href="#main"
      className={`hero-video__scroll-cue${videoEnded ? ' is-idle' : ''}`}
      aria-label="Scroll to next section"
    >
      <span className="hero-video__scroll-label">SCROLL</span>
      <span className="hero-video__scroll-line" aria-hidden="true" />
    </a>
  );

  if (render === 'bg') {
    return (
      <section
        className="hero-video hero-video--bg-only"
        aria-hidden="true"
      >
        <Background ariaHidden />
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
        <ScrollCue />
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
        <img
          className="hero-video__media"
          src="/videos/hero-smart-city-poster.jpg"
          alt="Holographic smart city — Dochak"
        />
        <div className="hero-video__vignette" aria-hidden="true" />
        <Headline />
        <ScrollCue />
      </section>
    );
  }

  return (
    <section
      className="hero-video"
      role="banner"
      aria-label="Dochak smart mobility hero"
    >
      <Background />
      <Headline />
      <ScrollCue />
    </section>
  );
};

export default HeroVideo;
