import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Nav.css';

function Nav() {
  const { t } = useTranslation();
  const navRef = useRef<HTMLElement>(null);

  const checkCurrentLink = (event: React.MouseEvent<HTMLElement>) => {
    navRef?.current?.querySelectorAll('a').forEach((link) => {
      link.classList.remove('nav__current');
    });
    navRef?.current?.querySelectorAll('span').forEach((link) => {
      link.classList.remove('nav__current');
    });

    (event.target as HTMLElement).classList.add('nav__current');
  };

  return (
    <nav ref={navRef} className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link className="nav__link" onClick={checkCurrentLink} to="/" id='Home'>
            <span>{t('Home')}</span>
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" onClick={checkCurrentLink} to="/games/">
            <span>{t('Games')}</span>
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" onClick={checkCurrentLink} to="/library/">
            <span>{t('Library')}</span>
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" onClick={checkCurrentLink} to="/learn/">
            <span>{t('Learn')}</span>
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" onClick={checkCurrentLink} to="/login/">
            Log In
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" onClick={checkCurrentLink} to="/signup/">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
