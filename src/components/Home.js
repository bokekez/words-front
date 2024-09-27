import React from 'react';
import reeinvent_logo from '../resources/reeinvent_logo.jpg'
import '../componentStyles/Home.css';

const Home = () => {

  return (
    <div className="home-container">     
      <img
        src={reeinvent_logo}
        alt="Logo"
        className="logo" 
      />
      <h1 className="header-text">Reeinvent Words</h1>
    </div>
  );
};

export default Home;
