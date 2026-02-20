import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './News.css';
import LanguageContext from './contexts/LanguageContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';

// Import actual images from assets
import automob from './assets/automob.webp';
import teledriving from './assets/teledriving.webp';
import twin from './assets/twin.webp';
import simulator from './assets/simulator.webp';
import news11 from './assets/news11.webp';
import llm2 from './assets/LLM2.webp';
import mobilityTech from './assets/newsMobility.webp';
import tkkimPresentation from './assets/tkkimPresentation.webp';
import changhuiKimNews from './assets/김창희News2.webp';
import scienceTechSupport2025 from './assets/scienceTechSupport2025.webp';
import molitAward from './assets/MOLITaward.webp';
import trafficTwin from './assets/trafficTwin.webp';
import ptvNaepoBlog from './assets/TKarticle2.jpg';

export default function News() {
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Debounce search input
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localSearchTerm]);

  // Update local state when external searchTerm changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchInputChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

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

  // Real news data - Articles ordered by date (newest first)
  const allNewsItems = [
    {
      id: 8,
      title: t('news.items.ptvGroupNaepoBlogPost.title'),
      date: '2026-02-11',
      displayDate: t('news.items.ptvGroupNaepoBlogPost.date'),
      category: t('news.items.ptvGroupNaepoBlogPost.category'),
      excerpt: t('news.items.ptvGroupNaepoBlogPost.excerpt'),
      image: ptvNaepoBlog,
      slug: 'ptv-naepo-digital-twin-blog'
    },
    {
      id: 7,
      title: t('news.items.trafficTwinV2.title'),
      date: '2026-01-13',
      displayDate: t('news.items.trafficTwinV2.date'),
      category: t('news.items.trafficTwinV2.category'),
      excerpt: t('news.items.trafficTwinV2.excerpt'),
      image: trafficTwin,
      slug: 'traffictwin-v2-release'
    },
    {
      id: 6,
      title: t('news.items.molitAward2025.title'),
      date: '2025-12-31',
      displayDate: t('news.items.molitAward2025.date'),
      category: t('news.items.molitAward2025.category'),
      excerpt: t('news.items.molitAward2025.excerpt'),
      image: molitAward,
      slug: 'molit-award-2025'
    },
    {
      id: 5,
      title: t('news.items.scienceTechSupport2025.title'),
      date: '2026-01-16',
      displayDate: t('news.items.scienceTechSupport2025.date'),
      category: t('news.items.scienceTechSupport2025.category'),
      excerpt: t('news.items.scienceTechSupport2025.excerpt'),
      image: scienceTechSupport2025,
      slug: 'science-tech-support-2025'
    },
    {
      id: 4,
      title: t('news.items.ptvApacUgm2025.title'),
      date: '2025-09-24',
      displayDate: t('news.items.ptvApacUgm2025.date'),
      category: t('news.items.ptvApacUgm2025.category'),
      excerpt: t('news.items.ptvApacUgm2025.excerpt'),
      image: tkkimPresentation,
      slug: 'ptv-apac-ugm-2025'
    },
    {
      id: 3,
      title: t('news.items.kaistMobilityTech2025.title'),
      date: '2025-09-23',
      displayDate: t('news.items.kaistMobilityTech2025.date'),
      category: t('news.items.kaistMobilityTech2025.category'),
      excerpt: t('news.items.kaistMobilityTech2025.excerpt'),
      image: mobilityTech,
      slug: 'kaist-mobility-tech-2025'
    },
    {
      id: 2,
      title: t('news.items.llmTrafficAnalysis.title'),
      date: '2025-09-12',
      displayDate: t('news.items.llmTrafficAnalysis.date'),
      category: t('news.items.llmTrafficAnalysis.category'),
      excerpt: t('news.items.llmTrafficAnalysis.excerpt'),
      image: llm2,
      slug: 'llm-traffic-analysis-v1-release'
    },
    {
      id: 1,
      title: t('news.items.changhuiKimInternship.title'),
      date: '2025-08-29',
      displayDate: t('news.items.changhuiKimInternship.date'),
      category: t('news.items.changhuiKimInternship.category'),
      excerpt: t('news.items.changhuiKimInternship.excerpt'),
      image: changhuiKimNews,
      slug: 'changhui-kim-internship-2025'
    },
    {
      id: 0,
      title: t('news.items.ptvCertified.title'),
      date: '2025-08-25',
      displayDate: t('news.items.ptvCertified.date'),
      category: t('news.items.ptvCertified.category'),
      excerpt: t('news.items.ptvCertified.excerpt'),
      image: news11,
      slug: 'ptv-certified-trainers-2025'
    }
  ];

  // Filter and sort news
  const filteredNews = allNewsItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNews = [...filteredNews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  // No pagination needed for 4 items
  const currentNews = sortedNews;

  const handleReadMore = (slug) => {
    navigate(`/news/${slug}`);
  };

  return (
    <div className="news-page">
      {/* Hero Section */}
      <section className="news-hero">
        <div className="news-hero-content">
          <AnimatedElement animation="slide-up" delay={0}>
            <h1 className="news-hero-title">{t('news.heroTitle')}</h1>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={200}>
            <p className="news-hero-subtitle">{t('news.heroSubtitle')}</p>
          </AnimatedElement>
        </div>
      </section>

      {/* Main News Section */}
      <section className="news-main-section">
        <div className="news-container">
          {/* Search and Sort Controls */}
          <div className="news-controls">
            <div className="news-search">
              <input
                type="text"
                placeholder={t('news.searchPlaceholder')}
                value={localSearchTerm}
                onChange={handleSearchInputChange}
                className="search-input"
              />
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="21 21l-4.35-4.35"></path>
              </svg>
            </div>
            <div className="news-sort">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="newest">{t('news.sort.newest')}</option>
                <option value="oldest">{t('news.sort.oldest')}</option>
                <option value="category">{t('news.sort.category')}</option>
              </select>
            </div>
          </div>

          {/* Results Info */}
          {searchTerm && (
            <AnimatedElement animation="slide-up" delay={100}>
              <div className="search-results-info">
                {t('news.searchResults', { count: filteredNews.length, term: searchTerm })}
              </div>
            </AnimatedElement>
          )}
          
          {/* News Grid */}
          <div className="news-grid">
            {currentNews.map((item, index) => (
              <AnimatedElement key={item.id} animation="slide-up" delay={index * 100}>
                <article className="news-card">
                  <div className={`news-image-container ${item.slug === 'molit-award-2025' ? 'molit-award-image' : ''}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="news-image"
                    />
                    <div className="news-category-badge" data-category={item.category}>{item.category}</div>
                  </div>
                  <div className="news-content">
                    <div className="news-meta">
                      <time className="news-date">{item.displayDate}</time>
                    </div>
                    <h3 className="news-title">{item.title}</h3>
                    <button 
                      className="read-more-btn"
                      onClick={() => handleReadMore(item.slug)}
                    >
                      {t('news.readMore')}
                      <svg className="read-more-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </article>
              </AnimatedElement>
            ))}
          </div>

          {/* No Results Message */}
          {currentNews.length === 0 && (
            <AnimatedElement animation="slide-up" delay={200}>
              <div className="no-results">
                <h3>{t('news.noResults.title')}</h3>
                <p>{t('news.noResults.message')}</p>
              </div>
            </AnimatedElement>
          )}

        </div>
      </section>

    </div>
  );
}
