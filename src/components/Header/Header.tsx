/* eslint-disable @typescript-eslint/no-unused-vars */
import './Header.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Nav from '../Nav/Nav';
import useStores from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';

function Header() {
  const { themeStore } = useStores();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng') || 'en');

  function deleteCurrentLink() {
    const elements = document.querySelectorAll('.nav__current');
    elements.forEach((element) => {
      element.classList.remove('nav__current');
    });
    (document.getElementById('Home') as HTMLElement).classList.add('nav__current');
  }

  function changeLanguage(language1: string) {
    i18n.changeLanguage(language1);
  }

  function changeButton() {
    if (language === 'ru') {
      changeLanguage('en');
      setLanguage('en');
    } else {
      changeLanguage('ru');
      setLanguage('ru');
    }
  }

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__options">
          <Link className="header__logo" to="/" onClick={deleteCurrentLink}>
            LOGO
          </Link>
          <button onClick={changeButton} className="header__button-lang">
            {language?.toUpperCase()}
          </button>
          <img
            src={themeStore.themeImage}
            onClick={() => themeStore.toggleTheme()}
            className="header__button-theme"
            alt=""
          />
        </div>
        <Nav />
      </div>
    </div>
  );
}

export default observer(Header);
