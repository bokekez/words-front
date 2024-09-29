import React from 'react';
import { NavLink } from 'react-router-dom';
import Model from './Model';
import '../componentStyles/NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink
          to="/"
          className={`nav-link (navData) => (navData.isActive ? "active" : 'none'`}
        >
          Home
        </NavLink>
        <NavLink
          to="/words"
          className={`nav-link (navData) => (navData.isActive ? "active" : 'none'`}
        >
          Words
        </NavLink>
        <NavLink
          to="/add-word"
          className={`nav-link (navData) => (navData.isActive ? "active" : 'none'`}
        >
          Add Word
        </NavLink>
        <NavLink
          to="/search"
          className={`nav-link (navData) => (navData.isActive ? "active" : 'none'`}
        >
          Search
        </NavLink>
        <Model />
      </div>
    </nav>
  );
};

export default Navbar;
