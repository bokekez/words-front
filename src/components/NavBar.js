import React from 'react';
import { NavLink } from 'react-router-dom';
import Model from './Model';
import '../componentStyles/NavBar.css';

const Navbar = () => {
  const navBarClass = `nav-link (navData) => (navData.isActive ? "active" : 'none'`
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className={navBarClass}>
          Home
        </NavLink>
        <NavLink to="/words" className={navBarClass}>
          Words
        </NavLink>
        <NavLink to="/add-word" className={navBarClass}>
          Add Word
        </NavLink>
        <NavLink to="/search" className={navBarClass}>
          Search
        </NavLink>
        <Model />
      </div>
    </nav>
  );
};

export default Navbar;
