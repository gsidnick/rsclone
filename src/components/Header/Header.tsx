import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <div className="header__container">
        <Link className="header__logo" to="/">
          LOGO
        </Link>
        <Nav />
      </div>
    </div>
  );
}

export default Header;
