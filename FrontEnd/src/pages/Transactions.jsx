import Navbar from '../components/Navbar'
import Container from '@mui/material/Container'
import SideBar from '../components/SideBar'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import '../App.css' /*<---- custom css*/


export default function MyProducts() {
    return (
        <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
            <Grid container sx={{ paddingTop: 1, paddingBottom: 1 }}>
                <Navbar />
            </Grid>
            <Grid container direction="row" spacing={3} wrap="nowrap" sx={{ height: '100%' }} className="padding-color-outer">
                <Grid md={4}>
                    <SideBar 
                        state={{
                            userData: location.state ? location.state.userData : null
                        }}
                    />
                </Grid>
                <Grid item md={8} container direction="column" sx={{ width: '100%', backgroundColor: 'white', padding: 4 }}>
                <Grid >
                    <Typography variant="h4">Transactions</Typography>
                    <Divider sx={{ borderBottomWidth: 2, borderColor: 'black', margin: '20px 0' }} />
                </Grid> 
                <Grid container justifyContent="space-around"
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                        <Typography marginLeft={'10rem'}>Product Name</Typography>
                        <Typography>Quantity</Typography>
                        <Typography>Name of Buyer</Typography>
                        <Typography>Total</Typography>
                    </Grid>
                    <Grid item container spacing={2}
                        sx={{
                            display: 'flex',
                            height: '450px',
                            maxHeight: '450px',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            border: '2px solid black',
                            padding: '1rem',
                            width: '100%',
                        }}>
                        {/* Products here */}
                        <Grid container direction="column" width={'100%'} height={'auto'} sx={{padding: '.5rem', border: '2px solid black' }}>
                            <Grid container direction="row" alignItems="center">
                                <Grid item>
                                    <img width="120px" src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="product image" />
                                </Grid>
                                <Grid item container sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 1rem', width: '80%' }}>
                                    <Typography>T-shirt</Typography>
                                    <Typography>2px</Typography>
                                    <Typography>Ehrica Jynne Espada</Typography>
                                    <Typography>P 245.50</Typography>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ marginLeft: 'auto'}}>
                                <Button variant="contained" color="success">COMPLETE</Button> &nbsp;
                                <Button variant="contained">CANCEL</Button>
                            </Grid>
                        </Grid>
                        <Grid container direction="column" width={'100%'} height={'auto'} sx={{padding: '.5rem', border: '2px solid black' }}>
                            <Grid container direction="row" alignItems="center">
                                <Grid item>
                                    <img width="120px" src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="product image" />
                                </Grid>
                                <Grid item container sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 1rem', width: '80%' }}>
                                    <Typography>T-shirt</Typography>
                                    <Typography>2px</Typography>
                                    <Typography>Ehrica Jynne Espada</Typography>
                                    <Typography>P 245.50</Typography>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ marginLeft: 'auto'}}>
                                <Button variant="contained" color="success">COMPLETE</Button> &nbsp;
                                <Button variant="contained">CANCEL</Button>
                            </Grid>
                        </Grid>
                        <Grid container direction="column" width={'100%'} height={'auto'} sx={{padding: '.5rem', border: '2px solid black' }}>
                            <Grid container direction="row" alignItems="center">
                                <Grid item>
                                    <img width="120px" src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="product image" />
                                </Grid>
                                <Grid item container sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 1rem', width: '80%' }}>
                                    <Typography>T-shirt</Typography>
                                    <Typography>2px</Typography>
                                    <Typography>Ehrica Jynne Espada</Typography>
                                    <Typography>P 245.50</Typography>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ marginLeft: 'auto'}}>
                                <Button variant="contained" color="success">COMPLETE</Button> &nbsp;
                                <Button variant="contained">CANCEL</Button>
                            </Grid>
                        </Grid>
                        <Grid container direction="column" width={'100%'} height={'auto'} sx={{padding: '.5rem', border: '2px solid black' }}>
                            <Grid container direction="row" alignItems="center">
                                <Grid item>
                                    <img width="120px" src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="product image" />
                                </Grid>
                                <Grid item container sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 1rem', width: '80%' }}>
                                    <Typography>T-shirt</Typography>
                                    <Typography>2px</Typography>
                                    <Typography>Ehrica Jynne Espada</Typography>
                                    <Typography>P 245.50</Typography>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ marginLeft: 'auto'}}>
                                <Button variant="contained" color="success">COMPLETE</Button> &nbsp;
                                <Button variant="contained">CANCEL</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
