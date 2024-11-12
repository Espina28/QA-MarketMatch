import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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

export default function SideBar() {

    const [userData, setUserData] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Safely check if location.state and location.state.userData are defined
        if (location.state && location.state.userData) {
        //   userData.current = location.state.userData;
        setUserData(location.state.userData)    
        }
      }, [location]);
    
      useEffect(() => {
        if (userData) {
          console.log('Updated userData:', userData); // This will log after the state is updated
        }
      }, [userData]);

    function navigateSidebar(pathname){
        switch(pathname){
            case '/myProducts':
                navigate('/myProducts', {state: { userData: userData || 'test test' }})
                break;
            case '/myOrder':
                navigate('/myOrder', {state: { userData: userData || 'test test' }})
                break;
            case '/myTransactons':
                navigate('/myProducts', {state: { userData: userData || 'test test' }})
                break;
            case '/cart':
                navigate('/cart', {state: { userData: userData || 'test test' }})
                break;
        }
    }

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
                            <Typography variant='h6'>{userData!=null?`${userData.firstname} ${userData.lastname}`:"Name Unavailable"}</Typography>
                        </Grid>
                        <Grid container direction={'row'} justifyContent={'start'}> 
                            <IconButton color="inherit" sx={{ paddingTop: 0 }}>
                                <CreateIcon sx={{ fontSize: 20, color: 'grey'}} />
                            </IconButton>
                            <Typography alignContent={'start'}>Edit Profile Photo</Typography>
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
                            <Typography
                                sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}
                                onClick={() => navigateSidebar("/myProducts")}
                            >
                                My Products
                            </Typography>
                        </Grid>
                        <Grid container direction={'row'}>
                            <IconButton color="inherit" sx={{ paddingTop: 0 }}>
                                <DescriptionIcon sx={{ fontSize: 25, color: 'grey'}} />
                            </IconButton>
                            <Typography sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer'  }}
                            onClick={()=> navigateSidebar("/myOrder")}
                            >My Orders</Typography>
                        </Grid>

                        <Grid container direction={'row'}>
                            <IconButton color="inherit" sx={{ paddingTop: 0 }}>
                                <SellIcon sx={{ fontSize: 25, color: 'grey'}} />
                            </IconButton>
                            <Typography to="/my-purchase" sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer'  }}
                            onClick={()=>{alert("NO UI AVAILABLE FOR THIS COMPONENT")}}
                            >Transaction</Typography>
                        </Grid>

                        <Grid container direction={'row'}>
                            <IconButton color="inherit" sx={{ paddingTop: 0 }}>
                                <SellIcon sx={{ fontSize: 25, color: 'grey'}} />
                            </IconButton>
                            <Typography sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer'  }}
                            onClick={()=> navigateSidebar("/cart")}
                            >Cart</Typography>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    );
}
