import React, { useState, useEffect } from 'react';
import '../../public/css/login.css'; 
import { useNavigate, Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import Navbar from '../components/Navbar';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Dialog, DialogContent, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800000', // Maroon
    },
    secondary: {
      main: '#FFD700', // Gold
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 500,
    },
  },
});

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(input);
    setError('');
    setIsLoading(true);
    try {
      const response = await login(input);
      if (response) {
        setError(response);
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate('/home');
        }, 2000);
      }
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  };

  const handleLogoClick = () => {
    navigate('/'); 
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="login-page">
        <div className="login-form-container">
          <h2 className="login-title">Log in</h2>
          <form className="login-form">
            <input 
              type="text" 
              placeholder="Email" 
              className="login-input" 
              name="email" 
              onChange={handleInput}
            />
            <div className="password-container-login">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="login-input"
                name="password"
                onChange={handleInput}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </span>
            </div>
            <button type="submit" className="login-button" onClick={handleLogin}>LOGIN</button>
          </form>
          <Typography variant="body2" align="center">
            <span style={{ color: 'gold' }}>Don't have an account?</span> 
            <Link to="/signup" style={{ color: 'white' }}> Register here</Link>
          </Typography>
          {error && (
            <div className="error-message" style={{ color: '#FFD700', backgroundColor: '#800000', padding: '10px', borderRadius: '4px', marginBottom: '10px', textAlign: 'center' }}>
              {error}
            </div>
          )}
        </div>

        <div className="logo-container">
          <img 
            src="logo.png" 
            alt="Cebu Institute of Technology - University Logo" 
            className="logo" 
            onClick={handleLogoClick}
          />
          <p className="university-title">CEBU INSTITUTE TECHNOLOGY - UNIVERSITY<br></br>MARKET MATCH</p>
        </div>

        {/* Loading Dialog */}
        <Dialog 
          open={isLoading} 
          disableEscapeKeyDown 
          PaperProps={{
            style: { backgroundColor: '#800000', border: '2px solid #FFD700' },
          }}
        >
          <DialogContent>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
              <CircularProgress style={{ color: 'white' }} />
              <Typography variant="body1" style={{ marginTop: '1rem', color: 'white' }}>
                Logging in...
              </Typography>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog 
          open={isSuccess} 
          disableEscapeKeyDown
          PaperProps={{
            style: { backgroundColor: '#800000', border: '2px solid #FFD700' },
          }}
        >
          <DialogContent>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
              <Typography variant="h6" style={{ color: 'white' }}>
                Login Successful!
              </Typography>
              <Typography variant="body1" style={{ marginTop: '1rem', color: 'white' }}>
                Redirecting to home page...
              </Typography>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default Login;

