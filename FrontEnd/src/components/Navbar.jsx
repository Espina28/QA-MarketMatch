import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import '../App.css' /*<---- custom css*/

export default function Navbar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'white', padding: '', boxShadow: 'none' }}>
                <Grid container >
                    <Grid>  
                        <Toolbar>
                            <Link href="https://www.facebook.com/CITUniversity">
                                <img src="/images/cit-logo.png" alt="Logo" style={{ height: '60px' }} />
                            </Link>
                        </Toolbar>
                    </Grid>
                    <Grid container spacing={3} direction="row" sx={{ marginLeft: 'auto', marginRight: '2rem', alignItems: 'center' }}>
                        <Grid className="nav-item" sx={{padding: '.5rem', borderRadius: '10px'}}> 
                            <Link underline="none">
                                <Typography variant="h6" sx={{color: 'black'}}>Home</Typography>
                            </Link>
                        </Grid>
                        <Grid className="nav-item">
                            <Link underline="none">
                                <Typography variant="h6" sx={{color: 'black'}}>Home</Typography>
                            </Link>
                        </Grid>
                        <Grid className="nav-item">
                            <Link underline="none">
                                <Typography variant="h6" sx={{color: 'black'}}>Home</Typography>
                            </Link>
                        </Grid>
                        <Grid className="nav-item">
                            <Link underline="none">
                                <Typography variant="h6" sx={{color: 'black'}}>My Account</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
        </AppBar>
    );
}
