import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../public/css/welcome.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Welcome = () => {

  const location = useLocation();
  const [userData, setUserData] = useState();

  useEffect(() => {
    // Safely check if location.state and location.state.userData are defined
    if (location.state && location.state.userData) {
      setUserData(location.state.userData);
    }
  }, [location]); 

  useEffect(() => {
    if (userData) {
      console.log('Updated userData:', userData); // This will log after the state is updated
    }
  }, [userData]); 

  return (
    <div className="signin-container">
      <Navbar/>
      <header className="header-container">
        <img src="logo.png" alt="Logo" className="logo" />
        <h1 className="title">CEBU INSTITUTE OF TECHNOLOGY - UNIVERSITY MARKET MATCH</h1>
      </header>
      <div className="content">
        <img src="Leap.png" alt="Leap" className="banner-image" />
        <Link to='/signup' className="sign-in-btn">SIGN IN</Link>
      </div>
    </div>
  );
};

export default Welcome;
