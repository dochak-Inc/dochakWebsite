import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import SectionShell from './atoms/SectionShell';
import SectionEyebrow from './atoms/SectionEyebrow';
import SectionHeading from './atoms/SectionHeading';
import AnimatedElement from './atoms/AnimatedElement';
import './LandingSolutions.css';

const SOLUTIONS = [
  { key: 'remoteDriving',        slug: 'remote-driving' },
  { key: 'digitalTwin',          slug: 'digital-twin' },
  { key: 'multimodalSimulator',  slug: 'multimodal-simulator' },
  { key: 'trafficAnalysisTools', slug: 'traffic-analysis-tools' },
  { key: 'visualization',        slug: 'visualization' },
  { key: 'vrRoadDesign',         slug: 'vr-road-design' },
];

const LandingSolutions = () => {
  const { t } = useContext(LanguageContext);

  return (
    <SectionShell tone="lift" ariaLabel={t('landing.solutions.eyebrow')}>
      <div className="landing-solutions__intro">
        <AnimatedElement delay={0}>
          <SectionEyebrow text={t('landing.solutions.eyebrow')} />
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <SectionHeading>{t('landing.solutions.headline')}</SectionHeading>
        </AnimatedElement>
        <AnimatedElement delay={400}>
          <p className="landing-solutions__body">{t('landing.solutions.body')}</p>
        </AnimatedElement>
      </div>

      <div className="landing-solutions__grid">
        {SOLUTIONS.map((sol, i) => (
          <AnimatedElement key={sol.key} delay={600 + i * 100} className="landing-solutions__card-wrap">
            <Link
              to={`/solutions/${sol.slug}`}
              className="landing-solutions__card"
              aria-label={t(`landing.solutions.cards.${sol.key}.title`)}
            >
              <h3 className="landing-solutions__card-title">
                {t(`landing.solutions.cards.${sol.key}.title`)}
              </h3>
              <p className="landing-solutions__card-body">
                {t(`landing.solutions.cards.${sol.key}.body`)}
              </p>
              <span className="landing-solutions__card-arrow" aria-hidden="true">→</span>
            </Link>
          </AnimatedElement>
        ))}
      </div>

      <AnimatedElement delay={1300} className="landing-solutions__viewall-wrap">
        <Link to="/solutions" className="landing-solutions__viewall">
          {t('landing.solutions.viewAll')}
        </Link>
      </AnimatedElement>
    </SectionShell>
  );
};

export default LandingSolutions;
