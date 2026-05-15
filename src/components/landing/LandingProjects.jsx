import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import SectionShell from './atoms/SectionShell';
import SectionEyebrow from './atoms/SectionEyebrow';
import SectionHeading from './atoms/SectionHeading';
import AnimatedElement from './atoms/AnimatedElement';
import naepoImg from '../../assets/nepo.webp';
import teleImg from '../../assets/teledrivingLanding.png';
import airportImg from '../../assets/incheonLanding.png';
import './LandingProjects.css';

const IMAGES = [naepoImg, teleImg, airportImg];

const LandingProjects = () => {
  const { t } = useContext(LanguageContext);
  const items = t('landing.projects.items');
  const projectList = Array.isArray(items) ? items : [];

  return (
    <SectionShell tone="deep" ariaLabel={t('landing.projects.eyebrow')}>
      <div className="landing-projects__intro">
        <AnimatedElement delay={0}>
          <SectionEyebrow text={t('landing.projects.eyebrow')} />
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <SectionHeading>{t('landing.projects.headline')}</SectionHeading>
        </AnimatedElement>
        <AnimatedElement delay={400}>
          <p className="landing-projects__body">{t('landing.projects.body')}</p>
        </AnimatedElement>
      </div>

      <div className="landing-projects__list">
        {projectList.map((project, i) => (
          <AnimatedElement key={project.anchor || i} delay={200 + i * 150}>
            <article
              className={`landing-projects__item ${i % 2 === 1 ? 'is-reversed' : ''}`}
            >
              <div className="landing-projects__item-image">
                <img
                  src={IMAGES[i]}
                  alt={project.title}
                  loading="lazy"
                />
              </div>
              <div className="landing-projects__item-text">
                <h3 className="landing-projects__item-title">{project.title}</h3>
                <p className="landing-projects__item-body">{project.body}</p>
                <Link
                  to={`/projects${project.anchor || ''}`}
                  className="landing-projects__item-link"
                >
                  {t('landing.projects.viewCase')}
                </Link>
              </div>
            </article>
          </AnimatedElement>
        ))}
      </div>

      <AnimatedElement delay={800} className="landing-projects__viewall-wrap">
        <Link to="/projects" className="landing-projects__viewall">
          {t('landing.projects.viewAll')}
        </Link>
      </AnimatedElement>
    </SectionShell>
  );
};

export default LandingProjects;
