import React, { useContext } from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import SectionShell from './atoms/SectionShell';
import SectionEyebrow from './atoms/SectionEyebrow';
import SectionHeading from './atoms/SectionHeading';
import AnimatedElement from './atoms/AnimatedElement';
import './LandingIntro.css';

const LandingIntro = () => {
  const { t } = useContext(LanguageContext);

  return (
    <SectionShell tone="base" ariaLabel={t('landing.intro.eyebrow')}>
      <div className="landing-intro">
        <AnimatedElement delay={0}>
          <SectionEyebrow text={t('landing.intro.eyebrow')} />
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <SectionHeading>{t('landing.intro.headline')}</SectionHeading>
        </AnimatedElement>
        <AnimatedElement delay={400}>
          <p className="landing-intro__body">{t('landing.intro.body')}</p>
        </AnimatedElement>
      </div>
    </SectionShell>
  );
};

export default LandingIntro;
