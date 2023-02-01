import React from 'react';

function Nav() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li>
          <a href="/">HOME</a>
        </li>
        <li>
          <a href="/games/">GAMES</a>
        </li>
        <li>
          <a href="/library/">LIBRARY</a>
        </li>
        <li>
          <a href="/learn/">LEARN</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
