import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom'; // Use Link from react-router-dom
import '../App.css'; // Custom CSS

export default function Navbar() {
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
                            <Link to="/" style={{ textDecoration: 'none', marginRight: '1.5rem' }}>
                                <Typography variant="h6" sx={{ color: 'black' }}>Home</Typography>
                            </Link>
                            <Link to="/my-account" style={{ textDecoration: 'none', marginRight: '1.5rem' }}>
                                <Typography variant="h6" sx={{ color: 'black' }}>My Account</Typography>
                            </Link>
                            <Link to="/sell-product" style={{ textDecoration: 'none', marginRight: '1.5rem' }}>
                                <Typography variant="h6" sx={{ color: 'black' }}>Sell Product</Typography>
                            </Link>
                            <Link to="/buy-product" style={{ textDecoration: 'none' }}>
                                <Typography variant="h6" sx={{ color: 'black' }}>Buy Product</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
