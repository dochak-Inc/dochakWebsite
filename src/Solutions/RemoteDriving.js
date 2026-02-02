import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './RemoteDriving.css';
import LanguageContext from '../contexts/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Import images
import tele from '../assets/tele.webp';
import jeju from '../assets/jeju.webp';
import working from '../assets/working.webp';

export default function RemoteDriving() {
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
    <div className="remote-driving-page">
      {/* Hero Section */}
      <section className="remote-driving-hero">
        <div className="hero-container">
          <AnimatedElement animation="slide-up" delay={0}>
            <h1 className="hero-title">{t('solutions.remoteDriving.hero.title')}</h1>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={200}>
            <p className="hero-subtitle">{t('solutions.remoteDriving.hero.subtitle')}</p>
          </AnimatedElement>
        </div>
      </section>

      {/* Overview Section */}
      <section className="overview-section">
        <div className="section-container">
          <AnimatedElement animation="slide-up" delay={0}>
            <h2 className="section-title">{t('solutions.remoteDriving.overview.title')}</h2>
          </AnimatedElement>
          
          {/* First Row: Explanation Left, Video Right */}
          <div className="overview-row first-row">
            <AnimatedElement animation="slide-left" delay={100}>
              <div className="explanation-content">
                <h3>{t('solutions.remoteDriving.overview.shortDemo')}</h3>
                <p dangerouslySetInnerHTML={{ __html: t('solutions.remoteDriving.overview.shortDemoDesc') }}></p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="slide-right" delay={200}>
              <div className="video-wrapper">
                <div className="video-container">
                  <iframe
                    src="https://www.youtube.com/embed/uTBSurLXXqk?si=rOd5nQ5FnZ7SmEuq"
                    title={t('solutions.remoteDriving.overview.shortDemo')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="youtube-video"
                  ></iframe>
                </div>
              </div>
            </AnimatedElement>
          </div>          
          {/* Second Row: Video Left, Explanation Right */}
          <div className="overview-row">
            <AnimatedElement animation="slide-left" delay={100}>
              <div className="video-wrapper">
                <div className="video-container">
                  <iframe
                    src="https://www.youtube.com/embed/HHdDThRBQLw?si=jH4K4TEXP_sTr1kC"
                    title={t('solutions.remoteDriving.overview.longDemo')}
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
                <h3>{t('solutions.remoteDriving.overview.longDemo')}</h3>
                <p dangerouslySetInnerHTML={{ __html: t('solutions.remoteDriving.overview.longDemoDesc') }}></p>
              </div>
            </AnimatedElement>
          </div>

          <div className="overview-content">
            <AnimatedElement animation="slide-left" delay={100}>
              <div className="explanation-content">
                <h3>{t('solutions.remoteDriving.overview.RD-1')}</h3>
                <p dangerouslySetInnerHTML={{ __html: t('solutions.remoteDriving.overview.RD-1Desc') }}></p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="slide-right" delay={200}>
              <div className="video-wrapper">
                <div className="video-container">
                  <iframe
                    src="https://www.youtube.com/embed/jf2CWvakPNE?si=lffeQL-qNeEx0yuZ"
                    title={t('solutions.remoteDriving.overview.RD-1')}
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
            <h2 className="section-title">{t('solutions.remoteDriving.technical.title')}</h2>
          </AnimatedElement>
          
          <div className="technical-grid">
            <AnimatedElement animation="slide-left" delay={100}>
              <div className="specs-card">
                <h3>{t('solutions.remoteDriving.technical.specsTitle')}</h3>
                <ul className="specs-list">
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.remoteDriving.technical.spec1') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.remoteDriving.technical.spec2') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.remoteDriving.technical.spec3') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.remoteDriving.technical.spec4') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.remoteDriving.technical.spec5') }}></li>
                </ul>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-right" delay={200}>
              <div className="research-card">
                <h3>{t('solutions.remoteDriving.technical.researchTitle')}</h3>
                <div className="research-item">
                  <h4>{t('solutions.remoteDriving.technical.patentTitle')}</h4>
                  <div className="patent-details">
                    <div className="patent-title">"{t('solutions.remoteDriving.technical.patentName')}"</div>
                    <div className="patent-info-row">
                      <div className="patent-date">
                        <span className="patent-date-label">{t('solutions.remoteDriving.technical.applicationDate')}:</span>
                        <span className="patent-date-value">2024.12.13</span>
                      </div>
                      <div className="patent-number">
                        <span className="patent-number-label">{t('solutions.remoteDriving.technical.patentNumber')}:</span>
                        <span className="patent-number-value">P2024-1108-KR01</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="research-item">
                  <h4>{t('solutions.remoteDriving.technical.academicTitle')}</h4>
                  <p dangerouslySetInnerHTML={{ __html: t('solutions.remoteDriving.technical.academicInfo') }}></p>
                </div>
                <div className="cta-button-container">
                  <Link to="/disclosure" className="cta-button">
                    {t('solutions.remoteDriving.technical.disclosureButton')}
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
            <h2 className="section-title">{t('solutions.remoteDriving.useCases.title')}</h2>
          </AnimatedElement>
          
          <div className="use-cases-content">
            <AnimatedElement animation="slide-up" delay={100}>
              <div className="industries-card">
                <h3>{t('solutions.remoteDriving.useCases.industriesTitle')}</h3>
                <div className="industry-tags">
                  <span className="industry-tag">{t('solutions.remoteDriving.useCases.industry1')}</span>
                  <span className="industry-tag">{t('solutions.remoteDriving.useCases.industry2')}</span>
                  <span className="industry-tag">{t('solutions.remoteDriving.useCases.industry3')}</span>
                </div>
                <div className="outcome">
                  <h4>{t('solutions.remoteDriving.useCases.outcomeTitle')}</h4>
                  <p dangerouslySetInnerHTML={{ __html: t('solutions.remoteDriving.useCases.outcomeDesc') }}></p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={200}>
              <div className="scenario-card">
                <h3>{t('solutions.remoteDriving.useCases.scenarioTitle')}</h3>
                <div className="scenario-flow">
                  <div className="flow-step">
                    <div className="step-number">1</div>
                    <p dangerouslySetInnerHTML={{ __html: t('solutions.remoteDriving.useCases.scenarioStep1') }}></p>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-step">
                    <div className="step-number">2</div>
                    <p dangerouslySetInnerHTML={{ __html: t('solutions.remoteDriving.useCases.scenarioStep2') }}></p>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-step">
                    <div className="step-number">3</div>
                    <p dangerouslySetInnerHTML={{ __html: t('solutions.remoteDriving.useCases.scenarioStep3') }}></p>
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
              <h3 className="section-title">{t('solutions.remoteDriving.cta.title')}</h3>
              <p className="get-in-touch-description" dangerouslySetInnerHTML={{ __html: t('solutions.remoteDriving.cta.description') }}></p>
              <div className="get-in-touch-buttons">
                <Link to="/get-in-touch" className="contact-button primary">
                  {t('solutions.remoteDriving.cta.button')}
                </Link>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}