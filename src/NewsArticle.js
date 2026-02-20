import React, { useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './NewsArticle.css';
import LanguageContext from './contexts/LanguageContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';

// Import real images from assets
import automob from './assets/automob.webp';
import teledriving from './assets/teledriving.webp';
import twin from './assets/twin.webp';
import simulator from './assets/simulator.webp';
import dash from './assets/dash.webp';
import computer from './assets/computer.webp';
import working from './assets/working.webp';
import booth from './assets/booth.webp';
import news11 from './assets/news11.webp';
import news12 from './assets/news12.webp';
import appCert from './assets/App.webp';
import taehoCert from './assets/Taeho-676x1024.webp';
import taekyunCert from './assets/김태균-1.webp';
import llm1 from './assets/LLM1.webp';
import llm2 from './assets/LLM2.webp';
import kaistMobilityImage from './assets/newsMobility.webp';
import tkkimPresentation from './assets/tkkimPresentation.webp';
import tkkimPresentation2 from './assets/tkkimPresentation2.webp';
import tkkimPhoto from './assets/TKPhotoPTVmeeting.webp';
import tkkimCertificate from './assets/ptvTKkimCertificate.webp';
import changhuiKimNews from './assets/김창희News.webp';
import changhuiKimNews2 from './assets/김창희News2.webp';
import scienceTechSupport2025 from './assets/scienceTechSupport2025.webp';
import molitAward from './assets/MOLITaward.webp';
import trafficTwin from './assets/trafficTwin.webp';
import ptvNaepoBlog from './assets/newsMobility.webp';
import tkArticle1 from './assets/TKarticle1.png';
import tkArticle2 from './assets/TKarticle2.jpg';
import tkArticle3 from './assets/TKarticle3.jpg';
import tkArticle4 from './assets/TKarticle4.jpg';
import tkArticle5 from './assets/TKarticle5.jpg';
import tkArticle6 from './assets/TKarticle6.jpg';
import tkArticle7 from './assets/TKarticle7.jpg';
import tkArticle8 from './assets/TKarticle8.jpg';

export default function NewsArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);

  // Animation component
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

  // Article data based on slug
  const getArticleData = (slug) => {
    const articles = {
      'ptv-naepo-digital-twin-blog': {
        id: 8,
        title: t('news.articles.ptvGroupNaepoBlogPost.title'),
        date: '2026-02-11',
        displayDate: t('news.articles.ptvGroupNaepoBlogPost.date'),
        category: t('news.articles.ptvGroupNaepoBlogPost.category'),
        author: t('news.articles.ptvGroupNaepoBlogPost.author'),
        readTime: t('news.articles.ptvGroupNaepoBlogPost.readTime'),
        heroImage: tkArticle2,
        content: t('news.articles.ptvGroupNaepoBlogPost.content')
          .replace('IMAGE_TKARTICLE1', tkArticle1)
          .replace('IMAGE_TKARTICLE2', tkArticle2)
          .replace('IMAGE_TKARTICLE3', tkArticle3)
          .replace('IMAGE_TKARTICLE4', tkArticle4)
          .replace('IMAGE_TKARTICLE5', tkArticle5)
          .replace('IMAGE_TKARTICLE6', tkArticle6)
          .replace('IMAGE_TKARTICLE7', tkArticle7)
          .replace('IMAGE_TKARTICLE8', tkArticle8),
        images: []
      },
      'ptv-certified-trainers-2025': {
        id: 0,
        title: t('news.articles.ptvCertified.title'),
        date: '2025-08-25',
        displayDate: t('news.articles.ptvCertified.date'),
        category: t('news.items.ptvCertified.category'),
        author: t('news.articles.ptvCertified.author'),
        readTime: t('news.articles.ptvCertified.readTime'),
        heroImage: news11,
        content: t('news.articles.ptvCertified.content'),
        images: [],
        certificates: [
          { src: appCert, caption: "Inhi Kim" },
          { src: taehoCert, caption: "Tae-ho Oh" },
          { src: taekyunCert, caption: "Tae-kyun Kim" }
        ]
      },
      'llm-traffic-analysis-v1-release': {
        id: 1,
        title: t('news.articles.llmTrafficAnalysis.title'),
        date: '2025-09-12',
        displayDate: t('news.articles.llmTrafficAnalysis.date'),
        category: t('news.articles.llmTrafficAnalysis.category'),
        author: t('news.articles.llmTrafficAnalysis.author'),
        readTime: t('news.articles.llmTrafficAnalysis.readTime'),
        heroImage: llm2,
        contentIntro: t('news.articles.llmTrafficAnalysis.contentIntro'),
        contentMain: t('news.articles.llmTrafficAnalysis.contentMain'),
        images: [],
        videoUrl: "https://www.youtube.com/embed/kL11AdA_DvE?si=_AKT55Okf50-HtPF",
        ctaButton: {
          text: t('news.articles.llmTrafficAnalysis.ctaButton'),
          link: '/solutions/traffic-analysis-tools'
        }
      },
      'kaist-mobility-tech-2025': {
        id: 2,
        title: t('news.articles.kaistMobilityTech2025.title'),
        date: '2025-09-23',
        displayDate: t('news.articles.kaistMobilityTech2025.date'),
        category: t('news.articles.kaistMobilityTech2025.category'),
        author: t('news.articles.kaistMobilityTech2025.author'),
        readTime: t('news.articles.kaistMobilityTech2025.readTime'),
        heroImage: kaistMobilityImage,
        content: t('news.articles.kaistMobilityTech2025.content'),
        images: []
      },
      'ptv-apac-ugm-2025': {
        id: 3,
        title: t('news.articles.ptvApacUgm2025.title'),
        date: '2025-09-24',
        displayDate: t('news.articles.ptvApacUgm2025.date'),
        category: t('news.articles.ptvApacUgm2025.category'),
        author: t('news.articles.ptvApacUgm2025.author'),
        readTime: t('news.articles.ptvApacUgm2025.readTime'),
        heroImage: tkkimPresentation,
        content: t('news.articles.ptvApacUgm2025.content')
          .replace('IMAGE_TKKIM_PHOTO', tkkimPhoto)
          .replace('IMAGE_TKKIM_PRESENTATION2', tkkimPresentation2)
          .replace('IMAGE_TKKIM_CERTIFICATE', tkkimCertificate),
        images: []
      },
      'changhui-kim-internship-2025': {
        id: 4,
        title: t('news.articles.changhuiKimInternship.title'),
        date: '2025-08-29',
        displayDate: t('news.articles.changhuiKimInternship.date'),
        category: t('news.articles.changhuiKimInternship.category'),
        author: t('news.articles.changhuiKimInternship.author'),
        readTime: t('news.articles.changhuiKimInternship.readTime'),
        heroImage: changhuiKimNews2,
        content: t('news.articles.changhuiKimInternship.content')
          .replace('IMAGE_CHANGHUI_CERTIFICATE', changhuiKimNews)
          .replace('IMAGE_CHANGHUI_SINGAPORE', changhuiKimNews2),
        images: []
      },
      'science-tech-support-2025': {
        id: 5,
        title: t('news.articles.scienceTechSupport2025.title'),
        date: '2026-01-16',
        displayDate: t('news.articles.scienceTechSupport2025.date'),
        category: t('news.articles.scienceTechSupport2025.category'),
        author: t('news.articles.scienceTechSupport2025.author'),
        readTime: t('news.articles.scienceTechSupport2025.readTime'),
        heroImage: scienceTechSupport2025,
        content: t('news.articles.scienceTechSupport2025.content'),
        images: []
      },
      'molit-award-2025': {
        id: 6,
        title: t('news.articles.molitAward2025.title'),
        date: '2025-12-31',
        displayDate: t('news.articles.molitAward2025.date'),
        category: t('news.articles.molitAward2025.category'),
        author: t('news.articles.molitAward2025.author'),
        readTime: t('news.articles.molitAward2025.readTime'),
        heroImage: molitAward,
        content: t('news.articles.molitAward2025.content'),
        images: []
      },
      'traffictwin-v2-release': {
        id: 7,
        title: t('news.articles.trafficTwinV2.title'),
        date: '2026-01-13',
        displayDate: t('news.articles.trafficTwinV2.date'),
        category: t('news.articles.trafficTwinV2.category'),
        author: t('news.articles.trafficTwinV2.author'),
        readTime: t('news.articles.trafficTwinV2.readTime'),
        heroImage: trafficTwin,
        contentIntro: t('news.articles.trafficTwinV2.contentIntro'),
        contentMain: t('news.articles.trafficTwinV2.contentMain'),
        images: [],
        ctaButton: {
          text: t('news.articles.trafficTwinV2.ctaButton'),
          link: 'https://traffictwin.com/'
        }
      }
    };

    return articles[slug];
  };

  const article = getArticleData(slug);

  // Process content to replace image placeholders
  const processArticleContent = (content) => {
    if (slug === 'ptv-certified-trainers-2025') {
      return content.replace('TRAINING_FACILITIES_IMAGE', news12);
    }
    return content;
  };

  if (!article) {
    return (
      <div className="news-article-page">
        <div className="article-container">
          <div className="article-not-found">
            <h1>{t('news.article.notFound.title')}</h1>
            <p>{t('news.article.notFound.message')}</p>
            <button onClick={() => navigate('/news')} className="back-to-news-btn">
              {t('news.article.backToNews')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleBackToNews = () => {
    navigate('/news');
  };

  return (
    <div className="news-article-page">
      {/* Breadcrumb */}
      <section className="article-breadcrumb">
        <div className="article-container">
          <AnimatedElement animation="slide-up" delay={0}>
            <nav className="breadcrumb-nav">
              <button onClick={handleBackToNews} className="breadcrumb-link">
                <svg className="breadcrumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('news.article.backToNews')}
              </button>
            </nav>
          </AnimatedElement>
        </div>
      </section>

      {/* Hero Image */}
      <section className="article-hero">
        <div className={`article-hero-image-container ${slug === 'molit-award-2025' ? 'molit-award-image' : ''}`}>
          <AnimatedElement animation="slide-up" delay={0}>
            <img
              src={article.heroImage}
              alt={article.title}
              className="article-hero-image"
            />
          </AnimatedElement>
        </div>
      </section>

      {/* Article Content */}
      <article className="article-main">
        <div className="article-container">
          {/* Article Header */}
          <header className="article-header">
            <AnimatedElement animation="slide-up" delay={100}>
              <div className="article-category-badge" data-category={article.category}>
                {article.category}
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="slide-up" delay={200}>
              <h1 className="article-title">{article.title}</h1>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={300}>
              <div className="article-meta">
                <div className="article-meta-item">
                  <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <time className="article-date">{article.displayDate}</time>
                </div>
                <div className="article-meta-item">
                  <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span className="article-author">{article.author}</span>
                </div>
                <div className="article-meta-item">
                  <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M2 3h6l1.31 3.65L8 10v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-5l-1.31-3.35L16 3h6"/>
                  </svg>
                  <span className="article-read-time">{article.readTime}</span>
                </div>
              </div>
            </AnimatedElement>
          </header>

          {/* Article Body */}
          <div className="article-body">
            {/* Article Intro Content */}
            {article.contentIntro && (
              <AnimatedElement animation="slide-up" delay={400}>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: article.contentIntro }} />
              </AnimatedElement>
            )}

            {/* CTA Button - Early placement */}
            {article.ctaButton && (
              <AnimatedElement animation="slide-up" delay={500}>
                <div className="article-cta">
                  <Link to={article.ctaButton.link} className="article-cta-button">
                    {article.ctaButton.text}
                    <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </AnimatedElement>
            )}

            {/* Article Main Content */}
            {article.contentMain && (
              <AnimatedElement animation="slide-up" delay={600}>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: article.contentMain }} />
              </AnimatedElement>
            )}

            {/* Fallback for legacy content structure */}
            {!article.contentIntro && !article.contentMain && article.content && (
              <AnimatedElement animation="slide-up" delay={400}>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: processArticleContent(article.content) }} />
              </AnimatedElement>
            )}

            {/* Article Video */}
            {article.videoUrl && (
              <AnimatedElement animation="slide-up" delay={700}>
                <div className="article-video">
                  <div className="video-container">
                    <iframe
                      src={article.videoUrl}
                      title="Product Demo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="youtube-video"
                    ></iframe>
                  </div>
                </div>
              </AnimatedElement>
            )}

            {/* Article Images */}
            {article.images && article.images.length > 0 && (
              <div className="article-images">
                {article.images.map((image, index) => (
                  <AnimatedElement key={index} animation="slide-up" delay={600 + index * 100}>
                    <figure className="article-figure">
                      <img
                        src={image.src}
                        alt={image.caption}
                        className="article-image"
                      />
                      <figcaption className="article-image-caption">
                        {image.caption}
                      </figcaption>
                    </figure>
                  </AnimatedElement>
                ))}
              </div>
            )}

            {/* Certificate Gallery */}
            {article.certificates && article.certificates.length > 0 && (
              <div className="certificate-gallery">
                <AnimatedElement animation="slide-up" delay={600}>
                  <h3 className="certificate-gallery-title">PTV Certified Trainers</h3>
                </AnimatedElement>
                <div className="certificate-grid">
                  {article.certificates.map((cert, index) => (
                    <AnimatedElement key={index} animation="slide-up" delay={700 + index * 100}>
                      <figure className="certificate-figure">
                        <img
                          src={cert.src}
                          alt={cert.caption}
                          className="certificate-image"
                        />
                        <figcaption className="certificate-caption">
                          {cert.caption}
                        </figcaption>
                      </figure>
                    </AnimatedElement>
                  ))}
                </div>
                <AnimatedElement animation="slide-up" delay={1000}>
                  <div className="team-cta">
                    <button onClick={() => navigate('/team')} className="team-cta-button">
                      Meet Our Team
                      <svg className="team-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </AnimatedElement>
              </div>
            )}
          </div>

          {/* Back to News */}
          <footer className="article-footer">
            <AnimatedElement animation="slide-up" delay={600}>
              <button onClick={handleBackToNews} className="back-to-news-btn">
                <svg className="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('news.article.backToNews')}
              </button>
            </AnimatedElement>
          </footer>
        </div>
      </article>
    </div>
  );
}
