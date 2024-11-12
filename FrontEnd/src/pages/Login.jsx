import React, { useState , useEffect} from 'react';
import '../../public/css/login.css'; 
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography'
import axios from 'axios';
import {useAuth} from '../components/AuthContext';
import {Link} from 'react-router-dom';

const Login = () => {
  const[input, setInput] = useState(
    {
      email: '',
      password: ''
    }
  );
  const {login} = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      await login(input);
      navigate('/');
    } catch (error) {
      setError("Invalid email or password");
    }
  }
  const handleInput = (e) => {
    const {name, value} = e.target
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value

    }));
  }
  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2 className="login-title">Log in</h2>
        <form className="login-form">
          <input type="text" placeholder="Email" className="login-input" name="email" onChange={handleInput}/>
          <input type="password" placeholder="Password" className="login-input" name="password" onChange={handleInput}/>
          <button type="submit" className="login-button" onClick={handleLogin}>LOGIN</button>
        </form>
        <Typography variant="body2" align="center">
          <span style={{ color: 'gold' }}>Don't have an account?</span> 
          <Link to="/signup" style={{ color: 'white' }}>Register here</Link>
        </Typography>
        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}
      </div>

      <div className="logo-container">
        <img src="logo.png" alt="Cebu Institute of Technology - University Logo" className="logo" />
        <p className="university-title">CEBU INSTITUTE TECHNOLOGY - UNIVERSITY MARKET MATCH</p>
      </div>
    </div>
  );
};

export default Login;