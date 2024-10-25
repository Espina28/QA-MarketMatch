import React from 'react';
import Navbar from '../components/Navbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '../App.css'; // Custom CSS

export default function ProductLayout() {
    return (
        <Container maxWidth={false} disableGutters sx={{ height: '100vh', padding: 0 }}>


            {/* Main Content */}
            <Grid container direction="row" wrap="nowrap" sx={{ height: '90%', backgroundColor: '#7D0C0E', padding: 2 }}>
                <Grid item md={1} sx={{ backgroundColor: 'white', padding: 4, borderRadius: '8px' }}>
                    <Grid container spacing={2}>
                        {/* Product Image */}
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '300px',
                                    backgroundColor: '#E0E0E0',
                                    border: '1px solid #00BFFF',
                                    borderRadius: '8px',
                                }}
                            />
                        </Grid>

                        {/* Product Details */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Name of Product</Typography>
                            <Typography variant="h5" sx={{ color: '#7D0C0E', fontWeight: 'bold', marginTop: 2 }}>
                                PRICE
                            </Typography>
                            <Divider sx={{ margin: '10px 0', borderColor: 'black' }} />
                            <Typography variant="body1" paragraph>
                                Product Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                            </Typography>

                            {/* Action Buttons */}
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}>Buy Now</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined">Add to Cart</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="error">Report</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" sx={{ backgroundColor: '#00BFFF', color: 'white' }}>Share</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Similar Products */}
                    <Grid container spacing={2} sx={{ marginTop: 4 }}>
                        <Grid item xs={6} md={3}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100px',
                                    backgroundColor: '#E0E0E0',
                                    border: '1px solid #7D0C0E',
                                    borderRadius: '8px',
                                }}
                            />
                            <Typography variant="body2" align="center">PRODUCT NAME</Typography>
                            <Typography variant="h6" align="center" sx={{ color: '#7D0C0E', fontWeight: 'bold' }}>
                                PRICE
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100px',
                                    backgroundColor: '#E0E0E0',
                                    border: '1px solid #7D0C0E',
                                    borderRadius: '8px',
                                }}
                            />
                            <Typography variant="body2" align="center">PRODUCT NAME</Typography>
                            <Typography variant="h6" align="center" sx={{ color: '#7D0C0E', fontWeight: 'bold' }}>
                                PRICE
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
