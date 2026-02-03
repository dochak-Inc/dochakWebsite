// Data processing functions for search and filtering
// This file contains utility functions to process publications and patents data

/**
 * Process publications data to add computed fields for search and filtering
 * @param {Array} rawData - Raw publications data
 * @returns {Array} Processed publications data
 */
export const processPublications = (rawData) => {
  return rawData.map(item => ({
    ...item,
    year: new Date(item.date).getFullYear(),
    searchableText: `${item.title} ${item.authors.join(' ')} ${item.journal}`.toLowerCase(),
    // Ensure teamMembers is always an array
    teamMembers: item.teamMembers || []
  }));
};

/**
 * Process patents data to add computed fields for search and filtering
 * @param {Array} rawData - Raw patents data
 * @returns {Array} Processed patents data
 */
export const processPatents = (rawData) => {
  return rawData.map(item => ({
    ...item,
    year: new Date(item.registrationDate).getFullYear(),
    searchableText: `${item.name} ${item.country}`.toLowerCase()
  }));
};

/**
 * Filter publications by search term
 * @param {Array} publications - Processed publications data
 * @param {string} searchTerm - Search term to filter by
 * @returns {Array} Filtered publications
 */
export const filterPublicationsBySearch = (publications, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return publications;
  }
  
  const term = searchTerm.toLowerCase().trim();
  return publications.filter(pub => 
    pub.searchableText.includes(term)
  );
};

/**
 * Filter patents by search term
 * @param {Array} patents - Processed patents data
 * @param {string} searchTerm - Search term to filter by
 * @returns {Array} Filtered patents
 */
export const filterPatentsBySearch = (patents, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return patents;
  }
  
  const term = searchTerm.toLowerCase().trim();
  return patents.filter(patent => 
    patent.searchableText.includes(term)
  );
};

/**
 * Filter publications by year
 * @param {Array} publications - Processed publications data
 * @param {string|number} year - Year to filter by ('all' for no filter)
 * @returns {Array} Filtered publications
 */
export const filterPublicationsByYear = (publications, year) => {
  if (year === 'all' || !year) {
    return publications;
  }
  
  const targetYear = parseInt(year);
  return publications.filter(pub => pub.year === targetYear);
};

/**
 * Filter patents by year
 * @param {Array} patents - Processed patents data
 * @param {string|number} year - Year to filter by ('all' for no filter)
 * @returns {Array} Filtered patents
 */
export const filterPatentsByYear = (patents, year) => {
  if (year === 'all' || !year) {
    return patents;
  }
  
  const targetYear = parseInt(year);
  return patents.filter(patent => patent.year === targetYear);
};

/**
 * Filter publications by type (journal or conference)
 * @param {Array} publications - Processed publications data
 * @param {string} type - Type to filter by ('all', 'journal', 'conference')
 * @returns {Array} Filtered publications
 */
export const filterPublicationsByType = (publications, type) => {
  if (type === 'all' || !type) {
    return publications;
  }
  
  return publications.filter(pub => pub.type === type);
};

/**
 * Filter patents by status
 * @param {Array} patents - Processed patents data
 * @param {string} status - Status to filter by ('all', 'registered', 'pending')
 * @returns {Array} Filtered patents
 */
export const filterPatentsByStatus = (patents, status) => {
  if (status === 'all' || !status) {
    return patents;
  }
  
  return patents.filter(patent => patent.status === status);
};

/**
 * Get unique years from publications data for filter options
 * @param {Array} publications - Processed publications data
 * @returns {Array} Sorted array of unique years
 */
export const getPublicationYears = (publications) => {
  const years = [...new Set(publications.map(pub => pub.year))];
  return years.sort((a, b) => b - a); // Sort descending (newest first)
};

/**
 * Get unique years from patents data for filter options
 * @param {Array} patents - Processed patents data
 * @returns {Array} Sorted array of unique years
 */
export const getPatentYears = (patents) => {
  const years = [...new Set(patents.map(patent => patent.year))];
  return years.sort((a, b) => b - a); // Sort descending (newest first)
};

/**
 * Get unique journals from publications data for filter options
 * @param {Array} publications - Processed publications data
 * @returns {Array} Sorted array of unique journal names
 */
export const getPublicationJournals = (publications) => {
  const journals = [...new Set(publications.map(pub => pub.journal))];
  return journals.sort();
};

/**
 * Sort publications by date (newest first)
 * @param {Array} publications - Publications data to sort
 * @returns {Array} Sorted publications
 */
export const sortPublicationsByDate = (publications) => {
  return [...publications].sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Sort patents by registration date (newest first)
 * @param {Array} patents - Patents data to sort
 * @returns {Array} Sorted patents
 */
export const sortPatentsByDate = (patents) => {
  return [...patents].sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
};

/**
 * Apply multiple filters to publications data
 * @param {Array} publications - Processed publications data
 * @param {Object} filters - Filter options
 * @param {string} filters.searchTerm - Search term
 * @param {string} filters.year - Year filter
 * @returns {Array} Filtered and sorted publications
 */
export const applyPublicationFilters = (publications, filters = {}) => {
  let filtered = publications;

  // Apply search filter
  if (filters.searchTerm) {
    filtered = filterPublicationsBySearch(filtered, filters.searchTerm);
  }

  // Apply year filter
  if (filters.year && filters.year !== 'all') {
    filtered = filterPublicationsByYear(filtered, filters.year);
  }

  // Sort by date (newest first)
  return sortPublicationsByDate(filtered);
};

/**
 * Apply multiple filters to patents data
 * @param {Array} patents - Processed patents data
 * @param {Object} filters - Filter options
 * @param {string} filters.searchTerm - Search term
 * @param {string} filters.year - Year filter
 * @param {string} filters.status - Status filter
 * @returns {Array} Filtered and sorted patents
 */
export const applyPatentFilters = (patents, filters = {}) => {
  let filtered = patents;
  
  // Apply search filter
  if (filters.searchTerm) {
    filtered = filterPatentsBySearch(filtered, filters.searchTerm);
  }
  
  // Apply year filter
  if (filters.year && filters.year !== 'all') {
    filtered = filterPatentsByYear(filtered, filters.year);
  }
  
  // Apply status filter
  if (filters.status && filters.status !== 'all') {
    filtered = filterPatentsByStatus(filtered, filters.status);
  }
  
  // Sort by date (newest first)
  return sortPatentsByDate(filtered);
};