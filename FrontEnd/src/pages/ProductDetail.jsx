import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Custom CSS

export default function ProductLayout() {
    const [products, setProducts] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the current product details
        axios.get(`http://localhost:8080/api/user/getProducts/${productId}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
        })
        .then(response => {
            setProducts(response.data);
            fetchRelatedProducts(response.data.productName);
        })
        .catch(error => {
            console.error('There was an error fetching the product!', error);
        });
    }, [productId]);

    const fetchRelatedProducts = (productName) => {
        // Fetch related or random products
        axios.get(`http://localhost:8080/api/user/related?productName=${productName}&productId=${productId}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
        })
        .then(response => {
            setRelatedProducts(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching related products!', error);
        });
    };

    const handleAddToCart = () => {
        if (products) {
            const cartId = sessionStorage.getItem("id");
            axios.post(`http://localhost:8080/api/cart/addProduct/${cartId}/${productId}`, {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                },
            })
            .then(response => {
                console.log(response.data);
                alert("Product added to cart successfully!");
            })
            .catch(error => {
                console.error("Error adding product to cart", error);
            });
        } else {
            console.log("Products data is not yet available. Please try again.");
        }
    };

    const handleBuy = () => {
        if (products) {
            const payload = {
                quantity: 1, 
                orderDate: new Date().toISOString(), 
                total: parseFloat(products.productPrice),
                buyer: {
                    buyerId: sessionStorage.getItem("id"), 
                },
                product: {
                    productId: productId, 
                },
            };

            axios.post('http://localhost:8080/api/buy/create', payload, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                },
            })
            .then(response => {
                console.log("Purchase successful:", response.data);
                alert("Purchase successful!");
            })
            .catch(error => {
                console.error("Error during purchase:", error);
                alert("Failed to complete the purchase. Please try again.");
            });
        } else {
            console.log("Product data is not available yet. Please wait.");
        }
    };

    return (
        <Container maxWidth={false} disableGutters sx={{ minHeight: '100vh', padding: 0 }}>
            <Navbar />
            <Grid container direction="row" wrap="nowrap" sx={{ height: '100%', backgroundColor: '#7D0C0E', padding: 2 }}>
                <Grid item xs={12} sx={{ 
                    backgroundColor: 'white', 
                    padding: 4, 
                    borderRadius: '8px', 
                    height: '100%', 
                    width: '100%',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            {/* Product Image */}
                            {products.image ? (
                                <Box sx={{
                                    width: '100%',
                                    paddingTop: '75%',
                                    position: 'relative',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                }}>
                                    <img 
                                        src={`data:image/jpeg;base64,${products.image}`} 
                                        alt={products.productName} 
                                        style={{ 
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }} 
                                    />
                                </Box>
                            ) : (
                                <Box sx={{
                                    width: '100%',
                                    paddingTop: '75%',
                                    position: 'relative',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                }}>
                                    <img 
                                        src='/placeholder.svg' 
                                        alt="Placeholder" 
                                        style={{ 
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }} 
                                    />
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>{products.productName}</Typography>
                                <Typography variant="h5" sx={{ color: '#7D0C0E', fontWeight: 'bold', marginBottom: 2 }}>
                                    P{products.productPrice}
                                </Typography>
                                <Divider sx={{ margin: '20px 0', borderColor: '#e0e0e0' }} />
                                <Typography variant="body1" paragraph sx={{ marginBottom: 4 }}>
                                    {products.productDescription}
                                </Typography>
                            </div>
                            <div>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button fullWidth variant="contained" onClick={handleBuy} sx={{ 
                                            backgroundColor: 'black', 
                                            color: 'white', 
                                            padding: '15px', 
                                            '&:hover': { backgroundColor: '#333' }
                                        }}>Buy Now</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button fullWidth variant="outlined" onClick={handleAddToCart} sx={{ 
                                            padding: '15px', 
                                            borderColor: 'black',
                                            color: 'black',
                                            '&:hover': { backgroundColor: '#f5f5f5' }
                                        }}>Add to Cart</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>

                    <Box sx={{ marginTop: 4 }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>You might also like</Typography>
                        <Grid container spacing={2}>
                            {relatedProducts.length > 0 ? (
                                relatedProducts.map(product => (
                                    <Grid item xs={6} sm={3} key={product.productId}>
                                        <Card
                                            onClick={() => navigate(`/${product.productName}/${product.productId}`)}
                                            sx={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                                },
                                            }}
                                        >
                                            <CardMedia
                                                component="div"
                                                sx={{
                                                    paddingTop: '100%',
                                                    backgroundImage: product.image ? `url(data:image/jpeg;base64,${product.image})` : 'none',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            />
                                            <CardContent
                                                sx={{
                                                    flexGrow: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <Typography variant="subtitle2">{product.productName}</Typography>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        color: '#7D0C0E',
                                                        fontWeight: 'bold',
                                                        marginTop: 1,
                                                    }}
                                                >
                                                    P{product.productPrice}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Typography variant="body2" align="center">No related products available</Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

