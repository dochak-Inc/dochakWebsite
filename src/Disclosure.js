import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Disclosure.css';
import LanguageContext from './contexts/LanguageContext';
import DisclosureTabs from './components/DisclosureTabs';
import SearchFilter from './components/SearchFilter';
import PublicationCard from './components/PublicationCard';
import PatentCard from './components/PatentCard';
import {
  applyPublicationFilters,
  applyPatentFilters
} from './data/dataProcessing';
import disclosureDataService from './services/disclosureDataService';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const Disclosure = () => {
  const { t } = useContext(LanguageContext);
  const { section } = useParams();
  const navigate = useNavigate();

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

  // State management
  const [activeTab, setActiveTab] = useState('publications');
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processedData, setProcessedData] = useState({
    publications: [],
    patents: [],
    publicationYears: [],
    patentYears: []
  });

  // Load data using the data service
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await disclosureDataService.loadDisclosureData();
        
        if (result.success) {
          setProcessedData(result.data);
        } else {
          setError(result.error || 'Failed to load data');
        }
      } catch (err) {
        setError('An unexpected error occurred while loading data');
        console.error('Data loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Apply filters to get filtered data
  const filteredData = useMemo(() => {
    const filters = { searchTerm, year: yearFilter };

    return {
      publications: applyPublicationFilters(processedData.publications, filters),
      patents: applyPatentFilters(processedData.patents, filters)
    };
  }, [processedData, searchTerm, yearFilter]);

  // Handle URL parameter changes
  useEffect(() => {
    if (section === 'publications' || section === 'patents') {
      setActiveTab(section);
    } else if (section) {
      // Invalid section, redirect to publications
      navigate('/disclosure/publications', { replace: true });
    }
  }, [section, navigate]);



  // Tab configuration
  const tabs = [
    {
      id: 'publications',
      label: t('disclosure.tabs.publications') || 'Publications',
      count: filteredData.publications.length
    },
    {
      id: 'patents',
      label: t('disclosure.tabs.patents') || 'Patents',
      count: filteredData.patents.length
    }
  ];

  // Handle tab changes
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/disclosure/${tabId}`);
  };

  // Get current data and years based on active tab
  const currentData = activeTab === 'publications' ? filteredData.publications : filteredData.patents;
  const availableYears = activeTab === 'publications' ? processedData.publicationYears : processedData.patentYears;

  // Handle search changes
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  // Handle year filter changes
  const handleYearFilterChange = (year) => {
    setYearFilter(year);
  };

  // Get search placeholder based on active tab
  const getSearchPlaceholder = () => {
    if (activeTab === 'publications') {
      return t('disclosure.searchPlaceholder.publications') || 'Search publications by title, author, or journal...';
    }
    return t('disclosure.searchPlaceholder.patents') || 'Search patents by name or country...';
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="disclosure-page">
        <section className="disclosure-hero">
          <div className="disclosure-container">
            <AnimatedElement animation="slide-up" delay={0}>
              <h1 className="disclosure-hero-title">{t('disclosure.title') || 'Research Achievements'}</h1>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200}>
              <p className="disclosure-hero-subtitle">{t('disclosure.subtitle') || 'Explore our academic publications and patent portfolio'}</p>
            </AnimatedElement>
          </div>
        </section>
        <main className="disclosure-content">
          <div className="container">
            <div 
              className="disclosure-loading"
              role="status"
              aria-live="polite"
              aria-label={t('disclosure.loadingAriaLabel') || 'Loading research achievements data'}
            >
              <div 
                className="loading-spinner"
                aria-hidden="true"
              ></div>
              <p>{t('disclosure.loading') || 'Loading...'}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="disclosure-page">
        <section className="disclosure-hero">
          <div className="disclosure-container">
            <AnimatedElement animation="slide-up" delay={0}>
              <h1 className="disclosure-hero-title">{t('disclosure.title') || 'Research Achievements'}</h1>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={200}>
              <p className="disclosure-hero-subtitle">{t('disclosure.subtitle') || 'Explore our academic publications and patent portfolio'}</p>
            </AnimatedElement>
          </div>
        </section>
        <main className="disclosure-content">
          <div className="container">
            <div 
              className="disclosure-error"
              role="alert"
              aria-live="assertive"
            >
              <h2>{t('disclosure.error.title') || 'Error Loading Data'}</h2>
              <p>{t('disclosure.error.message') || 'We encountered an error while loading the research achievements. Please try again later.'}</p>
              <button 
                className="retry-button"
                onClick={async () => {
                  setIsLoading(true);
                  setError(null);
                  
                  try {
                    // Clear cache and reload
                    disclosureDataService.clearDataCache();
                    const result = await disclosureDataService.loadDisclosureData();
                    
                    if (result.success) {
                      setProcessedData(result.data);
                    } else {
                      setError(result.error || 'Failed to load data');
                    }
                  } catch (err) {
                    setError('An unexpected error occurred while loading data');
                    console.error('Retry error:', err);
                  } finally {
                    setIsLoading(false);
                  }
                }}
                aria-describedby="retry-description"
              >
                {t('disclosure.error.retry') || 'Retry'}
              </button>
              <div id="retry-description" className="sr-only">
                {t('disclosure.retryDescription') || 'This will attempt to reload the research achievements data'}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="disclosure-page">
      {/* Hero Section */}
      <section className="disclosure-hero">
        <div className="disclosure-container">
          <AnimatedElement animation="slide-up" delay={0}>
            <h1 className="disclosure-hero-title">{t('disclosure.title') || 'Research Achievements'}</h1>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={200}>
            <p className="disclosure-hero-subtitle">{t('disclosure.subtitle') || 'Explore our academic publications and patent portfolio'}</p>
          </AnimatedElement>
        </div>
      </section>

      {/* Main Content */}
      <main className="disclosure-content">
        <div className="container">
          {/* Tab Navigation */}
          <DisclosureTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            tabs={tabs}
          />

          {/* Search and Filter */}
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            yearFilter={yearFilter}
            onYearFilterChange={handleYearFilterChange}
            availableYears={availableYears}
            activeTab={activeTab}
            placeholder={getSearchPlaceholder()}
          />

          {/* Results Section */}
          <section 
            className="disclosure-results"
            role="tabpanel"
            id={`${activeTab}-panel`}
            aria-labelledby={`${activeTab}-tab`}
          >
            <div className="results-header">
              <h2 className="results-title" id="results-heading">
                {activeTab === 'publications' 
                  ? (t('disclosure.results.publications') || 'Publications')
                  : (t('disclosure.results.patents') || 'Patents')
                }
              </h2>
              <div 
                className="results-count"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="sr-only">
                  {t('disclosure.resultsCount') || 'Showing'}{' '}
                </span>
                {currentData.length} {currentData.length === 1 ? 'item' : 'items'}
              </div>
            </div>

            {/* Results List */}
            <div 
              className="results-list"
              role="region"
              aria-labelledby="results-heading"
              aria-live="polite"
              aria-atomic="false"
            >
              {currentData.length > 0 ? (
                <div 
                  className={`${activeTab}-grid`}
                  role="list"
                  aria-label={`${activeTab === 'publications' ? 'Publications' : 'Patents'} list`}
                >
                  {currentData.map((item) => (
                    <div key={item.id} role="listitem">
                      {activeTab === 'publications' ? (
                        <PublicationCard publication={item} />
                      ) : (
                        <PatentCard patent={item} />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results" role="status" aria-live="polite">
                  <div className="no-results-icon" aria-hidden="true">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </div>
                  <h3>{t('disclosure.noResults.title') || 'No results found'}</h3>
                  <p>
                    {searchTerm || yearFilter !== 'all' 
                      ? (t('disclosure.noResults.withFilters') || 'Try adjusting your search terms or filters.')
                      : (t('disclosure.noResults.noData') || 'No data available at the moment.')
                    }
                  </p>
                  {(searchTerm || yearFilter !== 'all') && (
                    <button 
                      className="clear-filters-button"
                      onClick={() => {
                        setSearchTerm('');
                        setYearFilter('all');
                      }}
                      aria-describedby="clear-filters-description"
                    >
                      {t('disclosure.noResults.clearFilters') || 'Clear all filters'}
                    </button>
                  )}
                  <div id="clear-filters-description" className="sr-only">
                    {t('disclosure.clearFiltersDescription') || 'This will remove all active search and filter criteria'}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Disclosure;
