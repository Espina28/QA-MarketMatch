import React, { useState, useEffect } from 'react';
import '../../public/css/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';

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

          setFormData({
            firstname: '',
            lastname: '',
            address: '',
            phonenumber: '',
            student_Id: '',
            email: '',
            password: '',
          });
          localStorage.removeItem('signupData');

          alert('Signup successful!');
          navigate('/login');
        } else {
          alert('Failed to sign up. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('Please fill in all fields before proceeding.');
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem('signupData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('signupData', JSON.stringify(formData));
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
    </div>
  );
};

export default Signup;
