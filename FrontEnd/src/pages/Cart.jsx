import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Button, Select, MenuItem } from '@mui/material';
import SideBar from '../components/SideBar';
import '../App.css';
import axios from 'axios';

const CartItem = ({ product, onRemoveFromCart }) => {
    const [quantity, setQuantity] = useState(product.quantity || 1); // Initialize with product's quantity

    return (
        <Grid container sx={{ border: '1px solid black', borderRadius: 1, padding: 2, marginBottom: 2, position: 'relative' }}>
            {/* Date Added at Top Right */}
            <Typography
                variant="body2"
                sx={{ position: 'absolute', top: 8, right: 8, fontSize: '0.8rem', color: 'gray' }}
            >
                {product.dateAdded}
            </Typography>

            {/* Product Image */}
            <Grid item xs={12} md={2}>
                <Box
                    component="img"
                    src={product.image || '/images/t1.jpg'} // Display product's image or fallback
                    alt={product.productName}
                    sx={{ width: '80%', height: 'auto', borderRadius: 1 }}
                />
            </Grid>

            {/* Product Details */}
            <Grid item xs={12} md={4} sx={{ paddingLeft: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{product.productName}</Typography>
                <Typography variant="body2">Price: ${product.productPrice?.toFixed(2)}</Typography>
                <Select
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                    sx={{ minWidth: '40px', height: '30px', fontSize: '0.75rem' }}
                >
                    {[1, 2, 3, 4, 5].map(num => (
                        <MenuItem key={num} value={num}>{num}</MenuItem>
                    ))}
                </Select>
            </Grid>

            {/* Total Price */}
            <Grid item xs={12} md={3}>
                <Typography variant="body2">Total: ${(product.productPrice * quantity).toFixed(2)}</Typography>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', bottom: '10px', right: '10px' }}>
                <Button variant="contained" color="primary" sx={{ backgroundColor: 'black', color: 'white', marginRight: 1 }}>BUY NOW</Button>
                <Button variant="contained" color="error" onClick={() => onRemoveFromCart(product.id)}>
                    REMOVE
                </Button>
            </Grid>
        </Grid>
    );
};

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/cart/getCart') // Adjust endpoint as needed
            .then(response => {
                setCartItems(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the cart!', error);
            });
    }, []);

    const handleRemoveFromCart = (productId) => {
        axios.delete(`http://localhost:8080/api/cart/removeFromCart/${productId}`)
            .then(() => {
                setCartItems(cartItems.filter(item => item.id !== productId)); // Update state
            })
            .catch(error => {
                console.error('There was an error removing the product from the cart!', error);
            });
    };

    return (
        <Container maxWidth={false} disableGutters sx={{ height: '90vh' }}>
            <Grid container sx={{ height: '100%' }} className="padding-color-outer">
                <Grid item md={2.61} sx={{ border: '2px solid black', marginRight: 5.94 }}>
                    <SideBar />
                </Grid>
                <Grid item md={7.573} sx={{ backgroundColor: 'white', padding: 4, overflowY: 'auto' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', borderBottom: '2px solid black', marginBottom: 3 }}>
                        MY PURCHASE
                    </Typography>
                    {cartItems.length > 0 ? (
                        cartItems.map(product => (
                            <CartItem key={product.id} product={product} onRemoveFromCart={handleRemoveFromCart} />
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ marginTop: 2 }}>Your cart is empty.</Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;
