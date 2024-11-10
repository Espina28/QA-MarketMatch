import React from 'react';
import '../../public/css/welcome.css';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="signin-container">
      <header className="header-container">
        <img src="logo.png" alt="Logo" className="logo2" />
        <h1 className="title">CEBU INSTITUTE OF TECHNOLOGY - UNIVERSITY MARKET MATCH</h1>
      </header>
      <div className="content">
        <img src="Leap.png" alt="Leap" className="banner-image" />  
      </div>
      <div className="btn">
        <Link to='/signup' className="sign-in-btn">SIGN IN</Link>
      </div>
      
    </div>
  );
};

export default Welcome;