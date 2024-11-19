import Navbar from '../components/Navbar'
import Container from '@mui/material/Container'
import SideBar from '../components/SideBar'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import '../App.css' /*<---- custom css*/

export default function MyProducts(){
    return (
        <Container maxWidth={false} disableGutters  sx={{height: '100vh'}} >
            <Grid sx={{paddingTop: 1, paddingBottom: 1}}>
                <Navbar/>
            </Grid>
            <Grid className="padding-color-outer" container direction={'row'}  spacing={3} wrap='nowrap' sx={{height: '100%'}}>
                <Grid size={{md: 3}}>
                <SideBar 
                    state={{ 
                    userData: location.state ? location.state.userData : null
                    }} 
                />
                </Grid>
                <Grid size={{md: 9}} container direction={'column'} sx={{width: 'auto', backgroundColor: 'white', padding: 4}}>
                    <Grid>
                        <Typography variant='h4'>My Products</Typography>
                        <Divider sx={{ borderBottomWidth: 2, borderColor: 'black', margin: '20px 0' }} />
                    </Grid>
                    <Grid container sx={{marginTop: 0}}>
                    <Grid className="" spacing={2}
                        sx={{
                            maxHeight: '450px',  // Set the maximum height as needed
                            overflowY: 'auto',   // Enable vertical scrolling
                            overflowX: 'hidden', // Prevent horizontal scrolling (optional)
                            border: '2px solid black',
                            padding: '1rem',
                            width: '60vw'
                        }}>
                        {/* Your content goes here */}
                        
                        <Grid container alignItems="center" spacing={2} direction={'row'} sx={{width: 'auto', border: '1px solid grey', padding: '.5rem'}}>
                                <Grid size={{md: 3}}>

                                    <img width ='120px' src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="product image"/>
                                </Grid>
                                <Grid size={{md: 6,}} justifyContent={'space-evenly'} container direction={'row'}>
                                    <Typography variant="h6">Product Name</Typography>
                                    <Typography variant="h6">Active </Typography>
                                </Grid>
                                <Grid size={{md: 3}}>
                                    <Typography>Time Created:  12/12/2020</Typography>
                                </Grid>
                        </Grid>
                       
                        
                        
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>  
        </Container>
    )
}