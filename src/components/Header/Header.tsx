/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Nav from '../Nav/Nav';
import './Header.css';
import MoonSvg from '../../images/moon.svg';
import SunSvg from '../../images/sun.svg';

function Header() {
  const { t, i18n } = useTranslation();
  const [image, setImage] = useState('');
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng') || 'en');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setImage(SunSvg);
    } else {setImage(MoonSvg)};
  },[])

  function changeImage () {
    if (image === MoonSvg) {
      setImage(SunSvg);
      localStorage.setItem('theme', 'dark');
    } else {
      setImage(MoonSvg)
      localStorage.setItem('theme', 'light')
    }
  };

  function deleteCurrentLink () {
    const elements = document.querySelectorAll('.nav__current');
    elements.forEach((element) => {
      element.classList.remove('nav__current');
    });
    (document.getElementById('Home') as HTMLElement).classList.add('nav__current');
  };

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
  };

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
        <img src={image} onClick={changeImage} className="header__button-theme" alt="" />
        </div>
        <Nav />
      </div>
    </div>
  );
}

export default Header;
