import { React, useEffect, useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useAuth } from './AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Use useNavigate from react-router-dom
import '../App.css'; // Custom CSS

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate(); // Correct usage of useNavigate
  const userData = useRef();

  const logoutUser = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    // Safely check if location.state and location.state.userData are defined
    if (location.state && location.state.userData) {
      userData.current = location.state.userData;
    }
  }, [location]);

  useEffect(() => {
    if (userData.current) {
      console.log('Updated userData:', userData.current); // This will log after the state is updated
    }
  }, [userData]);

  function navigatePage(pathname) {
    switch (pathname) {
      case '/home':
        navigate('/home', { state: { userData: userData.current || 'test test' } });
        break;
    case '/my-account':
        navigate('/my-account', { state: { userData: userData.current || 'test test' } });
        break;
    case '/sell-product':
        navigate('/sell-product', { state: { userData: userData.current || 'test test' } });
        break;
    default:
        break;
    }
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          {/* CIT University logo */}
          <Grid item>
            <a href="https://www.facebook.com/CITUniversity">
              <img src="/images/cit-logo.png" alt="Logo" style={{ height: '60px' }} />
            </a>
          </Grid>

          {/* Navigation Links aligned to the right */}
          <Grid item>
            <Grid container alignItems="center" justifyContent="flex-end">
              <Typography
                variant="h6"
                style={{ textDecoration: 'none', marginRight: '1.5rem', color: 'black', cursor: 'pointer' }}
                onClick={() => navigatePage('/home')} // Pass as a function reference
              >
                Home
              </Typography>

            <Typography
                variant="h6"
                style={{ textDecoration: 'none', marginRight: '1.5rem', color: 'black', cursor: 'pointer' }}
                onClick={() => navigatePage('/sell-product')} // Pass as a function reference
              >
                  Sell Product
            </Typography>

            <Typography
                variant="h6"
                style={{ textDecoration: 'none', marginRight: '1.5rem', color: 'black', cursor: 'pointer' }}
                onClick={() => navigatePage('/my-account')} // Pass as a function reference
              >
                My Account
            </Typography>

              {isAuthenticated ? (
                <Typography
                  onClick={logoutUser}
                  variant="h6"
                  sx={{ color: 'black', cursor: 'pointer', marginRight: '1.5rem' }}
                >
                  Logout
                </Typography>
              ) : (
                <Link
                  to={{ pathname: '/login', state: { userData: userData.current } }}
                  style={{ textDecoration: 'none', marginRight: '1.5rem' }}
                >
                  <Typography variant="h6" sx={{ color: 'black' }}>
                    Login
                  </Typography>
                </Link>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
