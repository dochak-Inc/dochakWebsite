import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import DottedMap from 'dotted-map';
import SectionShell from './atoms/SectionShell';
import SectionEyebrow from './atoms/SectionEyebrow';
import SectionHeading from './atoms/SectionHeading';
import AnimatedElement from './atoms/AnimatedElement';
import './LandingAbout.css';

const REGION_DOTS = [
  { lat: 36.5, lng: 127.5, label: 'Korea' },
  { lat: 24.5, lng: 54.4,  label: 'Middle East (UAE)' },
  { lat: -33.9, lng: 151.2, label: 'Australia' },
  { lat: 1.35, lng: 103.8, label: 'Southeast Asia' },
];

const StatCounter = ({ value, label, delay = 0 }) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3, triggerOnce: true });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isVisible) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplayValue(value);
      return;
    }
    const numericMatch = String(value).match(/^(\d+)(.*)$/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }
    const target = parseInt(numericMatch[1], 10);
    const suffix = numericMatch[2] || '';
    const duration = 1200;
    const startTime = performance.now() + delay;
    let rafId;

    const tick = (now) => {
      const t = Math.max(0, Math.min(1, (now - startTime) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayValue(`${Math.floor(target * eased)}${suffix}`);
      if (t < 1) rafId = requestAnimationFrame(tick);
      else setDisplayValue(value);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isVisible, value, delay]);

  return (
    <div ref={elementRef} className="landing-about__stat">
      <span className="landing-about__stat-value">{displayValue}</span>
      <span className="landing-about__stat-label">{label}</span>
    </div>
  );
};

const LandingAbout = () => {
  const { t } = useContext(LanguageContext);
  const stats = t('landing.about.stats');
  const statList = Array.isArray(stats) ? stats : [];

  const mapSvg = React.useMemo(() => {
    const map = new DottedMap({ height: 60, grid: 'diagonal' });
    REGION_DOTS.forEach((d) => {
      map.addPin({ lat: d.lat, lng: d.lng, svgOptions: { color: '#57bceb', radius: 0.6 } });
    });
    return map.getSVG({
      radius: 0.22,
      color: 'rgba(255,255,255,0.18)',
      shape: 'circle',
      backgroundColor: 'transparent',
    });
  }, []);

  return (
    <SectionShell tone="base" ariaLabel={t('landing.about.eyebrow')}>
      <div className="landing-about">

        <div className="landing-about__text">
          <AnimatedElement delay={0}>
            <SectionEyebrow text={t('landing.about.eyebrow')} />
          </AnimatedElement>
          <AnimatedElement delay={200}>
            <SectionHeading>{t('landing.about.headline')}</SectionHeading>
          </AnimatedElement>
          <AnimatedElement delay={400}>
            <p className="landing-about__body">{t('landing.about.body')}</p>
          </AnimatedElement>

          <div className="landing-about__stats">
            {statList.map((stat, i) => (
              <AnimatedElement key={stat.label} delay={600 + i * 100}>
                <StatCounter value={stat.value} label={stat.label} delay={i * 100} />
              </AnimatedElement>
            ))}
          </div>

          <AnimatedElement delay={1100}>
            <Link to="/team" className="landing-about__meetteam">
              {t('landing.about.meetTeam')}
            </Link>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={400} className="landing-about__map-wrap">
          <div className="landing-about__map-label">
            {t('landing.about.regionLabel')}
          </div>
          <div
            className="landing-about__map"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: mapSvg }}
          />
        </AnimatedElement>

      </div>
    </SectionShell>
  );
};

export default LandingAbout;
