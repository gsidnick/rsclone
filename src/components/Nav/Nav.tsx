import './Nav.css';
import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import useStores from '../../hooks/useStores';
import { useTranslation } from 'react-i18next';

function Nav() {
  const { authStore } = useStores();
  const { t } = useTranslation();
  const navRef = useRef<HTMLElement>(null);

  return (
    <nav ref={navRef} className="nav">
      <ul className="nav__list">
        {authStore.isAuth && (
          <>
            <li className="nav__item">
              <NavLink className="nav__link" to="/" end>
                {t('Home')}
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink className="nav__link" to="/games/">
                {t('Games')}
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink className="nav__link" to="/library/">
                {t('Library')}
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink className="nav__link" to="/learn/">
                {t('Learn')}
              </NavLink>
            </li>
            <li className="nav__item">
              <Link className="nav__link" onClick={() => authStore.logout()} to="/">
                {t('Log Out')}
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default observer(Nav);
