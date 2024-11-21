import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Container from '@mui/material/Container';
import SideBar from '../components/SideBar';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import '../App.css';
import axios from 'axios';

export default function MyProducts() {
    const [products, setProducts] = useState([]);
    const sellerId = localStorage.getItem('id'); // Assuming sellerId is stored in localStorage

    useEffect(() => {
        // Fetch products for the seller
        axios
            .get(`http://localhost:8080/api/seller/getAll/${sellerId}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then((response) => {
                setProducts(response.data.products || []); // Ensure 'products' is handled properly
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, [sellerId]);

    const handleEdit = (productId) => {
        // Handle editing logic (e.g., navigate to an edit page or show a modal)
        console.log('Edit product:', productId);
    };

    return (
        <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
            {/* Navbar */}
            <Grid sx={{ paddingTop: 1, paddingBottom: 1 }}>
                <Navbar />
            </Grid>

            {/* Main Grid */}
            <Grid
                className="padding-color-outer"
                container
                direction={'row'}
                spacing={3}
                wrap="nowrap"
                sx={{ height: '100%' }}
            >
                {/* Sidebar */}
                <Grid size={{ md: 4 }}>
                    <SideBar
                        state={{
                            userData: location.state ? location.state.userData : null,
                        }}
                    />
                </Grid>

                {/* Products Section */}
                <Grid
                    size={{ md: 8 }}
                    container
                    direction={'column'}
                    sx={{ width: 'auto', backgroundColor: 'white', padding: 4 }}
                >
                    {/* Section Title */}
                    <Grid>
                        <Typography variant="h4">My Products</Typography>
                        <Divider
                            sx={{
                                borderBottomWidth: 2,
                                borderColor: 'black',
                                margin: '20px 0',
                            }}
                        />
                    </Grid>

                    {/* Products List */}
                    <Grid
                        container
                        sx={{
                            marginTop: 0,
                            maxHeight: '450px',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            border: '2px solid black',
                            padding: '1rem',
                            width: '60vw',
                        }}
                    >
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Grid
                                container
                                key={product.productId}
                                sx={{
                                    border: '1px solid black',
                                    borderRadius: 2,
                                    padding: 2,
                                    marginBottom: 2,
                                    backgroundColor: '#f9f9f9',
                                    position: 'relative',  // Ensure buttons are positioned absolutely
                                    width: '100%',
                                    maxWidth: '800px', // Optional: limit the item box width
                                }}
                            >
                                {/* Product Image */}
                                <Grid
                                    item
                                    xs={12}
                                    md={2}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={
                                            product.image
                                                ? `data:image/jpeg;base64,${product.image}`
                                                : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                                        }
                                        alt={product.productName}
                                        sx={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                            borderRadius: 1,
                                        }}
                                    />
                                </Grid>

                                {/* Product Details */}
                                <Grid
                                    item
                                    xs={12}
                                    md={7}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        paddingLeft: 2,
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                        {product.productName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                        Price: ${parseFloat(product.productPrice).toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'gray' }}>
                                    Status: {product.productStatus === 'Available' ? 'Available' : 'No Stock'}
                                    </Typography>
                                </Grid>

                                {/* Action Buttons */}
                                <Grid
                                    item
                                    xs={12}
                                    md={3}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',  // Position the buttons at the bottom
                                        alignItems: 'flex-end',
                                        position: 'absolute',
                                        bottom: 10,
                                        right: 10,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            marginBottom: 1,
                                            width: '100px',
                                        }}
                                        onClick={() => handleEdit(product.productId)}
                                    >
                                        EDIT
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            width: '100px',
                                        }}
                                        onClick={() => handleDelete(product.productId)}  // Add handleDelete function
                                    >
                                        DELETE
                                    </Button>
                                </Grid>
                            </Grid>
                        ))
                    ) : (
                        <Typography sx={{ padding: 2 }}>No products found.</Typography>
                    )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
