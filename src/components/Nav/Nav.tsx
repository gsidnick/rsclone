import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import './Nav.css';
import useStores from '../../hooks/useStores';
import { useTranslation } from 'react-i18next';

function Nav() {
  const { authStore } = useStores();
  const { t } = useTranslation();
  const navRef = useRef<HTMLElement>(null);

  const checkCurrentLink = (event: React.MouseEvent<HTMLElement>) => {
    navRef?.current?.querySelectorAll('a').forEach((link) => {
      (event.target as HTMLElement).classList.add('nav__current');
      link.classList.remove('nav__current');
    });
    navRef?.current?.querySelectorAll('span').forEach((link) => {
      (event.target as HTMLElement).classList.add('nav__current');
      link.classList.remove('nav__current');
    });
  };

  return (
    <nav ref={navRef} className="nav">
      <ul className="nav__list">
        {authStore.isAuth && (
          <>
            <li className="nav__item">
              <Link className="nav__link" onClick={checkCurrentLink} to="/">
                {t('Home')}
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" onClick={checkCurrentLink} to="/games/">
                {t('Games')}
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" onClick={checkCurrentLink} to="/library/">
                {t('Library')}
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" onClick={checkCurrentLink} to="/learn/">
                {t('Learn')}
              </Link>
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
