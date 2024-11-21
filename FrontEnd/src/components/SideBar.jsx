import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DescriptionIcon from '@mui/icons-material/Description';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

export default function SideBar() {
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        image: null,
    });
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
        })
        .catch(error => {
            console.error('There was an error fetching the user data!', error);
        });
    }, [userId]);

    return (
        <Grid container justifyContent={'center'} sx={{ background: 'white', paddingTop: '4rem', paddingRight: '2rem', paddingLeft: '2rem', height: '100%' }}>
            <Grid container direction={'column'}>
                <Box display="flex" alignItems="center" mb={2}>
                    {/* Profile Picture */}
                    <IconButton color="inherit" sx={{ p: 0, mr: 2 }}>
                        {userData.image ? (
                            <img src={`data:image/jpeg;base64,${userData.image}`} alt="Profile" style={{ width: 60, height: 60, borderRadius: '50%' }} />
                        ) : (
                            <AccountCircleIcon sx={{ fontSize: 60, color: 'grey' }} />
                        )}
                    </IconButton>
                    {/* User Name */}
                    <Typography variant='h6'>{userData.firstname} {userData.lastname}</Typography>
                </Box>
                <Divider sx={{ margin: '1rem 0' }} />

                {/* Sidebar links */}
                <Stack direction={'column'} spacing={2}>
                    <Link to="/myProducts" style={{ textDecoration: 'none', color: 'black' }}>
                        <Box display="flex" alignItems="center">
                            <IconButton color="inherit" sx={{ mr: 1 }}>
                                <ShoppingCartIcon sx={{ fontSize: 25, color: 'grey' }} />
                            </IconButton>
                            <Typography>My Products</Typography>
                        </Box>
                    </Link>
                    <Link to="/orders" style={{ textDecoration: 'none', color: 'black' }}>
                        <Box display="flex" alignItems="center">
                            <IconButton color="inherit" sx={{ mr: 1 }}>
                                <DescriptionIcon sx={{ fontSize: 25, color: 'grey' }} />
                            </IconButton>
                            <Typography>My Orders</Typography>
                        </Box>
                    </Link>
                    <Link to="/transaction" style={{ textDecoration: 'none', color: 'black' }}>
                        <Box display="flex" alignItems="center">
                            <IconButton color="inherit" sx={{ mr: 1 }}>
                                <SellIcon sx={{ fontSize: 25, color: 'grey' }} />
                            </IconButton>
                            <Typography>My Transactions</Typography>
                        </Box>
                    </Link>
                    <Link to="/cart" style={{ textDecoration: 'none', color: 'black' }}>
                        <Box display="flex" alignItems="center">
                            <IconButton color="inherit" sx={{ mr: 1 }}>
                                <ShoppingCartIcon sx={{ fontSize: 25, color: 'grey' }} />
                            </IconButton>
                            <Typography>My Cart</Typography>
                        </Box>
                    </Link>
                </Stack>
            </Grid>
        </Grid>
    );
}

