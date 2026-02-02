import React, { useContext } from "react";
import { Timeline } from "../ui/timeline";
import "./timelineDemo.css";
import working from "../../assets/working.webp";
import computer from "../../assets/computer.webp";
import booth from "../../assets/booth.webp";
import car from "../../assets/car.webp";
import nepo from "../../assets/nepo.webp";
import building from "../../assets/building.webp";
import highway from "../../assets/highway.webp";
import watch from "../../assets/watch.webp";
import LanguageContext from "../../contexts/LanguageContext";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export function TimelineDemo() {
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
  
  const data = [
    {
      title: "2026.07 -",
      content: (
        <div>
          <AnimatedElement animation="slide-up" delay={0}>
            <p className="timeline-demo-title">{t('timeline.stabilization.title')}</p>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={100}>
            <p className="timeline-demo-paragraph">
              {t('timeline.stabilization.content1')}
            </p>
          </AnimatedElement>
          <div className="grid grid-cols-2 gap-4">
            <AnimatedElement animation="slide-left" delay={200}>
              <img
                src={highway}
                alt="startup template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
              />
            </AnimatedElement>
            <AnimatedElement animation="slide-right" delay={300}>
              <img
                src={watch}
                alt="startup template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
              />
            </AnimatedElement>
          </div>
          <AnimatedElement animation="slide-up" delay={400}>
            <p className="timeline-demo-revenue-text">
              <br />{t('timeline.stabilization.revenueTarget2026')}
            </p>
          </AnimatedElement>
          <AnimatedElement animation="scale-in" delay={500}>
            <p className="timeline-demo-number">
              {t('timeline.stabilization.revenueAmount2026')}
            </p>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={600}>
            <p className="timeline-demo-revenue-text">
              <br />{t('timeline.stabilization.revenueTarget2027')}
            </p>
          </AnimatedElement>
          <AnimatedElement animation="scale-in" delay={700}>
            <p className="timeline-demo-number">
              {t('timeline.stabilization.revenueAmount2027')}
            </p>
          </AnimatedElement>
        </div>
      ),
    },
    {
      title: "2026.01 - 06",
      content: (
        <div>
          <AnimatedElement animation="slide-up" delay={0}>
            <p className="timeline-demo-title">{t('timeline.expansion.title')}</p>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={100}>
            <p className="timeline-demo-paragraph">
              {t('timeline.expansion.content1')}
            </p>
          </AnimatedElement>
          <div className="grid grid-cols-2 gap-4">
            <AnimatedElement animation="slide-left" delay={200}>
              <img
                src={nepo}
                alt="startup template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
              />
            </AnimatedElement>
            <AnimatedElement animation="slide-right" delay={300}>
              <img
                src={building}
                alt="startup template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
              />
            </AnimatedElement>
          </div>
          <AnimatedElement animation="slide-up" delay={400}>
            <p className="timeline-demo-revenue-text">
            <br />{t('timeline.expansion.revenueTarget')}
            </p>
          </AnimatedElement>
          <AnimatedElement animation="scale-in" delay={500}>
            <p className="timeline-demo-number">
              {t('timeline.expansion.revenueAmount')}
            </p>
          </AnimatedElement>
        </div>
      ),
    },
    {
      title: "2025.07 - 12",
      content: (
        <div>
          <AnimatedElement animation="slide-up" delay={0}>
            <p className="timeline-demo-title">{t('timeline.growth.title')}</p>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={100}>
            <p className="timeline-demo-paragraph">
              {t('timeline.growth.content1')}
            </p>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={200}>
            <p className="timeline-demo-paragraph">
              {t('timeline.growth.content2')}
            </p>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={300}>
            <p className="timeline-demo-paragraph">
              {t('timeline.growth.content3')}
            </p>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={400}>
            <p className="timeline-demo-paragraph">
              {t('timeline.growth.content4')}
            </p>
          </AnimatedElement>
          <div className="grid grid-cols-2 gap-4">
            <AnimatedElement animation="slide-left" delay={500}>
              <img
                src={booth}
                alt="startup template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
              />
            </AnimatedElement>
            <AnimatedElement animation="slide-right" delay={600}>
              <img
                src={car}
                alt="startup template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
              />
            </AnimatedElement>
          </div>
        </div>
      ),
    },
    {
      title: "2025.01 - 06",
      content: (
        <div>
          <AnimatedElement animation="slide-up" delay={0}>
            <p className="timeline-demo-title">{t('timeline.startup.title')}</p>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={100}>
            <p className="timeline-demo-paragraph">
              {t('timeline.startup.content1')}
            </p>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={200}>
            <p className="timeline-demo-paragraph">
              {t('timeline.startup.content2')}
            </p>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={300}>
            <p className="timeline-demo-paragraph">
              {t('timeline.startup.content3')}
            </p>
          </AnimatedElement>
          <div className="grid grid-cols-2 gap-4">
            <AnimatedElement animation="slide-left" delay={400}>
              <img
                src={computer}
                alt="startup template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
              />
            </AnimatedElement>
            <AnimatedElement animation="slide-right" delay={500}>
              <img
                src={working}
                alt="startup template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
              />
            </AnimatedElement>
          </div>
        </div>
      ),
    },
    

  ];

  return (
    <div className="timeline-demo-container">
      <Timeline data={data} />
    </div>
  );
}
