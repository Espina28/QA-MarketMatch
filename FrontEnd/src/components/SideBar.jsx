import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person2Icon from '@mui/icons-material/Person2';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DescriptionIcon from '@mui/icons-material/Description';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider'
import CreateIcon from '@mui/icons-material/Create';
import Grid from '@mui/material/Grid2'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

export default function SideBar(){
    return (
        <Grid container justifyContent={'center'} sx={{background: 'white', paddingTop: '4rem', paddingRight: '2rem', paddingLeft: '2rem', height: '100%' }} >
            <Grid container direction={'column'} >
                <Grid container direction={'row'}>
                    {/*replace this with correct image of user*/}
                    <Grid>
                        <IconButton color="inherit">
                            <AccountCircleIcon sx={{margin: 0, fontSize: 60, color: 'grey' }} />
                        </IconButton>
                    </Grid>
                    <Grid container direction={'column'}>
                        <Grid sx={{marginTop: 2}}>
                            <Typography variant='h6'>The Quick Brown Fox Jr.</Typography>
                        </Grid>
                        <Grid container direction={'row'} justifyContent={'start'}>
                            <IconButton color="inherit" sx={{ paddingTop: 0 }}>
                                <CreateIcon sx={{ fontSize: 20, color: 'grey'}} />
                            </IconButton>
                            <Typography alignContent={'start'}>Edit Profile</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider sx={{ margin: '1rem 0' }} />
                <Grid>
                    <Stack direction={'column'} spacing={2} justifySelf={'center'}>
                        <Grid container direction={'row'}>
                            <IconButton color="inherit" sx={{ paddingTop: 0 }}>
                                <Person2Icon sx={{ fontSize: 25, color: 'grey'}} />
                            </IconButton>
                            <Typography >My Account</Typography>
                        </Grid>
                        <Grid container direction={'row'}>
                            <IconButton color="inherit" sx={{ paddingTop: 0 }}>
                                <ShoppingCartIcon sx={{ fontSize: 25, color: 'grey'}} />
                            </IconButton>
                            <Typography >My Product Section</Typography>
                        </Grid>
                        <Grid container direction={'row'}>
                            <IconButton color="inherit" sx={{ paddingTop: 0 }}>
                                <DescriptionIcon sx={{ fontSize: 25, color: 'grey'}} />
                            </IconButton>
                            <Typography >My Order History</Typography>
                        </Grid>
                        <Grid container direction={'row'}>
                            <IconButton color="inherit" sx={{ paddingTop: 0 }}>
                                <SellIcon sx={{ fontSize: 25, color: 'grey'}} />
                            </IconButton>
                            <Typography >My Purchase</Typography>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    )
}