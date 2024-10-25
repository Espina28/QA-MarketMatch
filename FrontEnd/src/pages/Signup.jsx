import React, { useState, useEffect } from 'react';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    studentID: '',
    firstName: '',
    lastName: '',
    course: '',
    email: '',
    password: ''
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete()) {
      // Proceed to next page or handle successful signup
      console.log('Form submitted:', formData);
      // Optionally, clear the storage after submission
      localStorage.removeItem('signupData');
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
            name="studentID"
            placeholder="Student ID no."
            className="signup-input"
            value={formData.studentID}
            onChange={handleChange}
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="signup-input"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="signup-input"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            className="signup-input"
            value={formData.course}
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
          <button type="submit" className="signup-button">SIGN UP</button>
        </form>
      </div>

      <div className="logo-container">
        <img src="logo.png" alt="Cebu Institute of Technology - University Logo" className="logo" />
        <p className="university-title">CEBU INSTITUTE OF TECHNOLOGY - UNIVERSITY MARKET MATCH</p>
        <button className="login-button">LOGIN</button>
      </div>
    </div>
  );
};

export default Signup;