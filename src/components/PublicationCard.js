import React, { useContext } from 'react';
import './PublicationCard.css';
import LanguageContext from '../contexts/LanguageContext';

const PublicationCard = ({ publication }) => {
  const { t } = useContext(LanguageContext);

  // Format the date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  // Render authors with team member highlighting
  const renderAuthors = (authors, teamMembers = []) => {
    return authors.map((author, index) => {
      const isTeamMember = teamMembers.includes(author);
      const isLast = index === authors.length - 1;
      
      return (
        <span key={index}>
          <span className={isTeamMember ? 'author-team-member' : 'author-external'}>
            {author}
          </span>
          {!isLast && ', '}
        </span>
      );
    });
  };

  return (
    <article
      className="publication-card"
      role="article"
      aria-labelledby={`publication-title-${publication.id}`}
    >
      <header className="publication-header">
        <time
          className="publication-date"
          dateTime={publication.date}
          aria-label={`Published on ${formatDate(publication.date)}`}
        >
          {formatDate(publication.date)}
        </time>
      </header>
      
      <div className="publication-content">
        <h3 
          className="publication-title"
          id={`publication-title-${publication.id}`}
        >
          {publication.url ? (
            <a 
              href={publication.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="publication-title-link"
              aria-label={`${t('disclosure.openPaper') || 'Open paper'}: ${publication.title} (opens in new tab)`}
            >
              {publication.title}
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          ) : (
            publication.title
          )}
        </h3>
        
        <div 
          className="publication-authors"
          aria-label={`Authors: ${publication.authors.join(', ')}`}
        >
          {renderAuthors(publication.authors, publication.teamMembers)}
        </div>
        
        <div 
          className="publication-journal"
          aria-label={`Published in: ${publication.journal}`}
        >
          {publication.journal}
        </div>
        
        {publication.doi && (
          <div className="publication-doi">
            <span className="doi-label">DOI:</span>
            <a 
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="doi-link"
              aria-label={`${t('disclosure.openDoi') || 'Open DOI'}: ${publication.doi} (opens in new tab)`}
            >
              {publication.doi}
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

export default PublicationCard;