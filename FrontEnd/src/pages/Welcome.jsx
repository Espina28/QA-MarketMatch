import React from 'react';
import { Link } from 'react-router-dom';
import NavbarWelcome from '../components/NavbarWelcome';

const Welcome = () => {
  return (
    <div className="signin-container">
      <style>
        {`
        
          html, body {
            height: 100%;
            margin: 0;
            overflow: hidden; 
          }

          .content {
            position: relative;
            height: 100vh; 
            text-align: center;
            margin: 0;
          }

          .banner-image {
            width: 100%; 
            height: 100vh;
            object-fit: cover;
          }

          .btn {
            position: absolute;
            top: 50%; 
            left: 50%; 
            transform: translate(-50%, -50%); 
            z-index: 10;
          }

          .sign-in-btn {
            padding: 15px 50px;
            border-width: 2px;
            border-style: solid; 
            border-color: black; 
            color: black;
            text-decoration: none;
            background-color: rgba(128, 0, 0, 0.5);
            border-radius: 10px;
            font-size: 25px;
            font-weight: bold;
            margin-bottom: 100px;
            margin-right:80px;
            height: 20px; 
            display: inline-flex; 
            align-items: center; 
            justify-content: center;
          }
          .log-in-btn {
            padding: 15px 50px;
            border-width: 2px;
            border-style: solid; 
            border-color: black; 
            color: black;
            text-decoration: none;
            background-color: rgba(128, 0, 0, 0.5);
            border-radius: 10px;
            font-size: 25px;
            font-weight: bold;
            margin-bottom: 100px;
            margin-right:80px;
            height: 20px; 
            display: inline-flex; 
            align-items: center; 
            justify-content: center;
          }
        `}
      </style>
      <style>
        {`
        
          html, body {
            height: 100%;
            margin: 0;
            overflow: hidden; 
          }

          .content {
            position: relative;
            height: 100vh; 
            text-align: center;
            margin: 0;
          }

          .banner-image {
            width: 100%; 
            height: 100vh;
            object-fit: cover;
          }

          .btn {
            position: absolute;
            top: 50%; 
            left: 50%; 
            transform: translate(-50%, -50%); 
            z-index: 10;
          }

          .sign-in-btn {
            padding: 15px 50px;
            border-width: 2px;
            border-style: solid; 
            border-color: black; 
            color: black;
            text-decoration: none;
            background-color: rgba(128, 0, 0, 0.5);
            border-radius: 10px;
            font-size: 25px;
            font-weight: bold;
            margin-bottom: 100px;
            margin-right:80px;
            height: 20px; 
            display: inline-flex; 
            align-items: center; 
            justify-content: center;
          }
          .log-in-btn {
            padding: 15px 50px;
            border-width: 2px;
            border-style: solid; 
            border-color: black; 
            color: black;
            text-decoration: none;
            background-color: rgba(128, 0, 0, 0.5);
            border-radius: 10px;
            font-size: 25px;
            font-weight: bold;
            margin-bottom: 100px;
            margin-right:80px;
            height: 20px; 
            display: inline-flex; 
            align-items: center; 
            justify-content: center;
          }
        `}
      </style>
      <div className="content"> 
        <NavbarWelcome/>
        <img src="landing.png" alt="Leap" className="banner-image" />
            
        {/* <div className="btn">
          <Link to="/signup" className="sign-in-btn">SIGN UP</Link>
          <Link to="/login" className="log-in-btn">LOG IN</Link>
        </div> */}
      

      </div>
   
    </div>
  );
};

export default Welcome;