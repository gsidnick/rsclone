import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import useStores from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';

function Nav() {
  const { authStore } = useStores();
  const navRef = useRef<HTMLElement>(null);

  const checkCurrentLink = (event: React.MouseEvent<HTMLElement>) => {
    navRef?.current?.querySelectorAll('a').forEach((link) => {
      link.classList.remove('nav__current');
    });

    (event.target as HTMLElement).classList.add('nav__current');
  };

  return (
    <nav ref={navRef} className="nav">
      <ul className="nav__list">
        {authStore.isAuth && (
          <>
            <li className="nav__item">
              <Link className="nav__link" onClick={checkCurrentLink} to="/">
                Home
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" onClick={checkCurrentLink} to="/games/">
                Games
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" onClick={checkCurrentLink} to="/library/">
                Library
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" onClick={checkCurrentLink} to="/learn/">
                Learn
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" onClick={() => authStore.logout()} to="/">
                Log Out
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default observer(Nav);
