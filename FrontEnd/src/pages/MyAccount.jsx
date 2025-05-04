import React, { useState, useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { 
  TextField, Button, Typography, Container, Box, Modal, IconButton,
  Grid, Paper, Avatar, Divider, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import axios from 'axios';
import SideBar from '../components/SideBar';
import Navbar from '../components/Navbar';
import { styled } from '@mui/material/styles';
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
  const fileInputRef = useRef(null);
  const [phoneNumberWarningOpen, setPhoneNumberWarningOpen] = useState(false);
  const userId = sessionStorage.getItem("id");
  const [loading, setLoading] = useState(true);
  const [sideBarLoaded, setSideBarLoaded] = useState(false);
  const [mainLoaded, setMainLoaded] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Dialog States
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8080/api/user/getUserbyId', {
      params: { id: userId },
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then(response => {
        setUserData(response.data);
        setOriginalUserData(response.data);
        setMainLoaded(true);
        setLoading(false);
        if (response.data.image) {
          setProfileImage(`data:image/jpeg;base64,${response.data.image}`);
        }
      })
      .catch(error => {
        console.error('Error fetching user data!', error);
        setLoading(false);  
      });
  }, [userId, sideBarLoaded]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
    if (!email.endsWith('@cit.edu')) {
      return "Email must end with @cit.edu";
    }
    return "";
  };

  
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUserData({ ...userData, email });

    const error = validateEmail(email);
    setEmailError(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  const handleSideBarLoad = () => {
    setSideBarLoaded(true);
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
    const error = validateEmail(userData.email);
    setEmailError(error);

    if (error) {
      setIsModalOpen(true); // Optional: show modal if not already shown
      return; // Stop execution if there's an error
    }

    if (userData.phonenumber.length !== 11) {
      setPhoneNumberWarningOpen(true);
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/user/updateUser?id=${userId}`, userData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
      });
      setDialogMessage("Changes saved!");
      setDialogOpen(true);  // Open the dialog after save
      window.location.reload();
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  const handlePasswordChange = async () => {
    if (!passwordValid.length || !passwordValid.capital || !passwordValid.specialChar) {
      setDialogMessage("Password must be at least 8 characters long, contain at least one capital letter, and one special character.");
      setDialogOpen(true);  // Show dialog if password is invalid
      return;
    }

    if (password !== confirmPassword) {
      setDialogMessage("Passwords do not match!");
      setDialogOpen(true);  // Show dialog if passwords don't match
    } else {
      try {
        await axios.put('http://localhost:8080/api/user/updatePassword', null, {
          params: { id: userId, password },
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          },
        });
        setDialogMessage("Password changed successfully!");
        setDialogOpen(true);  // Show dialog for successful password change
        setPasswordModalOpen(false);
      } catch (error) {
        console.error("Error changing password", error);
      }
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleCancel = () => {
    setUserData(originalUserData);
  };

  const togglePasswordModal = () => {
    setPasswordModalOpen(!passwordModalOpen);
    if (!passwordModalOpen) {

      setPassword("");
      setConfirmPassword("");
      setPasswordValid({
        length: false,
        capital: false,
        specialChar: false,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  return (
    <Container maxWidth={false} disableGutters sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
       <Navbar />
      <Box sx={{ flexGrow: 1, display: 'flex', padding: 4, marginTop: '.01rem' }} className="padding-color-outer">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} lg={3}>
          <SideBar onLoad={handleSideBarLoad} />
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Paper elevation={3} sx={{ padding: 4 }}>
              <Typography variant="h5" sx={{ mb: 4, borderBottom: '1px solid #e0e0e0', pb: 2 }}>
                My Profile
              </Typography>
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <EditableAvatar
                      src={profileImage}
                      onClick={handleAvatarClick}
                      sx={{ 
                        width: 150, 
                        height: 150, 
                        mb: 2,
                        bgcolor: '#e0e0e0',
                      }}
                    >
                      <CloudUpload 
                        className="editIcon"
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: 'white',
                          opacity: 0,
                          transition: 'opacity 0.3s',
                          zIndex: 1,
                        }}
                      />
                    </EditableAvatar>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      accept="image/*"
                    />
                  </Box>
                </Grid>
                    
                <Grid item xs={12} md={8}>
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      <Typography sx={{ width: 120, color: 'text.secondary' }}>Name:</Typography>
                      <Typography>{`${userData.firstname} ${userData.lastname}`}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      <Typography sx={{ width: 120, color: 'text.secondary' }}>Student ID:</Typography>
                      <Typography>{userData.student_Id}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      <Typography sx={{ width: 120, color: 'text.secondary' }}>Address:</Typography>
                      <Typography>{userData.address}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      <Typography sx={{ width: 120, color: 'text.secondary' }}>Email:</Typography>
                      <Typography>{userData.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      <Typography sx={{ width: 120, color: 'text.secondary' }}>Phone:</Typography>
                      <Typography>{userData.phonenumber}</Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Update First Name"
                        variant="outlined"
                        value={userData.firstname || ""}
                        onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Update Last Name"
                        variant="outlined"
                        value={userData.lastname || ""}
                        onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                    {/* <Typography sx={{ width: 120, color: 'red' }}>Error</Typography> */}
                      <TextField
                        fullWidth
                        label="Update Email"
                        variant="outlined"
                        value={userData.email || ""}
                        // onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        onChange={handleEmailChange}
                        error={!!emailError}
                        helperText={emailError || " "}
                      />
                       <Modal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        aria-labelledby="email-error-title"
                        aria-describedby="email-error-description"
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                            width: 300,
                          }}
                        >
                          <Typography id="email-error-title" variant="h6" color="error">
                            Invalid Email
                          </Typography>
                          <Typography id="email-error-description" sx={{ mt: 2 }}>
                            {emailError}
                          </Typography>
                          <Button onClick={handleCloseModal} sx={{ mt: 3 }} variant="contained">
                            OK
                          </Button>
                        </Box>
                      </Modal>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Update Address"
                        variant="outlined"
                        value={userData.address || ""}
                        onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Update Phone"
                        variant="outlined"
                        value={userData.phonenumber || ""}
                        onChange={(e) => setUserData({ ...userData, phonenumber: e.target.value })}
                        inputProps={{ maxLength: 11 }}
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/[^0-9]/g, "");
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-start', 
                mt: 4,
                gap: 2
              }}>
                <Button 
                  variant="contained"
                  onClick={handleSave}
                  sx={{ 
                    bgcolor: '#E3A008',
                    '&:hover': { bgcolor: '#C47F00' },
                    color: 'white',
                    px: 4
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={togglePasswordModal}
                  sx={{ 
                    bgcolor: '#E3A008',
                    '&:hover': { bgcolor: '#C47F00' },
                    color: 'white',
                    px: 4
                  }}
                >
                  Change Password
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

      {/* Loading Modal */}
      <Modal open={loading}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: 'maroon', padding: 2, borderRadius: 2, border: '4px solid gold',
        }}>
          <CircularProgress color="inherit" sx={{ color: 'white' }} />
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

          {/* Consolidated Alert Dialog */}
          <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Alert</DialogTitle>
            <DialogContent>
              <Typography variant="body1">{dialogMessage}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>

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

const EditableAvatar = styled(Avatar)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '50%',
    },
    '& .editIcon': {
      opacity: 1,
    },
  },
}));
