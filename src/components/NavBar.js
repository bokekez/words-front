import React from 'react';
import { NavLink } from 'react-router-dom';
import Model from './Model' 
import '../componentStyles/NavBar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-link" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/words" className="nav-link" activeClassName="active"> 
          Words
        </NavLink>
        <NavLink to="/add-word" className="nav-link" activeClassName="active">
          Add Word
        </NavLink>
        <NavLink to="/search" className="nav-link" activeClassName="active">
          Search
        </NavLink>
        <Model />
      </div>
    </nav>
  );
}

export default Navbar;
