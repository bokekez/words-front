import React from 'react';
import { Link } from 'react-router-dom';
import '../componentStyles/NavBar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/words" className="nav-link">
          Words
        </Link>
        <Link to="/add-word" className="nav-link">
          Add Word
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
