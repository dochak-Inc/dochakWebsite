import React, { useState, useContext } from 'react';
import './Projects.css';
import nepo from './assets/nepo.webp';
import working from './assets/working.webp';
import tele from './assets/tele.webp';
import jeju from './assets/jeju.webp';
import laugh from './assets/laugh.webp';
import LanguageContext from './contexts/LanguageContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';

function ProjectImageCarousel({ images }) {
  const { t } = useContext(LanguageContext);
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIdx(i => (i === images.length - 1 ? 0 : i + 1));
  return (
    <div className="project-carousel">
      {images.length > 1 && (
        <button className="carousel-arrow left" onClick={prev} aria-label={t('projects.carousel.prevImage')}>&#8592;</button>
      )}
      <img src={images[idx]} alt="Project visual" className="project-photo" />
      {images.length > 1 && (
        <button className="carousel-arrow right" onClick={next} aria-label={t('projects.carousel.nextImage')}>&#8594;</button>
      )}
    </div>
  );
}

export default function Projects() {
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

  // Function to get the correct CSS class for status
  const getStatusClass = (status) => {
    // Map translated status back to English for CSS class
    if (status === t('projects.status.ongoing')) {
      return 'ongoing';
    }
    // Add more status mappings as needed
    return status.toLowerCase();
  };

  const projects = [
    {
      images: [nepo, laugh],
      title: t('projects.items.naepo.title'),
      date: t('projects.items.naepo.date'),
      status: t('projects.status.ongoing'),
      explanation: t('projects.items.naepo.explanation')
    },
    {
      images: [jeju, working, tele],
      title: t('projects.items.teleDriving.title'),
      date: t('projects.items.teleDriving.date'),
      status: t('projects.status.ongoing'),
      explanation: t('projects.items.teleDriving.explanation')
    }
  ];

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <div className="projects-hero-content">
          <AnimatedElement animation="slide-up" delay={0}>
            <h1 className="projects-hero-title">{t('projects.heroTitle')}</h1>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={200}>
            <p className="projects-hero-subtitle">{t('projects.heroSubtitle')}</p>
          </AnimatedElement>
        </div>
      </section>
      <section className="projects-list-section">
        <div className="projects-list">
          {projects.map((proj, idx) => (
            <div className="project-card" key={idx}>
              <div className="project-info-section">
                <div className="project-title-status-row">
                  <h2 className="project-title">{proj.title}</h2>
                  <div className={`project-status project-status-${getStatusClass(proj.status)}`}>{proj.status}</div>
                </div>
                <span className="project-date">{proj.date}</span>
                <div className="project-explanation" 
                     dangerouslySetInnerHTML={{
                       __html: proj.explanation
                     }}
                />
              </div>
              <div className="project-photo-section">
                <ProjectImageCarousel images={proj.images} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 
