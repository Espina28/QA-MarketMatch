import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person2Icon from '@mui/icons-material/Person2';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DescriptionIcon from '@mui/icons-material/Description';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CreateIcon from '@mui/icons-material/Create';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function SideBar() {
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
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
            //console.log(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the user data!', error);
          });
      }, []);
    return (
        <Grid container justifyContent={'center'} sx={{ background: 'white', paddingTop: '4rem', paddingRight: '2rem', paddingLeft: '2rem', height: '100%' }} >
            <Grid container direction={'column'} >
                <Grid container direction={'row'}>
                    {/* Replace this with correct image of user */}
                    <Grid>
                        <IconButton color="inherit">
                            <AccountCircleIcon sx={{ margin: 0, fontSize: 60, color: 'grey' }} />
                        </IconButton>
                    </Grid>
                    <Grid container direction={'column'}>
                        <Grid sx={{ marginTop: 2 }}>
                            <Typography variant='h6'>{userData.firstname} {userData.lastname}</Typography>
                        </Grid>
                        <Grid container direction={'row'} justifyContent={'start'}> 
                            <IconButton color="inherit" sx={{ paddingTop: 0 }}>
                                <CreateIcon sx={{ fontSize: 20, color: 'grey'}} />
                            </IconButton>
                            <Link to="/my-account" sx={{ textDecoration: 'none', color: 'black' }}>
                                <Typography alignContent={'start'}>Edit Profile</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider sx={{ margin: '1rem 0' }} />
                
                {/* Sidebar links */}
                <Grid>
                    <Stack direction={'column'} spacing={2} justifySelf={'center'}>
                        <Grid container direction={'row'}>
                            <IconButton color="inherit" sx={{ paddingTop: 0 }}>
                                <ShoppingCartIcon sx={{ fontSize: 25, color: 'grey'}} />
                            </IconButton>
                            <Link to="/myProducts" sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                                <Typography sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                                    My Products
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid container direction={'row'}>
                            <IconButton color="inherit" sx={{ paddingTop: 0 }}>
                                <DescriptionIcon sx={{ fontSize: 25, color: 'grey'}} />
                            </IconButton>
                            <Link to="/orders" sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                                <Typography sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                                    My Orders
                                </Typography>
                            </Link>
                        </Grid>

                        <Grid container direction={'row'}>
                            <IconButton color="inherit" sx={{ paddingTop: 0 }}>
                                <SellIcon sx={{ fontSize: 25, color: 'grey'}} />
                            </IconButton>
                            <Link to="/transaction" sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                                <Typography sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                                    My Transactions
                                </Typography>
                            </Link>
                        </Grid>

                        <Grid container direction={'row'}>
                            <IconButton color="inherit" sx={{ paddingTop: 0 }}>
                                <SellIcon sx={{ fontSize: 25, color: 'grey'}} />
                            </IconButton>
                            <Link to="/cart" sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                                <Typography sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                                    My Cart
                                </Typography>
                            </Link>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    );
}
