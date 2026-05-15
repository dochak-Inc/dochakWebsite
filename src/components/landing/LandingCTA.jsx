import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import SectionShell from './atoms/SectionShell';
import SectionEyebrow from './atoms/SectionEyebrow';
import SectionHeading from './atoms/SectionHeading';
import AnimatedElement from './atoms/AnimatedElement';
import './LandingCTA.css';

const LandingCTA = () => {
  const { t } = useContext(LanguageContext);
  const email = t('landing.cta.email');

  return (
    <SectionShell tone="base" ariaLabel={t('landing.cta.eyebrow')}>
      <div className="landing-cta">
        <AnimatedElement delay={0}>
          <SectionEyebrow text={t('landing.cta.eyebrow')} />
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <SectionHeading>{t('landing.cta.headline')}</SectionHeading>
        </AnimatedElement>
        <AnimatedElement delay={400}>
          <p className="landing-cta__body">{t('landing.cta.body')}</p>
        </AnimatedElement>
        <AnimatedElement delay={600}>
          <Link to="/get-in-touch" className="landing-cta__button">
            {t('landing.cta.button')}
          </Link>
        </AnimatedElement>
        <AnimatedElement delay={800}>
          <p className="landing-cta__email-line">
            {t('landing.cta.emailLine')}{' '}
            <a href={`mailto:${email}`} className="landing-cta__email">{email}</a>.
          </p>
        </AnimatedElement>
      </div>
    </SectionShell>
  );
};

export default LandingCTA;
