/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Nav from '../Nav/Nav';
import './Header.css';

function Header() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));

  function changeLanguage (language1: string) {
    i18n.changeLanguage(language1);
  };
 
  function changeButton () {
    if (language === 'ru') {
      changeLanguage("en");
      setLanguage('en');
    } else {
      changeLanguage("ru");
      setLanguage('ru');
    }
  }

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__options">
        <Link className="header__logo" to="/">
          LOGO
        </Link>
        <button onClick={changeButton} className="header__button">{language?.toUpperCase()}
          </button>
        </div>
        <Nav />
      </div>
    </div>
  );
}

export default Header;
