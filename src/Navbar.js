import React, { useState, useEffect, useContext, useRef } from 'react';
import './Navbar.css';
import logo from './assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import LanguageContext from './contexts/LanguageContext';
import { SOLUTION_METADATA } from './Solutions/routes';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  const { t } = useContext(LanguageContext);
  const location = useLocation();
  const solutionsDropdownRef = useRef(null);
  const solutionsButtonRef = useRef(null);

  useEffect(() => {
    let resizeTimeout;

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1100);
      // Close mobile menu when resizing to desktop
      if (window.innerWidth > 1100) {
        setIsMenuOpen(false);
      }
    };

    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkScreenSize, 150);
    };

    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar') && !event.target.closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }

      // Close solutions dropdown when clicking outside
      if (solutionsDropdownOpen && 
          !event.target.closest('.solutions-dropdown') && 
          !event.target.closest('.solutions-dropdown-button')) {
        setSolutionsDropdownOpen(false);
      }
    };

    // Check initial screen size
    checkScreenSize();

    // Add event listeners
    window.addEventListener('resize', debouncedResize);
    document.addEventListener('click', handleClickOutside);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('resize', debouncedResize);
      document.removeEventListener('click', handleClickOutside);
      clearTimeout(resizeTimeout);
    };
  }, [isMenuOpen, solutionsDropdownOpen]);

  // Handle solutions dropdown hover
  const handleSolutionsMouseEnter = () => {
    setSolutionsDropdownOpen(true);
  };

  const handleSolutionsMouseLeave = () => {
    setSolutionsDropdownOpen(false);
  };

  // Handle solutions button click (navigate to overview)
  const handleSolutionsClick = () => {
    setSolutionsDropdownOpen(false);
    // Navigation will be handled by the Link component
  };

  // Handle solution selection
  const handleSolutionSelect = () => {
    setSolutionsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  // Handle keyboard navigation for dropdown
  const handleDropdownKeyDown = (event) => {
    if (event.key === 'Escape') {
      setSolutionsDropdownOpen(false);
    } else if (event.key === 'ArrowDown' && !solutionsDropdownOpen) {
      event.preventDefault();
      setSolutionsDropdownOpen(true);
    }
  };

  // Check if current path is a solution page
  const isActiveSolution = (solutionPath) => {
    return location.pathname === solutionPath;
  };

  // Check if any solution is active
  const isSolutionsActive = () => {
    return location.pathname.startsWith('/solutions');
  };
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="dochak logo" className="navbar-logo" />
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>{t('nav.about')}</Link>
        {/* <Link to="/technologies" className={location.pathname === '/technologies' ? 'active' : ''}>{t('nav.technologies')}</Link> */}
        
        {/* Solutions Dropdown */}
        <div
          className="solutions-dropdown"
          ref={solutionsDropdownRef}
          onMouseEnter={handleSolutionsMouseEnter}
          onMouseLeave={handleSolutionsMouseLeave}
        >
          <Link
            to="/solutions"
            className={`solutions-main-link ${isSolutionsActive() ? 'active' : ''}`}
            onClick={handleSolutionsClick}
            aria-label={t('nav.solutionsAriaLabel') || 'Solutions overview page'}
          >
            {t('nav.solutions')}
          </Link>

          {solutionsDropdownOpen && (
            <div className="solutions-dropdown-menu" role="menu">
              {SOLUTION_METADATA.map((solution) => (
                <Link
                  key={solution.id}
                  to={solution.path}
                  className={`solution-item ${isActiveSolution(solution.path) ? 'active' : ''}`}
                  onClick={handleSolutionSelect}
                  role="menuitem"
                  aria-label={`${t(solution.titleKey)} solution page`}
                >
                  {t(solution.titleKey)}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>{t('nav.projects')}</Link>
        <Link to="/team" className={location.pathname === '/team' ? 'active' : ''}>{t('nav.team')}</Link>
        <Link to="/news" className={location.pathname === '/news' ? 'active' : ''}>{t('nav.news')}</Link>
        <Link to="/training" className={location.pathname.startsWith('/training') ? 'active' : ''}>{t('nav.training')}</Link>
        <Link 
          to="/disclosure" 
          className={location.pathname.startsWith('/disclosure') ? 'active' : ''}
          aria-label={t('nav.disclosureAriaLabel') || 'Disclosure - research achievements'}
        >
          {t('nav.disclosure')}
        </Link>
      </div>
      <div className="navbar-right">
        <button
          id="hamburger-btn"
          className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 
            (t('nav.closeMobileMenu') || 'Close navigation menu') : 
            (t('nav.openMobileMenu') || 'Open navigation menu')
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-haspopup="true"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsMenuOpen(!isMenuOpen);
            } else if (e.key === 'Escape' && isMenuOpen) {
              setIsMenuOpen(false);
            }
          }}
        >
          <span className="hamburger-line" aria-hidden="true"></span>
          <span className="hamburger-line" aria-hidden="true"></span>
          <span className="hamburger-line" aria-hidden="true"></span>
          <span className="sr-only">
            {isMenuOpen ? 
              (t('nav.menuOpen') || 'Menu is open') : 
              (t('nav.menuClosed') || 'Menu is closed')
            }
          </span>
        </button>
        <div className='desktop-controls'>
          <LanguageSelector />
          <div className='contact'>
            <Link to="/get-in-touch">
              <button className="getintouch-btn">{t('nav.getInTouch')}</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="mobile-menu" 
          id="mobile-menu"
          role="navigation"
          aria-label={t('nav.mobileMenuAriaLabel') || 'Mobile navigation menu'}
        >
          <nav 
            className="mobile-menu-links" 
            role="menu"
            aria-labelledby="hamburger-btn"
          >
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''} 
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              aria-label={t('nav.aboutAriaLabel') || 'About us page'}
            >
              {t('nav.about')}
            </Link>
            {/* <Link 
              to="/technologies" 
              className={location.pathname === '/technologies' ? 'active' : ''} 
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              aria-label={t('nav.technologiesAriaLabel') || 'Technologies page'}
            >
              {t('nav.technologies')}
            </Link> */}
            {/* Mobile Solutions Menu */}
            <div className="mobile-solutions-section">
              <div className="mobile-solutions-container">
                <Link
                  to="/solutions"
                  className={`mobile-solutions-link ${isSolutionsActive() ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                  aria-label={t('nav.solutionsAriaLabel') || 'Solutions overview page'}
                >
                  {t('nav.solutions')}
                </Link>
                <button
                  className="mobile-solutions-dropdown-toggle"
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  aria-expanded={mobileSolutionsOpen}
                  aria-label={`Show solutions menu ${mobileSolutionsOpen ? t('nav.dropdownExpanded') || '(expanded)' : t('nav.dropdownCollapsed') || '(collapsed)'}`}
                >
                  <span className={`mobile-dropdown-arrow ${mobileSolutionsOpen ? 'open' : ''}`} aria-hidden="true">▼</span>
                </button>
              </div>
              
              {mobileSolutionsOpen && (
                <div className="mobile-submenu" role="menu">
                  {SOLUTION_METADATA.map((solution) => (
                    <Link
                      key={solution.id}
                      to={solution.path}
                      className={`submenu-item ${isActiveSolution(solution.path) ? 'active' : ''}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileSolutionsOpen(false);
                      }}
                      role="menuitem"
                      aria-label={`${t(solution.titleKey)} solution page`}
                    >
                      {t(solution.titleKey)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link 
              to="/projects" 
              className={location.pathname === '/projects' ? 'active' : ''} 
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              aria-label={t('nav.projectsAriaLabel') || 'Projects page'}
            >
              {t('nav.projects')}
            </Link>
            <Link 
              to="/team" 
              className={location.pathname === '/team' ? 'active' : ''} 
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              aria-label={t('nav.teamAriaLabel') || 'Team page'}
            >
              {t('nav.team')}
            </Link>
            <Link
              to="/news"
              className={location.pathname === '/news' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              aria-label={t('nav.newsAriaLabel') || 'News page'}
            >
              {t('nav.news')}
            </Link>
            <Link
              to="/training"
              className={location.pathname.startsWith('/training') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              aria-label={t('nav.trainingAriaLabel') || 'Training courses page'}
            >
              {t('nav.training')}
            </Link>
            <Link
              to="/disclosure" 
              className={location.pathname.startsWith('/disclosure') ? 'active' : ''} 
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              aria-label={t('nav.disclosureAriaLabel') || 'Disclosure - research achievements page'}
            >
              {t('nav.disclosure')}
            </Link>
            <Link
              to="/get-in-touch"
              className={location.pathname === '/get-in-touch' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              aria-label={t('nav.getInTouchAriaLabel') || 'Contact us page'}
            >
              {t('nav.getInTouch')}
            </Link>
          </nav>

          {/* Language Selector in Mobile Menu */}
          <div className="mobile-language-selector">
            <LanguageSelector />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar; 
