import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  TextField, Button, Typography, Container, Box, Modal, IconButton,
  Grid, Paper, Avatar, Divider
} from '@mui/material';
import axios from 'axios';
import SideBar from '../components/SideBar';
import Navbar from '../components/Navbar';
import { Visibility, VisibilityOff, CloudUpload } from '@mui/icons-material';
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
    image: null,
  });
  const [profileImage, setProfileImage] = useState(null);
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
        if (response.data.image) {
          setProfileImage(`data:image/jpeg;base64,${response.data.image}`);
        }
      })
      .catch(error => {
        console.error('Error fetching user data!', error);
      });
  }, [userId]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result.replace(/^data:image\/[a-z]+;base64,/, '');
      setUserData({ ...userData, image: base64Image });
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validatePassword = (password) => {
    setPasswordValid({
      length: password.length >= 8,
      capital: /[A-Z]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
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

  const handlePasswordChange = async () => {
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
        setPasswordModalOpen(false);
      } catch (error) {
        console.error("Error changing password", error);
      }
    }
  };

  const handleCancel = () => {
    setUserData(originalUserData);
  };

  const togglePasswordModal = () => {
    setPasswordModalOpen(!passwordModalOpen);
    setPassword("");
    setConfirmPassword("");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, display: 'flex', padding: 4, marginTop: '.01rem' }} className="padding-color-outer">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} lg={3}>
            <SideBar state={{ userData: location.state ? location.state.userData : null }} />
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Paper elevation={3} sx={{ padding: 4 }}>
              <Typography variant="h4" gutterBottom>My Profile</Typography>
              <Divider sx={{ my: 2 }} />
              
              <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" mb={4}>
                <Avatar
                  src={profileImage}
                  sx={{ width: 150, height: 150, mr: { xs: 0, sm: 4 }, mb: { xs: 2, sm: 0 } }}
                />
                <Box>
                  <Typography variant="h5" gutterBottom>{`${userData.firstname} ${userData.lastname}`}</Typography>
                  <Typography variant="subtitle1" gutterBottom><strong>Student ID:</strong> {userData.student_Id}</Typography>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUpload />}
                    sx={{ mt: 2 }}
                  >
                    Upload New Picture
                    <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                  </Button>
                </Box>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    variant="outlined"
                    value={userData.address || ""}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={userData.email || ""}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    variant="outlined"
                    value={userData.phonenumber || ""}
                    onChange={(e) => setUserData({ ...userData, phonenumber: e.target.value })}
                    inputProps={{ maxLength: 11 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={togglePasswordModal}>
                    Change Password
                  </Button>
                </Grid>
              </Grid>

              <Box display="flex" justifyContent="flex-end" mt={4}>
                <Button variant="outlined" onClick={handleCancel} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSave}>
                  Save Changes
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Phone Number Warning Modal */}
      <Modal
        open={phoneNumberWarningOpen}
        onClose={() => setPhoneNumberWarningOpen(false)}
        aria-labelledby="phone-number-warning"
      >
        <Box sx={{ width: 300, padding: 2, backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h6" gutterBottom>Warning!</Typography>
          <Typography variant="body1" color="error">Phone number must be exactly 11 digits.</Typography>
          <Button variant="contained" color="primary" onClick={() => setPhoneNumberWarningOpen(false)} sx={{ marginTop: 2 }}>
            OK
          </Button>
        </Box>
      </Modal>

      {/* Password Change Modal */}
      <Modal open={passwordModalOpen} onClose={togglePasswordModal}>
        <Box sx={{ width: 400, padding: 4, backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
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
                <IconButton onClick={togglePasswordVisibility} edge="end">
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
                <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
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
            sx={{ marginTop: 2 }}
          >
            Save Password
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default MyAccount;

