import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Button, Select, MenuItem } from '@mui/material';
import SideBar from '../components/SideBar';
import '../App.css';
import axios from 'axios';

const CartItem = ({ product, onRemoveFromCart }) => {
    const [quantity, setQuantity] = useState(1);

    return (
        <Grid container sx={{ border: '1px solid black', borderRadius: 1, padding: 2, marginBottom: 2, position: 'relative' }}>
            {/* Date Added at Top Right */}
            <Typography
                variant="body2"
                sx={{ position: 'absolute', top: 8, right: 8, fontSize: '0.8rem', color: 'gray' }}
            >
                {product.dateAdded}
            </Typography>

            <Grid item xs={12} md={2}>
                <Box
                    component="img"
                    src="/images/t1.jpg"
                    alt={product.productName}
                    sx={{ width: '80%', height: 'auto', borderRadius: 1 }}
                />
            </Grid>
            <Grid item xs={12} md={4} sx={{ paddingLeft: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{product.productName}</Typography>
                <Typography variant="body2">Price: ${product.productPrice.toFixed(2)}</Typography>
                <Select
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                    sx={{ minWidth: '40px', height: '30px', fontSize: '0.75rem' }}
                >
                    {[1, 2, 3, 4, 5].map(num => <MenuItem key={num} value={num}>{num}</MenuItem>)}
                </Select>
            </Grid>
            <Grid item xs={12} md={3}>
                <Typography variant="body2">Total: ${(product.productPrice * quantity).toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', bottom: '10px', right: '10px' }}>
                <Button variant="contained" color="primary" onClick={() => onRemoveFromCart(product.id)} sx={{ backgroundColor: 'black', color: 'white' }}>BUY NOW</Button>
            </Grid>
        </Grid>
    );
};

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/cart/getCart/')
            .then(response => {
                setCartItems(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the cart!', error);
            });
    }, []);

    const handleRemoveFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    return (
        <Container maxWidth={false} disableGutters sx={{ height: '90vh' }}>
            <Grid container sx={{ height: '100%' }} className="padding-color-outer">
                <Grid item md={2.61} sx={{ border: '2px solid black', marginRight: 5.94 }}>
                    <SideBar />
                </Grid>
                <Grid item md={7.573} sx={{ backgroundColor: 'white', padding: 4, overflowY: 'auto' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', borderBottom: '2px solid black', marginBottom: 3 }}>MY PURCHASE</Typography>
                    {cartItems.map(product => (
                        <CartItem key={product.id} product={product} onRemoveFromCart={handleRemoveFromCart} />
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;
