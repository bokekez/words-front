import React from 'react';
import { Link } from 'react-router-dom';
import Model from './Model' 
import '../componentStyles/NavBar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/words" className="nav-link">
          Words
        </Link>
        <Link to="/add-word" className="nav-link">
          Add Word
        </Link>
        <Link to="/search" className="nav-link">
          Search
        </Link>
        <Model />
      </div>
    </nav>
  );
}

export default Navbar;
