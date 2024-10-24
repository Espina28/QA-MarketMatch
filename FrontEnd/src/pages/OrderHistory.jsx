import Navbar from '../components/Navbar'
import Container from '@mui/material/Container'
import SideBar from '../components/SideBar'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import '../App.css' /*<---- custom css*/

export default function OrderHistory(){
    return (
        <Container maxWidth={false} disableGutters  sx={{height: '100vh'}} >
            <Grid sx={{paddingTop: 1, paddingBottom: 1}}>
                <Navbar />
            </Grid>
            <Grid className="padding-color-outer" container direction={'row'}  spacing={3} wrap='nowrap' sx={{height: '90%'}}>
                <Grid size={{md: 4}}  sx={{maxWidth: '100%', border: '2px solid black'}}>
                    <SideBar/>
                </Grid>
                <Grid size={{md: 8}} container direction={'column'} sx={{backgroundColor: 'white', padding: 4}}>
                    <Grid>
                        <Typography variant='h4'>Order History</Typography>
                        <Divider sx={{ borderBottomWidth: 2, borderColor: 'black', margin: '20px 0' }} />
                    </Grid>
                    <Grid container sx={{marginTop: 4}}>
                        <Grid size={{}}>
                            
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>  
        </Container>
    )
}