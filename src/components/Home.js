import React from 'react';
import reeinvent_logo from '../resources/reeinvent_logo.jpg'
import '../componentStyles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <img
          src={reeinvent_logo}
          alt="Spinning Animation"
          className="image-spin-fade"
      />
      <h1>Words</h1>
    </div>
  )
}

export default Home;
