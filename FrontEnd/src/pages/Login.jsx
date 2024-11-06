import React, { useState , useEffect} from 'react';
import '../../public/css/login.css'; 
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography'
import axios from 'axios';
import {useAuth} from '../components/AuthContext';
import {Link} from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('');
    try{
      const response = await axios.post('http://localhost:8080/api/user/login', {
        email,
        password
      }, { withCredentials: true });
      console.log(response);
      if(response.status===200){
        login();
        navigate('/');  
      }else{
        const errorData = response.data;
        setError(errorData);
      }
    }catch(error){
      setError('Invalid credentials');
    }
  }
  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2 className="login-title">Log in</h2>
        <form className="login-form">
          <input type="text" placeholder="Email" className="login-input" onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" className="login-input" onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" className="login-button" onClick={handleSubmit}>LOGIN</button>
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