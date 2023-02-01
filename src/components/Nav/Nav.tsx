import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/games/">GAMES</Link>
        </li>
        <li>
          <Link to="/library/">LIBRARY</Link>
        </li>
        <li>
          <Link to="/learn/">LEARN</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
