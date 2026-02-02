import React, { useContext } from 'react';
import './About.css';
import truck from './assets/truck_hori.webp';
import { Link } from 'react-router-dom';
import { GlobeDemo } from './components/ui/globeDemo';
import { TimelineDemo } from './components/ui/timelineDemo';
import LanguageContext from './contexts/LanguageContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';

// Import images for core values backgrounds
import automationImg from './assets/car.webp';
import integrationImg from './assets/clap.webp';
import excellenceImg from './assets/automob.webp';
import innovationImg from './assets/highway.webp';

export default function About() {
  const { t } = useContext(LanguageContext);

  // Animation component for individual elements
  const AnimatedElement = ({ children, animation = 'slide-up', delay = 0, className = '' }) => {
    const { elementRef, isVisible } = useScrollAnimation({
      threshold: 0.1,
      triggerOnce: true
    });

    return (
      <div
        ref={elementRef}
        className={`animate-on-scroll ${animation} ${isVisible ? 'visible' : ''} ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <AnimatedElement animation="slide-up" delay={0}>
            <h1 className="about-hero-title">{t('about.heroTitle')}</h1>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={200}>
            <p className="about-hero-subtitle">{t('about.heroSubtitle')}</p>
          </AnimatedElement>
        </div>
      </section>


      {/* Mission Section */}
      <section className="about-mission">
        {/* First Row: Original Left-Right Layout */}
        <div className="about-mission-intro-row">
          <AnimatedElement animation="slide-left" delay={100}>
            <div className="about-mission-intro-left">
              <h2 className="about-section-title">{t('about.missionTitle')}</h2>
              <p className="about-mission-intro-text"
                 dangerouslySetInnerHTML={{ __html: t('about.missionIntro') }}
              />
            </div>
          </AnimatedElement>
          <AnimatedElement animation="slide-right" delay={200}>
            <div className="about-mission-intro-right">
              <img src={truck} alt="Autonomous truck" className="about-mission-image" />
            </div>
          </AnimatedElement>
        </div>
        
        {/* Second Row: Three-column grid */}
        <div className="about-mission-grid">
          {/* Solutions Column */}
          <AnimatedElement animation="slide-up" delay={100}>
            <div className="about-mission-column">
              <div className="about-mission-column-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--picton-blue)" strokeWidth="2">
                  <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4"/>
                  <path d="M9 7V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/>
                  <circle cx="12" cy="16" r="1"/>
                </svg>
              </div>
              <p className="about-mission-column-text"
                 dangerouslySetInnerHTML={{ __html: t('about.solutionsText') }}
              />
              <Link to="/solutions" className="about-mission-cta about-mission-cta-emerald">
                {t('about.missionCTA1')}
                <svg 
                  className="about-mission-cta-arrow" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </AnimatedElement>

          {/* Projects Column */}
          <AnimatedElement animation="slide-up" delay={200}>
            <div className="about-mission-column">
              <div className="about-mission-column-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <p className="about-mission-column-text"
                 dangerouslySetInnerHTML={{ __html: t('about.projectsText') }}
              />
              <Link to="/projects" className="about-mission-cta about-mission-cta-blue">
                {t('about.missionCTA2')}
                <svg 
                  className="about-mission-cta-arrow" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </AnimatedElement>

          {/* Team Column */}
          <AnimatedElement animation="slide-up" delay={300}>
            <div className="about-mission-column">
              <div className="about-mission-column-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <p className="about-mission-column-text"
                 dangerouslySetInnerHTML={{ __html: t('about.teamText') }}
              />
              <Link to="/team" className="about-mission-cta about-mission-cta-purple">
                {t('about.missionCTA3')}
                <svg 
                  className="about-mission-cta-arrow" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>


      {/* Core Values Section */}
      <section className="about-values">
        <AnimatedElement animation="slide-up" delay={0}>
          <h2 className="about-section-title">{t('about.valuesTitle')}</h2>
        </AnimatedElement>
        <div className="about-values-container">
          <div className="about-values-grid">
            <AnimatedElement animation="slide-up" delay={100}>
              <div
                className="about-value-card about-value-card-overlay"
                style={{ backgroundImage: `url(${automationImg})` }}
              >
                <div className="about-value-card-overlay-bg"></div>
                <div className="about-value-content">
                  <h3 className="about-value-title">{t('about.values.automation.title')}</h3>
                  <p className="about-value-desc" dangerouslySetInnerHTML={{ __html: t('about.values.automation.desc') }} />
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={200}>
              <div
                className="about-value-card about-value-card-overlay"
                style={{ backgroundImage: `url(${integrationImg})` }}
              >
                <div className="about-value-card-overlay-bg"></div>
                <div className="about-value-content">
                  <h3 className="about-value-title">{t('about.values.integration.title')}</h3>
                  <p className="about-value-desc" dangerouslySetInnerHTML={{ __html: t('about.values.integration.desc') }} />
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={300}>
              <div
                className="about-value-card about-value-card-overlay"
                style={{ backgroundImage: `url(${excellenceImg})` }}
              >
                <div className="about-value-card-overlay-bg"></div>
                <div className="about-value-content">
                  <h3 className="about-value-title">{t('about.values.excellence.title')}</h3>
                  <p className="about-value-desc" dangerouslySetInnerHTML={{ __html: t('about.values.excellence.desc') }} />
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={400}>
              <div
                className="about-value-card about-value-card-overlay"
                style={{ backgroundImage: `url(${innovationImg})` }}
              >
                <div className="about-value-card-overlay-bg"></div>
                <div className="about-value-content">
                  <h3 className="about-value-title">{t('about.values.innovation.title')}</h3>
                  <p className="about-value-desc" dangerouslySetInnerHTML={{ __html: t('about.values.innovation.desc') }} />
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Target Market Section */}
      <section className="about-market">
        <AnimatedElement animation="slide-up" delay={0}>
          <h2 className="about-section-title">{t('about.marketTitle')}</h2>
        </AnimatedElement>
        <AnimatedElement animation="slide-up" delay={200}>
          <p className="about-mission-text"
             dangerouslySetInnerHTML={{ __html: t('about.marketText') }}
          />
        </AnimatedElement>
        <div className="about-market-inner">
            <GlobeDemo />
        </div>
      </section>

      {/* Our Story Section (Timeline) */}
      <section className="about-story">
        <AnimatedElement animation="slide-up" delay={0}>
          <h2 className="about-story-title">{t('about.storyTitle')}</h2>
        </AnimatedElement>
        <AnimatedElement animation="slide-up" delay={300}>
          <TimelineDemo />
        </AnimatedElement>
      </section>
    </div>
  );
} 