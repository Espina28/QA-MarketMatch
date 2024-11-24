import React, { useState, useEffect } from 'react';
import '../../public/css/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, Dialog, DialogContent, CircularProgress, Typography } from '@mui/material';
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

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    address: '',
    phonenumber: '',
    student_Id: '',
    email: '',
    password: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormComplete = () => {
    return Object.values(formData).every((field) => field.trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormComplete()) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/user/postUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          const userId = data.userId;
          console.log('Form submitted:', data);
          const cartPayload = {
            dateAdded: new Date().toISOString(),
            quantity: 0,
            user: { userId: userId },
          };
          console.log(cartPayload);
          await axios.post(
            `http://localhost:8080/api/cart/postCart/` + userId,
            cartPayload,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          const SellerData = {
            products_sold: 0,
            userid: { userId: userId },
          };
          console.log(SellerData);
          await axios.post(
            `http://localhost:8080/api/seller/postSeller/` + userId,
            SellerData,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          const BuyerData = {
            totalTransaction: 0,
            user: { userId: userId },
          };
          console.log(BuyerData);
          await axios.post(
            `http://localhost:8080/api/buyers/postBuyer/` + userId,
            BuyerData,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          setFormData({
            firstname: '',
            lastname: '',
            address: '',
            phonenumber: '',
            student_Id: '',
            email: '',
            password: '',
          });
          sessionStorage.removeItem('signupData');

          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            navigate('/login');
          }, 2000);
        } else {
          throw new Error('Failed to sign up');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage('Please fill in all fields before proceeding.');
    }
  };

  useEffect(() => {
    const savedData = sessionStorage.getItem('signupData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('signupData', JSON.stringify(formData));
  }, [formData]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="signup-page">
      <div className="signup-form-container">
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="student_Id"
            placeholder="Student ID no."
            className="signup-input"
            value={formData.student_Id}
            onChange={handleChange}
          />
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            className="signup-input"
            value={formData.firstname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            className="signup-input"
            value={formData.lastname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="signup-input"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phonenumber"
            placeholder="Phone Number"
            className="signup-input"
            value={formData.phonenumber}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Institutional Email"
            className="signup-input"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="password-container">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="signup-input password-input"
              value={formData.password}
              onChange={handleChange}
            />
            <IconButton onClick={togglePasswordVisibility} className="visibility-icon">
              {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </div>
          {errorMessage && (
            <div className="error-message" style={{ color: '#FFD700', backgroundColor: '#800000', padding: '10px', borderRadius: '4px', marginBottom: '10px', textAlign: 'center' }}>
              {errorMessage}
            </div>
          )}
          <button type="submit" className="signup-button">
            SIGN UP
          </button>
        </form>
      </div>

      <div className="logo-container">
        <img
          src="logo.png"
          alt="Cebu Institute of Technology - University Logo"
          className="logo"
        />
        <p className="university-title">
          CEBU INSTITUTE OF TECHNOLOGY - UNIVERSITY MARKET MATCH
        </p>
        <Link to="/login">
          <button className="login-button">LOGIN</button>
        </Link>
      </div>

      <ThemeProvider theme={theme}>
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
                Creating your account...
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
                You are now registered!
              </Typography>
              <Typography variant="body1" style={{ marginTop: '1rem', color: 'white' }}>
                Redirecting to login page...
              </Typography>
            </div>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};

export default Signup;

