import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './TrafficAnalysisTools.css';
import LanguageContext from '../contexts/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import meso from '../assets/meso.webp';
import micro from '../assets/micro.webp';
import nepo from '../assets/내포3D모델.webp';
import { EnhancedStickyScroll } from '../components/ui/enhanced-sticky-scroll';
import { transformTechnologiesData } from '../utils/dataTransform';

export default function TrafficAnalysisTools() {
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

  
  // Create technologies data using translations
  const technologies = [
    {
      title: t('technologies.items.visum.title'),
      subtitle: t('technologies.items.visum.subtitle'),
      image: meso,
      features: [
        {
          title: t('technologies.items.visum.howItWorks'),
          desc: t('technologies.items.visum.features.howItWorks')
        },
        {
          title: t('technologies.items.visum.whatItCanDo'),
          desc: t('technologies.items.visum.features.whatItCanDo')
        },
        {
          title: t('technologies.items.visum.whereItCanBeUsed'),
          desc: t('technologies.items.visum.features.whereItCanBeUsed')
        }
      ]
    },
    {
      title: t('technologies.items.vissim.title'),
      subtitle: t('technologies.items.vissim.subtitle'),
      image: micro,
      features: [
        {
          title: t('technologies.items.visum.howItWorks'),
          desc: t('technologies.items.vissim.features.howItWorks')
        },
        {
          title: t('technologies.items.visum.whatItCanDo'),
          desc: t('technologies.items.vissim.features.whatItCanDo')
        },
        {
          title: t('technologies.items.visum.whereItCanBeUsed'),
          desc: t('technologies.items.vissim.features.whereItCanBeUsed')
        }
      ]
    },
    {
      title: t('technologies.items.mesh.title'),
      subtitle: t('technologies.items.mesh.subtitle'),
      image: nepo,
      features: [
        {
          title: t('technologies.items.visum.howItWorks'),
          desc: t('technologies.items.mesh.features.howItWorks')
        },
        {
          title: t('technologies.items.visum.whatItCanDo'),
          desc: t('technologies.items.mesh.features.whatItCanDo')
        },
        {
          title: t('technologies.items.visum.whereItCanBeUsed'),
          desc: t('technologies.items.mesh.features.whereItCanBeUsed')
        }
      ]
    }
  ];

  // Transform technologies data for enhanced sticky scroll
  const enhancedContent = transformTechnologiesData(technologies);
  


  return (
    <div className="traffic-analysis-tools-page">
      {/* Hero Section */}
      <section className="traffic-analysis-tools-hero">
        <div className="hero-container">
          <AnimatedElement animation="slide-up" delay={0}>
            <h1 className="hero-title">{t('solutions.trafficAnalysisToolsSolution.hero.title')}</h1>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={200}>
            <p className="hero-subtitle" dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.hero.subtitle') }}></p>
          </AnimatedElement>
        </div>
      </section>

      {/* Overview Section */}
      <section className="overview-section">
        <div className="section-container">
            <AnimatedElement animation="slide-right" delay={200}>
              <div className="video-wrapper">
                <div className="video-container">
                  <iframe
                    src="https://www.youtube.com/embed/kL11AdA_DvE?si=_AKT55Okf50-HtPF"
                    title={t('solutions.trafficAnalysisToolsSolution.overview.demo')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="youtube-video"
                  ></iframe>
                </div>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="slide-right" delay={100}>
              <div className="explanation-content">
                <h3>{t('solutions.trafficAnalysisToolsSolution.overview.TA-5')}</h3>
                <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.overview.TA-5Desc') }}></p>
              </div>
            </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={0}>
            <h2 className="section-title">{t('solutions.trafficAnalysisToolsSolution.overview.title')}</h2>
          </AnimatedElement>
          <div className="overview-row">          
          {/* Second Row: Video Left, Explanation Right */}              
            <AnimatedElement animation="slide-left" delay={100}>
              <div className="video-wrapper">
                <div className="video-container">
                  <iframe
                    src="https://www.youtube.com/embed/GPcCS-LHPOY?si=UKYBYGYcwKc-K3mi"
                    title={t('solutions.trafficAnalysisToolsSolution.overview.TA-4')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="youtube-video"
                  ></iframe>
                </div>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="slide-right" delay={100}>
              <div className="explanation-content">
                <h3>{t('solutions.trafficAnalysisToolsSolution.overview.TA-4')}</h3>
                <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.overview.TA-4Desc') }}></p>
              </div>
            </AnimatedElement>
          </div>
          {/* Single Video Demo */}
          <div className="overview-content">
            <AnimatedElement animation="slide-left" delay={100}>
              <div className="explanation-content">
                <h3>{t('solutions.trafficAnalysisToolsSolution.overview.demo')}</h3>
                <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.overview.demoDesc') }}></p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="slide-right" delay={200}>
              <div className="video-wrapper">
                <div className="video-container">
                  <iframe
                    src="https://www.youtube.com/embed/4GHNow4uQ7c?si=v0t2i9JzwIu7hx8U"
                    title={t('solutions.trafficAnalysisToolsSolution.overview.demo')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="youtube-video"
                  ></iframe>
                </div>
              </div>
            </AnimatedElement>
          </div>
          <div className="overview-row">          
          {/* Second Row: Video Left, Explanation Right */}              
            <AnimatedElement animation="slide-left" delay={100}>
              <div className="video-wrapper">
                <div className="video-container">
                  <iframe
                    src="https://www.youtube.com/embed/SIvNsejU8wA?si=BOCS-1AnToQd58t5"
                    title={t('solutions.trafficAnalysisToolsSolution.overview.TA-1')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="youtube-video"
                  ></iframe>
                </div>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="slide-right" delay={100}>
              <div className="explanation-content">
                <h3>{t('solutions.trafficAnalysisToolsSolution.overview.TA-1')}</h3>
                <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.overview.TA-1Desc') }}></p>
              </div>
            </AnimatedElement>
          </div>
          <div className="overview-content">
            <AnimatedElement animation="slide-left" delay={100}>
              <div className="explanation-content">
                <h3>{t('solutions.trafficAnalysisToolsSolution.overview.TA-2')}</h3>
                <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.overview.TA-2Desc') }}></p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="slide-right" delay={200}>
              <div className="video-wrapper">
                <div className="video-container">
                  <iframe
                    src="https://www.youtube.com/embed/P6qtlPoWqBs?si=98PZbDMEP5FPJRd2"
                    title={t('solutions.trafficAnalysisToolsSolution.overview.TA-2')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="youtube-video"
                  ></iframe>
                </div>
              </div>
            </AnimatedElement>
          </div>
          <div className="overview-row">          
          {/* Second Row: Video Left, Explanation Right */}              
            <AnimatedElement animation="slide-left" delay={100}>
              <div className="video-wrapper">
                <div className="video-container">
                  <iframe
                    src="https://www.youtube.com/embed/200mMlmkDVA?si=g85lm4fD7F97rncg"
                    title={t('solutions.trafficAnalysisToolsSolution.overview.TA-3')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="youtube-video"
                  ></iframe>
                </div>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="slide-right" delay={100}>
              <div className="explanation-content">
                <h3>{t('solutions.trafficAnalysisToolsSolution.overview.TA-3')}</h3>
                <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.overview.TA-3Desc') }}></p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Technical Details Section */}
      <section className="technical-section">
        <div className="section-container">
          <AnimatedElement animation="slide-up" delay={0}>
            <h2 className="section-title">{t('solutions.trafficAnalysisToolsSolution.technical.title')}</h2>
          </AnimatedElement>
        </div>
      </section>    
          {/* Enhanced Sticky Scroll Section - Full Page Height */}
          <EnhancedStickyScroll
            content={enhancedContent}
            className="w-full"
          />
      <section className="technical-section">
        <div className="section-container">             
          <div className="technical-grid">
            <AnimatedElement animation="slide-left" delay={100}>
              <div className="specs-card">
                <h3>{t('solutions.trafficAnalysisToolsSolution.technical.specsTitle')}</h3>
                <ul className="specs-list">
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.technical.spec1') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.technical.spec2') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.technical.spec3') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.technical.spec4') }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.technical.spec5') }}></li>
                </ul>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-right" delay={200}>
              <div className="research-card">
                <h3>{t('solutions.trafficAnalysisToolsSolution.technical.researchTitle')}</h3>
                <div className="research-item">
                  <h4>{t('solutions.trafficAnalysisToolsSolution.technical.patentTitle')}</h4>
                  <div className="patent-details">
                    <div className="patent-title" dangerouslySetInnerHTML={{ __html: `"${t('solutions.trafficAnalysisToolsSolution.technical.patentName')}"` }}></div>
                    <div className="patent-info-row">
                      <div className="patent-date">
                        <span className="patent-date-label">{t('solutions.trafficAnalysisToolsSolution.technical.applicationDate')}:</span>
                        <span className="patent-date-value">TBD</span>
                      </div>
                      <div className="patent-number">
                        <span className="patent-number-label">{t('solutions.trafficAnalysisToolsSolution.technical.patentNumber')}:</span>
                        <span className="patent-number-value">TBD</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="research-item">
                  <h4>{t('solutions.trafficAnalysisToolsSolution.technical.academicTitle')}</h4>
                  <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.technical.academicInfo') }}></p>
                </div>
                <div className="cta-button-container">
                  <Link to="/disclosure" className="cta-button">
                    {t('solutions.trafficAnalysisToolsSolution.technical.disclosureButton')}
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
            <h2 className="section-title">{t('solutions.trafficAnalysisToolsSolution.useCases.title')}</h2>
          </AnimatedElement>
          
          <div className="use-cases-content">
            <AnimatedElement animation="slide-up" delay={100}>
              <div className="industries-card">
                <h3>{t('solutions.trafficAnalysisToolsSolution.useCases.industriesTitle')}</h3>
                <div className="industry-tags">
                  <span className="industry-tag">{t('solutions.trafficAnalysisToolsSolution.useCases.industry1')}</span>
                  <span className="industry-tag">{t('solutions.trafficAnalysisToolsSolution.useCases.industry2')}</span>
                  <span className="industry-tag">{t('solutions.trafficAnalysisToolsSolution.useCases.industry3')}</span>
                </div>
                <div className="outcome">
                  <h4>{t('solutions.trafficAnalysisToolsSolution.useCases.outcomeTitle')}</h4>
                  <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.useCases.outcomeDesc') }}></p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={200}>
              <div className="scenario-card">
                <h3>{t('solutions.trafficAnalysisToolsSolution.useCases.scenarioTitle')}</h3>
                <div className="scenario-flow">
                  <div className="flow-step">
                    <div className="step-number">1</div>
                    <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.useCases.scenarioStep1') }}></p>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-step">
                    <div className="step-number">2</div>
                    <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.useCases.scenarioStep2') }}></p>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-step">
                    <div className="step-number">3</div>
                    <p dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.useCases.scenarioStep3') }}></p>
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
              <h3 className="section-title">{t('solutions.trafficAnalysisToolsSolution.cta.title')}</h3>
              <p className="get-in-touch-description" dangerouslySetInnerHTML={{ __html: t('solutions.trafficAnalysisToolsSolution.cta.description') }}></p>
              <div className="get-in-touch-buttons">
                <Link to="/get-in-touch" className="contact-button primary">
                  {t('solutions.trafficAnalysisToolsSolution.cta.button')}
                </Link>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}
