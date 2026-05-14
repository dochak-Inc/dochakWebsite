import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import SectionShell from './atoms/SectionShell';
import SectionEyebrow from './atoms/SectionEyebrow';
import SectionHeading from './atoms/SectionHeading';
import AnimatedElement from './atoms/AnimatedElement';
import './LandingTraining.css';

const LandingTraining = () => {
  const { t } = useContext(LanguageContext);
  const courses = t('landing.training.courses');
  const courseList = Array.isArray(courses) ? courses : [];

  return (
    <SectionShell tone="lift" ariaLabel={t('landing.training.eyebrow')}>
      <div className="landing-training">

        <div className="landing-training__text">
          <AnimatedElement delay={0}>
            <SectionEyebrow text={t('landing.training.eyebrow')} />
          </AnimatedElement>
          <AnimatedElement delay={200}>
            <SectionHeading>{t('landing.training.headline')}</SectionHeading>
          </AnimatedElement>
          <AnimatedElement delay={400}>
            <p className="landing-training__body">{t('landing.training.body')}</p>
          </AnimatedElement>

          <AnimatedElement delay={600}>
            <div className="landing-training__badge">
              <span className="landing-training__badge-label">
                {t('landing.training.badge.label')}
              </span>
              <span className="landing-training__badge-title">
                {t('landing.training.badge.title')}
              </span>
            </div>
          </AnimatedElement>
        </div>

        <div className="landing-training__courses">
          {courseList.map((course, i) => (
            <AnimatedElement key={course.code} delay={400 + i * 100}>
              <div className="landing-training__course">
                <span className="landing-training__course-code">{course.code}</span>
                <span className="landing-training__course-title">{course.title}</span>
              </div>
            </AnimatedElement>
          ))}
          <AnimatedElement delay={400 + courseList.length * 100}>
            <Link to="/training" className="landing-training__viewall">
              {t('landing.training.viewAll')}
            </Link>
          </AnimatedElement>
        </div>

      </div>
    </SectionShell>
  );
};

export default LandingTraining;
