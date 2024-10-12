import React from 'react';
import words_logo from '../resources/words_logo.png';
import '../componentStyles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <img src={words_logo} alt="Logo" className="logo" />
      <h1 className="header-text">Words and synoyms</h1>
    </div>
  );
};

export default Home;
