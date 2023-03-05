import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import './BurgerMenu.css';
import useStores from '../../../hooks/useStores';
import { useTranslation } from 'react-i18next';

function BurgerMenu() {
  const { authStore } = useStores();
  const { t } = useTranslation();
  const navRef = useRef<HTMLElement>(null);

  function toggleBurgerMenu() {
    const NAV = document.querySelector('#nav');
    NAV?.classList.toggle('activated');
  }

  return (
    <div className="burger-menu" id="nav">
      <div className="burger-menu__button" onClick={toggleBurgerMenu}>
        <span className="burger-menu__lines"></span>
      </div>
      <nav ref={navRef} className="nav-burger">
        <ul className="nav-burger__list">
          {authStore.isAuth && (
            <>
              <li className="nav-burger__item">
                <NavLink className="nav-burger__link" onClick={toggleBurgerMenu} to="/" end>
                  {t('Home')}
                </NavLink>
              </li>
              <li className="nav-burger__item">
                <NavLink className="nav-burger__link" onClick={toggleBurgerMenu} to="/games/">
                  {t('Games')}
                </NavLink>
              </li>
              <li className="nav-burger__item">
                <NavLink className="nav-burger__link" onClick={toggleBurgerMenu} to="/library/">
                  {t('Library')}
                </NavLink>
              </li>
              <li className="nav-burger__item">
                <NavLink className="nav-burger__link" onClick={toggleBurgerMenu} to="/learn/">
                  {t('Learn')}
                </NavLink>
              </li>
              <li className="nav-burger__item">
                <Link className="nav-burger__link" onClick={() => authStore.logout()} to="/">
                  {t('Log Out')}
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
       <div className="burger-menu__overlay" onClick={toggleBurgerMenu}></div>
    </div>
  );
}

export default observer(BurgerMenu);
