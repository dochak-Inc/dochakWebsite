import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProjectsPage.css';
import VideoPlayer from './VideoPlayer';
import LanguageContext from '../contexts/LanguageContext';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';

// Import project images
import nepo from '../assets/nepo.webp';
import working from '../assets/working.webp';
import tele from '../assets/tele.webp';
import jeju from '../assets/jeju.webp';
import laugh from '../assets/laugh.webp';
import building from '../assets/building.webp';
import city from '../assets/city.webp';
import computer from '../assets/computer.webp';
import dash from '../assets/dash.webp';
import highway from '../assets/highway.webp';
import truck from '../assets/truck.webp';
import car from '../assets/car.webp';
import booth from '../assets/booth.webp';
import simulator from '../assets/simulator.webp';
import visual from '../assets/visual.webp';
import watch from '../assets/watch.webp';
import clap from '../assets/clap.webp';
import long from '../assets/long.webp';
import multi from '../assets/multi.webp';
import micro from '../assets/micro.webp';
import meso from '../assets/meso.webp';
import twin from '../assets/twin.webp';
import VR from '../assets/VR.webp';
import truck_hori from '../assets/truck_hori.webp';
import automob from '../assets/automob.webp';

const ProjectsPage = () => {
  const { t } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState(0);
  const tabContainerRef = useRef(null);

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

  // Project data with enhanced content
  const projects = [
    {
      id: 'naepo',
      title: t('projects.items.naepo.title'),
      date: t('projects.items.naepo.date'),
      status: t('projects.status.ongoing'),
      description: t('projects.items.naepo.explanation'),
      detailedDescription: t('projects.items.naepo.detailedDescription'),
      keyFeatures: t('projects.items.naepo.keyFeatures'),
      impact: t('projects.items.naepo.impact'),
      impactStats: t('projects.items.naepo.impactStats'),
      video: {
        src: 'https://www.youtube.com/embed/zkzDjxeQpOI?si=2ejnZMeIT0rxDsdM', // Placeholder - replace with actual video
        title: t('projects.items.naepo.videoTitle'),
        description: t('projects.items.naepo.videoDescription')
      },
      images: [nepo, building, city, computer, dash, twin, visual],
      technologies: ['Digital Twin', 'AI/ML', 'IoT Sensors', 'Real-time Simulation']
    },
    {
      id: 'teleDriving',
      title: t('projects.items.teleDriving.title'),
      date: t('projects.items.teleDriving.date'),
      status: t('projects.status.ongoing'),
      description: t('projects.items.teleDriving.explanation'),
      detailedDescription: t('projects.items.teleDriving.detailedDescription'),
      keyFeatures: t('projects.items.teleDriving.keyFeatures'),
      impact: t('projects.items.teleDriving.impact'),
      impactStats: t('projects.items.teleDriving.impactStats'),
      video: {
        src: 'https://www.youtube.com/embed/-2GbzReGPWY?si=S2ZuX768rv8qbChL', // Placeholder - replace with actual video
        title: t('projects.items.teleDriving.videoTitle'),
        description: t('projects.items.teleDriving.videoDescription')
      },
      images: [jeju, working, tele, truck, car, highway, VR],
      technologies: ['Remote Driving', '5G Communication', 'Autonomous Systems', 'Safety Protocols']
    },
    {
      id: 'publicTransport',
      title: t('projects.items.publicTransport.title'),
      date: t('projects.items.publicTransport.date'),
      status: t('projects.status.ongoing'),
      description: t('projects.items.publicTransport.explanation'),
      detailedDescription: t('projects.items.publicTransport.detailedDescription'),
      keyFeatures: t('projects.items.publicTransport.keyFeatures'),
      impact: t('projects.items.publicTransport.impact'),
      impactStats: t('projects.items.publicTransport.impactStats'),
      video: {
        src: 'https://www.youtube.com/embed/ZrVK3VJ3ppY?si=b7MvofLRl3CwfmFE', // Placeholder - replace with actual video
        title: t('projects.items.publicTransport.videoTitle'),
        description: t('projects.items.publicTransport.videoDescription')
      },
      images: [booth, simulator, truck_hori, long, multi, automob],
      technologies: ['Public Transit', 'Fleet Management', 'Route Optimization', 'Passenger Analytics']
    },
    {
      id: 'airportParking',
      title: t('projects.items.airportParking.title'),
      date: t('projects.items.airportParking.date'),
      status: t('projects.status.ongoing'),
      description: t('projects.items.airportParking.explanation'),
      detailedDescription: t('projects.items.airportParking.detailedDescription'),
      keyFeatures: t('projects.items.airportParking.keyFeatures'),
      impact: t('projects.items.airportParking.impact'),
      impactStats: t('projects.items.airportParking.impactStats'),
      video: {
        src: 'https://www.youtube.com/embed/EY8w6_oO-Vw?si=hlzISaUJFveOiXOO', // Placeholder - replace with actual video
        title: t('projects.items.airportParking.videoTitle'),
        description: t('projects.items.airportParking.videoDescription')
      },
      images: [watch, clap, micro, meso, visual, city],
      technologies: ['Smart Parking', 'IoT Sensors', 'Mobile Apps', 'Payment Systems']
    }
  ];


  const handleTabClick = (index) => {
    setActiveTab(index);
    
    // Scroll active tab into view on mobile
    if (tabContainerRef.current && window.innerWidth <= 767) {
      const activeButton = tabContainerRef.current.children[index];
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  const getStatusClass = (status) => {
    if (status === t('projects.status.ongoing')) {
      return 'ongoing';
    }
    return status.toLowerCase();
  };

  const getShortenedDescription = (text) => {
    if (!text) return '';
    
    // Split by sentences first
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    
    // Take the first two sentences for consistent length
    if (sentences.length >= 2) {
      return sentences.slice(0, 2).join('. ').trim() + '.';
    } else if (sentences.length === 1) {
      return sentences[0].trim() + '.';
    }
    
    return text;
  };

  const getFeatureIcon = (feature, index) => {
    // Create a simple hash of the feature text to consistently assign icons
    const featureText = feature.toString().toLowerCase();
    
    // Define icon mappings based on keywords
    if (featureText.includes('real-time') || featureText.includes('실시간')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    } else if (featureText.includes('ai') || featureText.includes('prediction') || featureText.includes('예측') || featureText.includes('인공지능')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 3L6 12L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 3L18 12L19 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    } else if (featureText.includes('3d') || featureText.includes('digital twin') || featureText.includes('디지털') || featureText.includes('시각화')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="L2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="L2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    } else if (featureText.includes('management') || featureText.includes('system') || featureText.includes('관리') || featureText.includes('시스템')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    } else if (featureText.includes('smart') || featureText.includes('signal') || featureText.includes('optimization') || featureText.includes('스마트') || featureText.includes('최적화')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.663 17h4.673M12 3v1M6.343 4.343l.707.707M4.343 6.343l.707.707M3 12h1M17.657 4.343l-.707.707M19.657 6.343l-.707.707M21 12h-1M12 21v-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="17" r="3" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
    } else if (featureText.includes('5g') || featureText.includes('communication') || featureText.includes('remote') || featureText.includes('원격') || featureText.includes('통신')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1.42 9a16 16 0 0 1 21.16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="12" y1="20" x2="12.01" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    } else if (featureText.includes('energy') || featureText.includes('efficient') || featureText.includes('에너지') || featureText.includes('효율')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    } else if (featureText.includes('mobile') || featureText.includes('app') || featureText.includes('모바일') || featureText.includes('앱')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    } else {
      // Default checkmark for features that don't match specific keywords
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
  };

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero">
        <AnimatedElement animation="slide-up" delay={0}>
          <h1 className="projects-hero-title">{t('projects.heroTitle')}</h1>
        </AnimatedElement>
        <AnimatedElement animation="slide-up" delay={200}>
          <p className="projects-hero-subtitle">{t('projects.heroSubtitle')}</p>
        </AnimatedElement>
      </section>

      {/* Tab Navigation */}
      <section className="projects-tab-navigation">
        <div 
          className="tab-container"
          ref={tabContainerRef}
          role="tablist"
          aria-label={t('projects.navigation.tabsLabel')}
        >
          {projects.map((project, index) => (
            <button
              key={project.id}
              className={`tab-button ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
              aria-label={`View ${project.title} project`}
              aria-selected={activeTab === index}
              role="tab"
              id={`tab-${project.id}`}
              aria-controls={`tabpanel-${project.id}`}
            >
              {project.title}
            </button>
          ))}
        </div>
      </section>

      {/* Content Area */}
      <section className="projects-content">
        <div className="content-container">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-content ${activeTab === index ? 'active' : ''}`}
              role="tabpanel"
              aria-labelledby={`tab-${project.id}`}
              id={`tabpanel-${project.id}`}
              aria-hidden={activeTab !== index}
            >
              {/* Project Header */}
              <div className="project-header">
                <AnimatedElement animation="slide-up" delay={0}>
                  <div className="project-title-section">
                    <h2 className="project-title">{project.title}</h2>
                    <div className="project-badges">
                      <span className="project-timeline">{project.date}</span>
                      <span className={`project-status project-status-${getStatusClass(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </AnimatedElement>
              </div>

              {/* Overview and Video Section */}
              <div className="project-overview-video-section">
                <div className="overview-video-container">
                  {/* Overview Section */}
                  <AnimatedElement animation="slide-left" delay={100}>
                    <div className="project-overview-content">
                      <h3 className="section-title">{t('projects.content.overviewTitle')}</h3>
                      <p className="project-description" 
                         dangerouslySetInnerHTML={{
                           __html: getShortenedDescription(project.detailedDescription)
                         }}
                      />
                    </div>
                  </AnimatedElement>

                  {/* Video Section */}
                  <AnimatedElement animation="slide-right" delay={200}>
                    <div className="video-section">
                      <div className="video-container">
                        <iframe
                          src={project.video.src}
                          title={project.video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="project-video"
                        ></iframe>
                      </div>
                      <div className="video-info">
                        <h4 className="video-title">{project.video.title}</h4>
                        <p className="video-description"
                           dangerouslySetInnerHTML={{
                             __html: project.video.description
                           }}
                        />
                      </div>
                    </div>
                  </AnimatedElement>
                </div>
              </div>

              {/* Features Section */}
              <div className="project-features-section">
                <div className="project-features-container">
                  <div className="project-features">
                    <AnimatedElement animation="slide-up" delay={0}>
                      <h3 className="section-title">{t('projects.content.featuresTitle')}</h3>
                    </AnimatedElement>
                    <div className="features-grid">
                      {project.keyFeatures.map((feature, featureIndex) => (
                        <AnimatedElement key={featureIndex} animation="scale-in" delay={featureIndex * 100 + 200}>
                          <div className="feature-card">
                            <div className="feature-icon">
                              {getFeatureIcon(feature, featureIndex)}
                            </div>
                            <p className="feature-text"
                               dangerouslySetInnerHTML={{
                                 __html: feature
                               }}
                            />
                          </div>
                        </AnimatedElement>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Section */}
              <div className="project-impact-section">
                <div className="project-impact-container">
                  <div className="project-impact">
                    <AnimatedElement animation="slide-up" delay={0}>
                      <h3 className="section-title">{t('projects.content.impactTitle')}</h3>
                    </AnimatedElement>
                    <div className="impact-content">
                      <div className="impact-list">
                        {project.impactStats.map((stat, index) => (
                          <AnimatedElement key={index} animation="slide-left" delay={index * 150 + 200}>
                            <div className="impact-item">
                              <span className="impact-number">{stat.number}</span>
                              <p className="impact-text"
                                 dangerouslySetInnerHTML={{
                                   __html: stat.text
                                 }}
                              />
                            </div>
                          </AnimatedElement>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technologies Section */}
              <div className="project-technologies-section">
                <div className="project-technologies-container">
                  <div className="project-technologies">
                    <AnimatedElement animation="slide-up" delay={0}>
                      <h3 className="section-title">{t('projects.content.technologiesTitle')}</h3>
                    </AnimatedElement>
                    <div className="technologies-grid">
                      {project.technologies.map((tech, techIndex) => (
                        <AnimatedElement key={techIndex} animation="scale-in" delay={techIndex * 100 + 200}>
                          <div className="technology-tag">
                            <div className="technology-icon">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <span className="technology-name">{tech}</span>
                          </div>
                        </AnimatedElement>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Get in Touch Section */}
              <div className="project-get-in-touch-section">
                <div className="get-in-touch-container">
                  <AnimatedElement animation="slide-up" delay={0}>
                    <div className="get-in-touch-content">
                      <h3 className="section-title">{t('projects.content.getInTouchTitle')}</h3>
                      <p className="get-in-touch-description">
                        {t('projects.content.getInTouchDescription')}
                      </p>
                      <div className="get-in-touch-buttons">
                        <Link to="/get-in-touch" className="contact-button primary">
                          {t('projects.content.contactUs')}
                        </Link>
                      </div>
                    </div>
                  </AnimatedElement>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage; 

