import React from 'react';
import './login.css'; 

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2 className="login-title">Log in</h2>
        <form className="login-form">
          <input type="text" placeholder="Faculty ID no." className="login-input" />
          <input type="password" placeholder="Password" className="login-input" />
          <button type="submit" className="login-button">LOGIN</button>
        </form>
      </div>

      <div className="logo-container">
        <img src="logo.png" alt="Cebu Institute of Technology - University Logo" className="logo" />
        <p className="university-title">CEBU INSTITUTE TECHNOLOGY - UNIVERSITY MARKET MATCH</p>
      </div>
    </div>
  );
};

export default Login;