import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Button, Divider, Paper } from '@mui/material';
import SideBar from '../components/SideBar';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Orders() {
    const [products, setProducts] = useState(null);
    const location = useLocation();
    const [userData, setUserData] = useState();

    useEffect(() => {
        if (location.state && location.state.userData) {
            setUserData(location.state.userData);
        }
    }, [location]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/buy/purchase', {
            params: {
                id: localStorage.getItem('id'),
            },
            withCredentials: true,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <Container maxWidth={false} disableGutters sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Box sx={{ flexGrow: 1, display: 'flex', padding: 4 }} className="padding-color-outer">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3} lg={2.5}>
                        <SideBar />
                    </Grid>
                    <Grid item xs={12} md={9} lg={9.5}>
                        <Paper elevation={3} sx={{ padding: 4 }}>
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>My Orders</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', p: 2 }}>
                                {products ? products.map((product, index) => (
                                    <OrderCard key={index} product={product} />
                                )) : <Typography>No products found.</Typography>}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

function OrderCard({ product }) {
    return (
        <Paper elevation={2} sx={{ p: 2, mb: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
            <Box sx={{ width: { xs: '100%', sm: '200px' }, mb: { xs: 2, sm: 0 }, mr: { sm: 3 } }}>
                {product.product.image ? (
                    <img
                        style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '4px' }}
                        src={`data:image/jpeg;base64,${product.product.image}`}
                        alt="product"
                    />
                ) : (
                    <img
                        style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '4px' }}
                        src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                        alt="placeholder"
                    />
                )}
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h6" gutterBottom>{product.product.productName}</Typography>
                    <Typography variant="body2" gutterBottom>{product.product.productDescription}</Typography>
                    <Typography variant="h6" gutterBottom>Quantity: 2x</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="body2">Order Date: 12/12/2020</Typography>
                    <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        sx={{
                            background: "rgba(112, 5, 5, 1)",
                            "&:hover": {
                                background: "rgba(140, 10, 10, 1)",
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
