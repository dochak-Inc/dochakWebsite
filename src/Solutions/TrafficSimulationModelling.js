import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './TrafficSimulationModelling.css';
import './solutions-shared.css';
import LanguageContext from '../contexts/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function TrafficSimulationModelling() {
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
    <div className="traffic-simulation-modelling-page">
      {/* Hero Section */}
      <section className="traffic-simulation-modelling-hero">
        <div className="hero-container">
          <AnimatedElement animation="slide-up" delay={0}>
            <h1 className="hero-title">{t('solutions.trafficSimulationModellingSolution.hero.title')}</h1>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={200}>
            <p className="hero-subtitle" dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.hero.subtitle') }}></p>
          </AnimatedElement>
        </div>
      </section>

      {/* Overview Section */}
      <section className="overview-section">
        <div className="section-container">
          <AnimatedElement animation="slide-up" delay={0}>
            <h2 className="section-title">{t('solutions.trafficSimulationModellingSolution.overview.title')}</h2>
          </AnimatedElement>

          {/* Two-column list: each row = video (left) + explanation (right).
              No card frames — content sits directly on the section bg so the
              section reads as a clean editorial list rather than a 2x3 grid
              of huge cards. The featured TA-5 leads the list. */}
          <div className="videos-list">
            <div className="overview-row first-row">
              <AnimatedElement animation="slide-left" delay={100}>
                <div className="video-wrapper">
                  <div className="video-container">
                    <iframe
                      src="https://www.youtube.com/embed/kL11AdA_DvE?si=_AKT55Okf50-HtPF"
                      title={t('solutions.trafficSimulationModellingSolution.overview.TA-5')}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="youtube-video"
                    ></iframe>
                  </div>
                </div>
              </AnimatedElement>
              <AnimatedElement animation="slide-right" delay={200}>
                <div className="explanation-content">
                  <h3>{t('solutions.trafficSimulationModellingSolution.overview.TA-5')}</h3>
                  <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.overview.TA-5Desc') }}></p>
                </div>
              </AnimatedElement>
            </div>

            <div className="overview-row">
              <AnimatedElement animation="slide-left" delay={100}>
                <div className="video-wrapper">
                  <div className="video-container">
                    <iframe
                      src="https://www.youtube.com/embed/GPcCS-LHPOY?si=UKYBYGYcwKc-K3mi"
                      title={t('solutions.trafficSimulationModellingSolution.overview.TA-4')}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="youtube-video"
                    ></iframe>
                  </div>
                </div>
              </AnimatedElement>
              <AnimatedElement animation="slide-right" delay={200}>
                <div className="explanation-content">
                  <h3>{t('solutions.trafficSimulationModellingSolution.overview.TA-4')}</h3>
                  <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.overview.TA-4Desc') }}></p>
                </div>
              </AnimatedElement>
            </div>

            <div className="overview-row">
              <AnimatedElement animation="slide-left" delay={100}>
                <div className="video-wrapper">
                  <div className="video-container">
                    <iframe
                      src="https://www.youtube.com/embed/4GHNow4uQ7c?si=v0t2i9JzwIu7hx8U"
                      title={t('solutions.trafficSimulationModellingSolution.overview.demo')}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="youtube-video"
                    ></iframe>
                  </div>
                </div>
              </AnimatedElement>
              <AnimatedElement animation="slide-right" delay={200}>
                <div className="explanation-content">
                  <h3>{t('solutions.trafficSimulationModellingSolution.overview.demo')}</h3>
                  <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.overview.demoDesc') }}></p>
                </div>
              </AnimatedElement>
            </div>

            <div className="overview-row">
              <AnimatedElement animation="slide-left" delay={100}>
                <div className="video-wrapper">
                  <div className="video-container">
                    <iframe
                      src="https://www.youtube.com/embed/SIvNsejU8wA?si=BOCS-1AnToQd58t5"
                      title={t('solutions.trafficSimulationModellingSolution.overview.TA-1')}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="youtube-video"
                    ></iframe>
                  </div>
                </div>
              </AnimatedElement>
              <AnimatedElement animation="slide-right" delay={200}>
                <div className="explanation-content">
                  <h3>{t('solutions.trafficSimulationModellingSolution.overview.TA-1')}</h3>
                  <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.overview.TA-1Desc') }}></p>
                </div>
              </AnimatedElement>
            </div>

            <div className="overview-row">
              <AnimatedElement animation="slide-left" delay={100}>
                <div className="video-wrapper">
                  <div className="video-container">
                    <iframe
                      src="https://www.youtube.com/embed/P6qtlPoWqBs?si=98PZbDMEP5FPJRd2"
                      title={t('solutions.trafficSimulationModellingSolution.overview.TA-2')}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="youtube-video"
                    ></iframe>
                  </div>
                </div>
              </AnimatedElement>
              <AnimatedElement animation="slide-right" delay={200}>
                <div className="explanation-content">
                  <h3>{t('solutions.trafficSimulationModellingSolution.overview.TA-2')}</h3>
                  <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.overview.TA-2Desc') }}></p>
                </div>
              </AnimatedElement>
            </div>

            <div className="overview-row">
              <AnimatedElement animation="slide-left" delay={100}>
                <div className="video-wrapper">
                  <div className="video-container">
                    <iframe
                      src="https://www.youtube.com/embed/200mMlmkDVA?si=g85lm4fD7F97rncg"
                      title={t('solutions.trafficSimulationModellingSolution.overview.TA-3')}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="youtube-video"
                    ></iframe>
                  </div>
                </div>
              </AnimatedElement>
              <AnimatedElement animation="slide-right" delay={200}>
                <div className="explanation-content">
                  <h3>{t('solutions.trafficSimulationModellingSolution.overview.TA-3')}</h3>
                  <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.overview.TA-3Desc') }}></p>
                </div>
              </AnimatedElement>
            </div>

            <div className="overview-row">
              <AnimatedElement animation="slide-left" delay={100}>
                <div className="video-wrapper">
                  <div className="video-container">
                    <iframe
                      src="https://www.youtube.com/embed/7oWZzj1lrkc?si=bA-VeNpgFsmk0NxV"
                      title={t('solutions.trafficSimulationModellingSolution.overview.TA-6')}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="youtube-video"
                    ></iframe>
                  </div>
                </div>
              </AnimatedElement>
              <AnimatedElement animation="slide-right" delay={200}>
                <div className="explanation-content">
                  <h3>{t('solutions.trafficSimulationModellingSolution.overview.TA-6')}</h3>
                  <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.overview.TA-6Desc') }}></p>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details Section */}
      <section className="technical-section">
        <div className="section-container">
          <AnimatedElement animation="slide-up" delay={0}>
            <h2 className="section-title">{t('solutions.trafficSimulationModellingSolution.technical.title')}</h2>
          </AnimatedElement>
          <div className="technical-grid">
            <AnimatedElement animation="slide-left" delay={100}>
              <div className="specs-card">
                <h3>{t('solutions.trafficSimulationModellingSolution.technical.specsTitle')}</h3>
                <ul className="specs-list">
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.technical.spec1') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.technical.spec2') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.technical.spec3') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.technical.spec4') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.technical.spec5') }}></li>
                </ul>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-right" delay={200}>
              <div className="research-card">
                <h3>{t('solutions.trafficSimulationModellingSolution.technical.researchTitle')}</h3>
                <div className="research-item">
                  <h4>{t('solutions.trafficSimulationModellingSolution.technical.patentTitle')}</h4>
                  <div className="patent-details">
                    <div className="patent-title" dangerouslySetInnerHTML={{ __html: `"${t('solutions.trafficSimulationModellingSolution.technical.patentName')}"` }}></div>
                    <div className="patent-info-row">
                      <div className="patent-date">
                        <span className="patent-date-label">{t('solutions.trafficSimulationModellingSolution.technical.applicationDate')}:</span>
                        <span className="patent-date-value">TBD</span>
                      </div>
                      <div className="patent-number">
                        <span className="patent-number-label">{t('solutions.trafficSimulationModellingSolution.technical.patentNumber')}:</span>
                        <span className="patent-number-value">TBD</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="research-item">
                  <h4>{t('solutions.trafficSimulationModellingSolution.technical.academicTitle')}</h4>
                  <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.technical.academicInfo') }}></p>
                </div>
                <div className="cta-button-container">
                  <Link to="/disclosure" className="cta-button">
                    {t('solutions.trafficSimulationModellingSolution.technical.disclosureButton')}
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
            <h2 className="section-title">{t('solutions.trafficSimulationModellingSolution.useCases.title')}</h2>
          </AnimatedElement>

          <div className="use-cases-content">
            <AnimatedElement animation="slide-up" delay={100}>
              <div className="industries-card">
                <h3>{t('solutions.trafficSimulationModellingSolution.useCases.industriesTitle')}</h3>
                <div className="industry-tags">
                  <span className="industry-tag">{t('solutions.trafficSimulationModellingSolution.useCases.industry1')}</span>
                  <span className="industry-tag">{t('solutions.trafficSimulationModellingSolution.useCases.industry2')}</span>
                  <span className="industry-tag">{t('solutions.trafficSimulationModellingSolution.useCases.industry3')}</span>
                </div>
                <div className="outcome">
                  <h4>{t('solutions.trafficSimulationModellingSolution.useCases.outcomeTitle')}</h4>
                  <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.useCases.outcomeDesc') }}></p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={200}>
              <div className="scenario-card">
                <h3>{t('solutions.trafficSimulationModellingSolution.useCases.scenarioTitle')}</h3>
                <div className="scenario-flow">
                  <div className="flow-step">
                    <div className="step-number">1</div>
                    <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.useCases.scenarioStep1') }}></p>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-step">
                    <div className="step-number">2</div>
                    <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.useCases.scenarioStep2') }}></p>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-step">
                    <div className="step-number">3</div>
                    <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.useCases.scenarioStep3') }}></p>
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
              <h3 className="section-title">{t('solutions.trafficSimulationModellingSolution.cta.title')}</h3>
              <p className="get-in-touch-description" dangerouslySetInnerHTML={{ __html: t('solutions.trafficSimulationModellingSolution.cta.description') }}></p>
              <div className="get-in-touch-buttons">
                <Link to="/get-in-touch" className="contact-button primary">
                  {t('solutions.trafficSimulationModellingSolution.cta.button')}
                </Link>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}
