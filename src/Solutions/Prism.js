import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Prism.css';
import './solutions-shared.css';
import LanguageContext from '../contexts/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Prism() {
  const { t } = useContext(LanguageContext);

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
    <div className="prism-page">
      {/* Hero Section */}
      <section className="prism-hero">
        <div className="hero-container">
          <AnimatedElement animation="slide-up" delay={0}>
            <h1 className="hero-title">{t('solutions.prismSolution.hero.title')}</h1>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={200}>
            <p className="hero-subtitle" dangerouslySetInnerHTML={{ __html: t('solutions.prismSolution.hero.subtitle') }}></p>
          </AnimatedElement>
        </div>
      </section>

      {/* Overview Section */}
      <section className="overview-section">
        <div className="section-container">
          <AnimatedElement animation="slide-up" delay={0}>
            <h2 className="section-title">{t('solutions.prismSolution.overview.title')}</h2>
          </AnimatedElement>

          <div className="overview-row first-row">
            <AnimatedElement animation="slide-left" delay={100}>
              <div className="explanation-content">
                <h3>{t('solutions.prismSolution.overview.demo')}</h3>
                <p dangerouslySetInnerHTML={{ __html: t('solutions.prismSolution.overview.demoDesc') }}></p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-right" delay={200}>
              <div className="video-wrapper">
                <div className="video-container">
                  <iframe
                    src="https://www.youtube.com/embed/wxB3XNmfgII"
                    title={t('solutions.prismSolution.overview.demo')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="youtube-video"
                  ></iframe>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Technical Details Section */}
      <section className="technical-section">
        <div className="section-container">
          <AnimatedElement animation="slide-up" delay={0}>
            <h2 className="section-title">{t('solutions.prismSolution.technical.title')}</h2>
          </AnimatedElement>
          <div className="technical-grid">
            <AnimatedElement animation="slide-left" delay={100}>
              <div className="specs-card">
                <h3>{t('solutions.prismSolution.technical.specsTitle')}</h3>
                <ul className="specs-list">
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.prismSolution.technical.spec1') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.prismSolution.technical.spec2') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.prismSolution.technical.spec3') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.prismSolution.technical.spec4') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.prismSolution.technical.spec5') }}></li>
                </ul>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-right" delay={200}>
              <div className="research-card">
                <h3>{t('solutions.prismSolution.technical.researchTitle')}</h3>
                <div className="research-item">
                  <h4>{t('solutions.prismSolution.technical.patentTitle')}</h4>
                  <div className="patent-details">
                    <div className="patent-title" dangerouslySetInnerHTML={{ __html: `"${t('solutions.prismSolution.technical.patentName')}"` }}></div>
                    <div className="patent-info-row">
                      <div className="patent-date">
                        <span className="patent-date-label">{t('solutions.prismSolution.technical.applicationDate')}:</span>
                        <span className="patent-date-value">TBD</span>
                      </div>
                      <div className="patent-number">
                        <span className="patent-number-label">{t('solutions.prismSolution.technical.patentNumber')}:</span>
                        <span className="patent-number-value">TBD</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="research-item">
                  <h4>{t('solutions.prismSolution.technical.academicTitle')}</h4>
                  <p dangerouslySetInnerHTML={{ __html: t('solutions.prismSolution.technical.academicInfo') }}></p>
                </div>
                <div className="cta-button-container">
                  <Link to="/disclosure" className="cta-button">
                    {t('solutions.prismSolution.technical.disclosureButton')}
                  </Link>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="use-cases-section">
        <div className="section-container">
          <AnimatedElement animation="slide-up" delay={0}>
            <h2 className="section-title">{t('solutions.prismSolution.useCases.title')}</h2>
          </AnimatedElement>

          <div className="use-cases-content">
            <AnimatedElement animation="slide-up" delay={100}>
              <div className="industries-card">
                <h3>{t('solutions.prismSolution.useCases.industriesTitle')}</h3>
                <div className="industry-tags">
                  <span className="industry-tag">{t('solutions.prismSolution.useCases.industry1')}</span>
                  <span className="industry-tag">{t('solutions.prismSolution.useCases.industry2')}</span>
                  <span className="industry-tag">{t('solutions.prismSolution.useCases.industry3')}</span>
                </div>
                <div className="outcome">
                  <h4>{t('solutions.prismSolution.useCases.outcomeTitle')}</h4>
                  <p dangerouslySetInnerHTML={{ __html: t('solutions.prismSolution.useCases.outcomeDesc') }}></p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={200}>
              <div className="scenario-card">
                <h3>{t('solutions.prismSolution.useCases.scenarioTitle')}</h3>
                <div className="scenario-flow">
                  <div className="flow-step">
                    <div className="step-number">1</div>
                    <p dangerouslySetInnerHTML={{ __html: t('solutions.prismSolution.useCases.scenarioStep1') }}></p>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-step">
                    <div className="step-number">2</div>
                    <p dangerouslySetInnerHTML={{ __html: t('solutions.prismSolution.useCases.scenarioStep2') }}></p>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-step">
                    <div className="step-number">3</div>
                    <p dangerouslySetInnerHTML={{ __html: t('solutions.prismSolution.useCases.scenarioStep3') }}></p>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="get-in-touch-section">
        <div className="get-in-touch-container">
          <AnimatedElement animation="slide-up" delay={0}>
            <div className="get-in-touch-content">
              <h3 className="section-title">{t('solutions.prismSolution.cta.title')}</h3>
              <p className="get-in-touch-description" dangerouslySetInnerHTML={{ __html: t('solutions.prismSolution.cta.description') }}></p>
              <div className="get-in-touch-buttons">
                <Link to="/get-in-touch" className="contact-button primary">
                  {t('solutions.prismSolution.cta.button')}
                </Link>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}
