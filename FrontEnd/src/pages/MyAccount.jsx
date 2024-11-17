import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid as Grid2, TextField, Button, Typography, Container, Box, Modal, IconButton } from '@mui/material';
import axios from 'axios';
import SideBar from '../components/SideBar';
import Navbar from '../components/Navbar';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../App.css';

function MyAccount() {
  const location = useLocation();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    studentId: "",
    address: "",
    email: "",
    phonenumber: "",
  });
  const [originalUserData, setOriginalUserData] = useState({});
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    capital: false,
    specialChar: false,
  });
  const [phoneNumberWarningOpen, setPhoneNumberWarningOpen] = useState(false);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    axios.get('http://localhost:8080/api/user/getUserbyId', {
      params: { id: userId },
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => {
        setUserData(response.data);
        setOriginalUserData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, []);

  const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const capitalValid = /[A-Z]/.test(password);
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordValid({
      length: lengthValid,
      capital: capitalValid,
      specialChar: specialCharValid,
    });
  };

  const handlePasswordInputChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (userData.phonenumber.length !== 11) {
      setPhoneNumberWarningOpen(true);
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/user/updateUser?id=${userId}`, userData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });
      alert("Changes saved!");
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  const togglePasswordModal = () => {
    setPasswordModalOpen(!passwordModalOpen);
    setPassword("");
    setConfirmPassword("");
  };

  const handlePasswordChange = async () => {
    // Check if password meets all criteria before saving
    if (!passwordValid.length || !passwordValid.capital || !passwordValid.specialChar) {
      alert("Password must be at least 8 characters long, contain at least one capital letter, and one special character.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      try {
        await axios.put('http://localhost:8080/api/user/updatePassword', null, {
          params: { id: userId, password },
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        alert("Password changed successfully!");
        togglePasswordModal();
      } catch (error) {
        console.error("Error changing password", error);
      }
    }
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;

    if (/^\d*$/.test(input) && input.length <= 11) {
      setUserData({ ...userData, phonenumber: input });
    }
  };

  const handleCancel = () => {
    setUserData(originalUserData);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ height: '105vh' }}>
      <Navbar />
      <Grid2 container direction="row" spacing={6} sx={{ height: '91.9%', padding: 4, marginTop: '.01rem' }} className="padding-color-outer">
        <Grid2 item md={4} sx={{ maxWidth: '50%', padding: 6 }}>
          <SideBar state={{ userData: location.state ? location.state.userData : null }} />
        </Grid2>

        <Grid2 item md={8} container direction="column" sx={{ backgroundColor: 'white', padding: 4 }}>
          <Typography variant="h4" gutterBottom>My Profile</Typography>
          <Grid2 container direction="column" spacing={2}>
            <Grid2 item>
              <Typography variant="subtitle1"><strong>Name:</strong> {`${userData.firstname} ${userData.lastname}`}</Typography>
            </Grid2>
            <Grid2 item>
              <Typography variant="subtitle1"><strong>Student ID:</strong> {userData.student_Id}</Typography>
            </Grid2>
            <Grid2 item>
              <Typography variant="subtitle1"><strong>Address:</strong></Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={userData.address || ""}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              />
            </Grid2>
            <Grid2 item>
              <Typography variant="subtitle1"><strong>Email:</strong></Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={userData.email || ""}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </Grid2>
            <Grid2 item>
              <Typography variant="subtitle1"><strong>Phone:</strong></Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={userData.phonenumber || ""}
                onChange={handlePhoneChange}
                inputProps={{ maxLength: 11 }}
              />
            </Grid2>
            <Grid2 item>
              <Button variant="contained" color="primary" onClick={togglePasswordModal}>Change Password</Button>
            </Grid2>
            <Grid2 item container spacing={2} sx={{ marginTop: '1rem' }}>
              <Grid2 item>
                <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
              </Grid2>
              <Grid2 item>
                <Button
                  variant="contained"
                  onClick={handleCancel}
                  sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}
                >
                  Cancel
                </Button>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>

      {/* Phone number warning modal */}
      <Modal
        open={phoneNumberWarningOpen}
        onClose={() => setPhoneNumberWarningOpen(false)}
        aria-labelledby="phone-number-warning"
      >
        <Box sx={{ width: 300, padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '20%' }}>
          <Typography variant="h6" gutterBottom>Warning!</Typography>
          <Typography variant="body1" color="error">Phone number must be exactly 11 digits.</Typography>
          <Button variant="contained" color="primary" onClick={() => setPhoneNumberWarningOpen(false)} sx={{ marginTop: 2 }}>
            OK
          </Button>
        </Box>
      </Modal>

      {/* Password Change Modal */}
      <Modal open={passwordModalOpen} onClose={togglePasswordModal}>
        <Box sx={{ width: 400, padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%' }}>
          <Typography variant="h6" gutterBottom>Change Password</Typography>
          <TextField
            fullWidth
            type={passwordVisible ? "text" : "password"}
            label="New Password"
            variant="outlined"
            value={password}
            onChange={handlePasswordInputChange}
            sx={{ marginBottom: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {passwordVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
          <TextField
            fullWidth
            type={confirmPasswordVisible ? "text" : "password"}
            label="Confirm New Password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={toggleConfirmPasswordVisibility}
                  edge="end"
                >
                  {confirmPasswordVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
          
          {/* Password Validation Feedback */}
          <Typography variant="body2" color={passwordValid.length ? 'green' : 'red'}>
            {passwordValid.length ? '✅ At least 8 characters' : '❌ At least 8 characters'}
          </Typography>
          <Typography variant="body2" color={passwordValid.capital ? 'green' : 'red'}>
            {passwordValid.capital ? '✅ At least 1 capital letter' : '❌ At least 1 capital letter'}
          </Typography>
          <Typography variant="body2" color={passwordValid.specialChar ? 'green' : 'red'}>
            {passwordValid.specialChar ? '✅ At least 1 special character' : '❌ At least 1 special character'}
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handlePasswordChange}
            disabled={!passwordValid.length || !passwordValid.capital || !passwordValid.specialChar || password !== confirmPassword}
          >
            Save Password
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default MyAccount;
