import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import SideBar from '../components/SideBar';
import Navbar from '../components/Navbar';
import '../App.css';

function MyAccount() {
  const [userData, setUserData] = useState({
    name: "",
    studentId: "",
    address: "",
    email: "",
    phone: ""
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    axios.get(`/api/user/1`) // Replace with your actual endpoint
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      alert("Changes saved!");
      // Add API call to update user data here
    }
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh', marginTop: '64px' }}>
      <Grid container direction="row" spacing={6} sx={{ height: '91.9%', padding: 4 }} className="padding-color-outer">
        {/* Sidebar */}
        <Grid item md={3} sx={{ maxWidth: '100%', padding: 3}}>
          <SideBar />
        </Grid>

        {/* Profile Content */}
        <Grid item md={8} container direction="column" sx={{ backgroundColor: 'white', padding: 4 }}>
          <Typography variant="h4" gutterBottom>My Profile</Typography>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="subtitle1"><strong>Name:</strong> {userData.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1"><strong>Student ID:</strong> {userData.studentId}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1"><strong>Address:</strong></Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1"><strong>Email:</strong> {userData.email}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1"><strong>Phone:</strong></Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1"><strong>Change Password:</strong></Typography>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1"><strong>Confirm Password:</strong></Typography>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>

            {/* Action Buttons */}
            <Grid item container spacing={2} sx={{ marginTop: '1rem' }}>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="secondary">Cancel</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MyAccount;
