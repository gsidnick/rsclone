import React from 'react';
import { useTranslation } from 'react-i18next';
import RSSLogo from '../../images/RSSchoolLogo.svg';
import GitLogo from '../../images/GitLogo.svg';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__school_logo">
          <a href="https://rs.school/">
            <img src={RSSLogo} alt="RSSlogo" />
          </a>
        </div>
        <div className="footer__text">
          <span>{t('© 2023, All Rights Reserved')}</span>
        </div>
        <div className="footer__links">
          <a href="https://github.com/alexkaroh/">
            <img src={GitLogo} alt="Gitlogo" />
          </a>
          <a href="https://github.com/gsidnick/">
            <img src={GitLogo} alt="Gitlogo" />
          </a>
          <a href="https://github.com/izmailowAlex">
            <img src={GitLogo} alt="Gitlogo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
