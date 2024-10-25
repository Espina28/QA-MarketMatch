import React, { useState, useEffect } from 'react';
import '../../public/css/signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    address: '',
    phonenumber: '',
    student_Id: '',
    email: '',
    password: '',
    user_Type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const isFormComplete = () => {
    return Object.values(formData).every(field => field.trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormComplete()) {
      try {
        const response = await fetch('http://localhost:8080/api/user/postUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Form submitted:', data);

          // Clear the form and local storage after successful submission
          setFormData({
            firstname: '',
            lastname: '',
            address: '',
            phonenumber: '',
            student_Id: '',
            email: '',
            password: '',
            user_Type: ''
          });
          localStorage.removeItem('signupData');

          alert('Signup successful!');
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
    // Load form data from local storage if available
    const savedData = localStorage.getItem('signupData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Save form data to local storage whenever it changes
    localStorage.setItem('signupData', JSON.stringify(formData));
  }, [formData]);

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
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="signup-input"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="user_Type"
            placeholder="User Type"
            className="signup-input"
            value={formData.user_Type}
            onChange={handleChange}
          />
          <button type="submit" className="signup-button">SIGN UP</button>
        </form>
      </div>

      <div className="logo-container">
        <img src="logo.png" alt="Cebu Institute of Technology - University Logo" className="logo" />
        <p className="university-title">CEBU INSTITUTE OF TECHNOLOGY - UNIVERSITY MARKET MATCH</p>
        <Link to='/login'><button className="login-button">LOGIN</button></Link>
      </div>
    </div>
  );
};

export default Signup;
