import React, { useContext } from 'react';
import './Footer.css';
import logo from './assets/logo.png';
import LanguageContext from './contexts/LanguageContext';

function Footer() {
  const { t } = useContext(LanguageContext);
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={logo} alt="dochak logo" className="footer-logo" />
        </div>
        <div className="footer-links">
          <a href="#privacy">{t('footer.privacyPolicy')}</a>
          <a href="#terms">{t('footer.terms')}</a>
          <a href="#contact">{t('footer.contact')}</a>
        </div>
      </div>
      <div className="footer-designer">
        proudly designed by Yunha Lee
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} dochak. {t('footer.copyright')}
      </div>
    </footer>
  );
}

export default Footer;