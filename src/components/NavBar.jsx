import React from 'react';
import "../App.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Pixel Bubble</div>
      <ul className="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Shop</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
