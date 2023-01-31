import React from 'react'
import Nav from '../Nav/Nav';
import './Header.css'

function Header(): JSX.Element {
  return (
    <div className="header">
      <div className="header__container container">
        <a className="header__logo" href="/">LOGO</a>
        <Nav />
      </div>
    </div>
  );
}

export default Header;
