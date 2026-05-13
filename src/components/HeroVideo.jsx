import React, { useEffect, useState } from 'react';
import './HeroVideo.css';

const HeroVideo = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const onChange = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const Wordmark = () => (
    <span className="hero-video__wordmark">
      DOCHAK<span className="hero-video__dot" aria-hidden="true" />SMART MOBILITY
    </span>
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
        <header className="hero-video__brand"><Wordmark /></header>
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
      <div className="hero-video__vignette" aria-hidden="true" />
      <div className="hero-video__scanline" aria-hidden="true" />
      <header className="hero-video__brand"><Wordmark /></header>
      <Headline />
      <ScrollCue />
    </section>
  );
};

export default HeroVideo;
