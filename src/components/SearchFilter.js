import React, { useState, useEffect, useContext } from 'react';
import './SearchFilter.css';
import LanguageContext from '../contexts/LanguageContext';

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  yearFilter,
  onYearFilterChange,
  availableYears,
  activeTab,
  placeholder
}) => {
  const { t } = useContext(LanguageContext);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounce search input
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearchChange(localSearchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localSearchTerm, onSearchChange]);

  // Update local state when external searchTerm changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchInputChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleYearFilterChange = (e) => {
    onYearFilterChange(e.target.value);
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    onSearchChange('');
  };

  const clearYearFilter = () => {
    onYearFilterChange('all');
  };

  const clearAllFilters = () => {
    clearSearch();
    clearYearFilter();
  };

  const hasActiveFilters = localSearchTerm.trim() !== '' || yearFilter !== 'all';

  return (
    <section 
      className="search-filter"
      role="search"
      aria-label={t('disclosure.searchSectionLabel') || 'Search and filter options'}
    >
      <div className="search-filter-controls">
        {/* Search Input */}
        <div className="search-input-container">
          <label htmlFor="search-input" className="sr-only">
            {t('disclosure.searchLabel') || 'Search publications and patents'}
          </label>
          <div className="search-input-wrapper">
            <input
              id="search-input"
              type="text"
              className="search-input"
              placeholder={placeholder || t('disclosure.searchPlaceholder') || 'Search publications and patents...'}
              value={localSearchTerm}
              onChange={handleSearchInputChange}
              aria-label={t('disclosure.searchAriaLabel') || 'Search through publications and patents'}
              aria-describedby="search-description"
            />
            <div className="search-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            {localSearchTerm && (
              <button
                className="clear-search-btn"
                onClick={clearSearch}
                aria-label={t('disclosure.clearSearch') || 'Clear search'}
                type="button"
                tabIndex="0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
          <div id="search-description" className="sr-only">
            {t('disclosure.searchDescription') || 'Search by title, author, journal, or patent name'}
          </div>
        </div>

        {/* Year Filter */}
        <div className="year-filter-container">
          <label htmlFor="year-filter" className="sr-only">
            {t('disclosure.yearFilterLabel') || 'Filter by publication year'}
          </label>
          <select
            id="year-filter"
            className="year-filter-select"
            value={yearFilter}
            onChange={handleYearFilterChange}
            aria-label={t('disclosure.yearFilterAriaLabel') || 'Filter by year'}
            aria-describedby="year-filter-description"
          >
            <option value="all">
              {t('disclosure.allYears') || 'All Years'}
            </option>
            {availableYears.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="select-arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </div>
          <div id="year-filter-description" className="sr-only">
            {t('disclosure.yearFilterDescription') || 'Filter results by publication year'}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div 
          className="active-filters"
          role="region"
          aria-label={t('disclosure.activeFiltersRegion') || 'Active filters'}
        >
          <div className="active-filters-label" id="active-filters-heading">
            {t('disclosure.activeFilters') || 'Active filters:'}
          </div>
          <div 
            className="active-filters-list"
            role="list"
            aria-labelledby="active-filters-heading"
          >
            {localSearchTerm.trim() !== '' && (
              <div className="filter-tag" role="listitem">
                <span className="filter-tag-label">
                  {t('disclosure.searchFilter') || 'Search'}:
                </span>
                <span className="filter-tag-value">"{localSearchTerm}"</span>
                <button
                  className="filter-tag-remove"
                  onClick={clearSearch}
                  aria-label={t('disclosure.removeSearchFilter') || `Remove search filter: ${localSearchTerm}`}
                  type="button"
                  tabIndex="0"
                >
                  ×
                </button>
              </div>
            )}
            {yearFilter !== 'all' && (
              <div className="filter-tag" role="listitem">
                <span className="filter-tag-label">
                  {t('disclosure.yearFilter') || 'Year'}:
                </span>
                <span className="filter-tag-value">{yearFilter}</span>
                <button
                  className="filter-tag-remove"
                  onClick={clearYearFilter}
                  aria-label={t('disclosure.removeYearFilter') || `Remove year filter: ${yearFilter}`}
                  type="button"
                  tabIndex="0"
                >
                  ×
                </button>
              </div>
            )}
          </div>
          <button
            className="clear-all-filters-btn"
            onClick={clearAllFilters}
            aria-label={t('disclosure.clearAllFilters') || 'Clear all filters'}
            type="button"
            tabIndex="0"
          >
            {t('disclosure.clearAll') || 'Clear All'}
          </button>
        </div>
      )}
    </section>
  );
};

export default SearchFilter;