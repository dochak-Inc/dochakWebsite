import React, { useContext, useState } from 'react';
import './Team.css';
import Img from './assets/dochak_Symbol.webp';
import R1 from './assets/reuben.webp';
import R2 from './assets/gyounghoon.webp';
import R3 from './assets/taeho.webp';
import R4 from './assets/tengfeng.webp';
import R5 from './assets/donghyun.webp';
import R6 from './assets/yonghi.webp';
import R7 from './assets/kaihan.webp';
import R8 from './assets/kervin.webp';
import R9 from './assets/hyunchul.webp';
import R10 from './assets/Jaehyuck.webp';
import R11 from './assets/heeyun.webp';
import R12 from './assets/Mahdi.webp';
import R13 from './assets/Huizi.webp';
import BoWang from './assets/BoWang.webp';
import TKKim from './assets/TK-Kim.webp';


import ceo from './assets/inhiKim.webp';
import LanguageContext from './contexts/LanguageContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';

export default function Team() {
  const { t } = useContext(LanguageContext);
  const [sortBy, setSortBy] = useState('title');

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

  const ceoData = {
    name: t('team.ceo.name'),
    title: t('team.ceo.title'),
    photo: ceo,
    bio: t('team.ceo.bio'),
    email: 'inhi.kim@kaist.ac.kr',
    certifiedTrainer: true
  };

  const membersData = [
    {
      name: t('team.members.tkkim.name'),
      title: t('team.members.tkkim.title'),
      photo: TKKim,
      bio: t('team.members.tkkim.bio'),
      email: t('team.members.tkkim.email'),
      certifiedTrainer: true
    },
    {
      name: t('team.members.bowang.name'),
      title: t('team.members.bowang.title'),
      photo: BoWang,
      bio: t('team.members.bowang.bio'),
      email: t('team.members.bowang.email')
    },
    {
      name: t('team.members.reuben.name'),
      title: t('team.members.reuben.title'),
      photo: R1,
      bio: t('team.members.reuben.bio'),
      email: 'reuben.tamakloe@kaist.ac.kr'
    },
    {
      name: t('team.members.gyounghoon.name'),
      title: t('team.members.gyounghoon.title'),
      photo: R2,
      bio: t('team.members.gyounghoon.bio'),
      email: 'gyounghoon.chun@kaist.ac.kr'
    },
    {
      name: t('team.members.taeho.name'),
      title: t('team.members.taeho.title'),
      photo: R3,
      bio: t('team.members.taeho.bio'),
      email: 'taeho.oh@kaist.ac.kr',
      certifiedTrainer: true
    },
    {
      name: t('team.members.tengfeng.name'),
      title: t('team.members.tengfeng.title'),
      photo: R4,
      bio: t('team.members.tengfeng.bio'),
      email: 'tengfeng.lin@kaist.ac.kr'
    },
    {
      name: t('team.members.younghi.name'),
      title: t('team.members.younghi.title'),
      photo: R6,
      bio: t('team.members.younghi.bio'),
      email: 'younghi.liu@kaist.ac.kr'
    },
    {
      name: t('team.members.kaihan.name'),
      title: t('team.members.kaihan.title'),
      photo: R7,
      bio: t('team.members.kaihan.bio'),
      email: 'kaihan.zhang@kaist.ac.kr'
    },
    {
      name: t('team.members.mahdi.name'),
      title: t('team.members.mahdi.title'),
      photo: R12,
      bio: t('team.members.mahdi.bio'),
      email: 'mahdi.khorasani@kaist.ac.kr'
    },
    {
      name: t('team.members.hui.name'),
      title: t('team.members.hui.title'),
      photo: R13,
      bio: t('team.members.hui.bio'),
      email: 'hui.zhi@kaist.ac.kr'
    },
    {
      name: t('team.members.kervin.name'),
      title: t('team.members.kervin.title'),
      photo: R8,
      bio: t('team.members.kervin.bio'),
      email: 'kervin.lucas@kaist.ac.kr'
    },
    {
      name: t('team.members.hyuncheol.name'),
      title: t('team.members.hyuncheol.title'),
      photo: R9,
      bio: t('team.members.hyuncheol.bio'),
      email: 'hyuncheol.park@kaist.ac.kr'
    },
    {
      name: t('team.members.jaehyuk.name'),
      title: t('team.members.jaehyuk.title'),
      photo: R10,
      bio: t('team.members.jaehyuk.bio'),
      email: 'limjh107@kaist.ac.kr'
    },
    {
      name: t('team.members.heeyeon.name'),
      title: t('team.members.heeyeon.title'),
      photo: R11,
      bio: t('team.members.heeyeon.bio'),
      email: 'account@dochak.co.kr'
    }
  ];

  // Sort members based on selected criteria
  const sortedMembers = [...membersData].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'title':
        // Custom sorting for titles - Senior Technical Advisor comes first, then Technical Advisor
        const getTitlePriority = (title) => {
          if (title.includes('수석기술고문') || title.includes('Senior Technical Advisor')) {
            return 0;
          } else if (title.includes('기술고문') || title.includes('Technical Advisor')) {
            return 1;
          } else if (title.includes('책임연구원') || title.includes('Principal Researcher')) {
            return 2;
          } else if (title.includes('연구원') || title.includes('Researcher')) {
            return 3;
          }
          return 4;
        };
        
        const priorityA = getTitlePriority(a.title);
        const priorityB = getTitlePriority(b.title);
        
        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }
        
        // If same priority, sort alphabetically
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="team-hero">
        <div className="team-hero-content">
          <AnimatedElement animation="slide-up" delay={0}>
            <h1 className="team-hero-title">{t('team.heroTitle')}</h1>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={200}>
            <p className="team-hero-subtitle">
              {t('team.heroSubtitle')}
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* CEO Section */}
      <section className="team-ceo-section">
        <div className="team-ceo-card">
          <img src={ceoData.photo} alt={ceoData.name} className="team-ceo-photo" />
          <div className="team-ceo-info">
            {ceoData.certifiedTrainer && (
              <div className="team-certified-badge">PTV Certified Trainer</div>
            )}
            <div className="team-ceo-name">{ceoData.name}</div>
            <div className="team-ceo-title">{ceoData.title}</div>
            <div className="team-ceo-bio">{ceoData.bio}</div>
            <div className="team-email">
              <a href={`mailto:${ceoData.email}`} className="team-email-link">{ceoData.email}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="team-members-section">
        <div className="team-section-header">
          <h2 className="team-section-title">{t('team.sectionTitle')}</h2>
          
          {/* Sort Controls - Top Right */}
          <AnimatedElement animation="slide-up" delay={0}>
            <div className="team-sort">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="team-sort-select"
              >
                <option value="title">{t('team.sort.byTitle') || '직책순'}</option>
                <option value="name">{t('team.sort.byName') || '이름순'}</option>
              </select>
            </div>
          </AnimatedElement>
        </div>
        
        <div className="team-members-grid">
          {sortedMembers.map((m, idx) => (
            <div className="team-member-card" key={idx}>
              <img src={m.photo} alt={m.name} className="team-member-photo" />
              {m.certifiedTrainer && (
                <div className="team-certified-badge">PTV Certified Trainer</div>
              )}
              <div className="team-member-name">{m.name}</div>
              <div className="team-member-title">{m.title}</div>
              <div className="team-member-bio">{m.bio}</div>
              <div className="team-email">
                <a href={`mailto:${m.email}`} className="team-email-link">{m.email}</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
