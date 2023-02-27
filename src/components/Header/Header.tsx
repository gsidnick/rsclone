import './Header.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Nav from '../Nav/Nav';
import BurgerMenu from '../UI/BurgerMenu/BurgerMenu';
import useStores from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';
import ruImage from '../../images/ru.svg';
import enImage from '../../images/en.svg';
import logo from '../../images/logo.svg';

function Header() {
  const { themeStore } = useStores();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng') || 'en');
  const [langImage, setLangImage] = useState(ruImage);

  function changeLanguage(language1: string) {
    i18n.changeLanguage(language1);
  }

  function changeButton() {
    if (language === 'ru') {
      changeLanguage('en');
      setLanguage('en');
      setLangImage(ruImage);
    } else {
      changeLanguage('ru');
      setLanguage('ru');
      setLangImage(enImage);
    }
  }

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__left-bar">
          <Link className="header__logo" to="/">
            <img className="header__logo-image" src={logo} alt="" />
          </Link>
          <div className="header__options">
            <img className="header__button-lang" src={langImage} onClick={changeButton} alt="" />
            <img
              className="header__button-theme"
              src={themeStore.themeImage}
              alt=""
              onClick={() => themeStore.toggleTheme()}
            />
          </div>
        </div>
        <Nav />
        <BurgerMenu />
      </div>
    </div>
  );
}

export default observer(Header);
