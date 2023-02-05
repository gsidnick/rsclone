import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

function Nav() {
  
  const navRef = useRef<HTMLElement>(null);

  const checkCurrentLink = (event: React.MouseEvent<HTMLElement>) => {
    navRef?.current?.querySelectorAll('a').forEach(link => {
      link.classList.remove('nav__current');
    });

    (event.target as HTMLElement).classList.add('nav__current');
  }

  return (
    <nav ref={navRef} className="nav">
      <ul className="nav__list">
        <li>
          <Link onClick={checkCurrentLink} to="/">HOME</Link>
        </li>
        <li>
          <Link onClick={checkCurrentLink} to="/games/">GAMES</Link>
        </li>
        <li>
          <Link onClick={checkCurrentLink} to="/library/">LIBRARY</Link>
        </li>
        <li>
          <Link onClick={checkCurrentLink} to="/learn/">LEARN</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
