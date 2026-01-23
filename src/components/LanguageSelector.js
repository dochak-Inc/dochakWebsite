import React, { useState, useRef, useEffect, useContext } from 'react';
import LanguageContext from '../contexts/LanguageContext';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { currentLanguage, setLanguage, availableLanguages } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1100);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const languageLabels = {
    en: 'EN',
    ko: 'KO'
  };

  const languageNames = {
    en: 'English',
    ko: '한국어'
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          // Focus first option
          const firstOption = dropdownRef.current?.querySelector('.language-option');
          firstOption?.focus();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          // Focus last option
          const options = dropdownRef.current?.querySelectorAll('.language-option');
          const lastOption = options?.[options.length - 1];
          lastOption?.focus();
        }
        break;
      default:
        break;
    }
  };

  const handleOptionKeyDown = (event, language) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleLanguageSelect(language);
        break;
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        const nextOption = event.target.nextElementSibling;
        if (nextOption) {
          nextOption.focus();
        } else {
          // Wrap to first option
          const firstOption = dropdownRef.current?.querySelector('.language-option');
          firstOption?.focus();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevOption = event.target.previousElementSibling;
        if (prevOption) {
          prevOption.focus();
        } else {
          // Wrap to last option
          const options = dropdownRef.current?.querySelectorAll('.language-option');
          const lastOption = options?.[options.length - 1];
          lastOption?.focus();
        }
        break;
      default:
        break;
    }
  };

  const handleLanguageSelect = (language) => {
    setLanguage(language);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div
      className="language-selector"
      ref={dropdownRef}
      onMouseEnter={!isMobile ? () => setIsOpen(true) : undefined}
      onMouseLeave={!isMobile ? () => setIsOpen(false) : undefined}
    >
      <button
        ref={buttonRef}
        className={`language-selector-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-label={`Current language: ${languageNames[currentLanguage]}. Click to change language`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        type="button"
      >
        <svg
          className="globe-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div
          className="language-dropdown"
          role="listbox"
          aria-label="Language options"
        >
          {availableLanguages.map((language) => (
            <button
              key={language}
              className={`language-option ${currentLanguage === language ? 'active' : ''}`}
              onClick={() => handleLanguageSelect(language)}
              onKeyDown={(e) => handleOptionKeyDown(e, language)}
              role="option"
              aria-selected={currentLanguage === language}
              tabIndex={-1}
              type="button"
            >
              <span className="language-code">{languageLabels[language]}</span>
              <span className="language-name">{languageNames[language]}</span>
              {currentLanguage === language && (
                <svg
                  className="check-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M13.5 4.5L6 12L2.5 8.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;