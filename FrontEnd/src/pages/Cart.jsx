import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Button, Select, MenuItem } from '@mui/material';
import SideBar from '../components/SideBar';
import '../App.css';
import axios from 'axios';
import Navbar from '../components/Navbar';

const CartItem = ({ product, onRemoveFromCart, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(product.quantity || 1); // Initialize with product's quantity
    const imageUrl = product.image ? `data:image/jpeg;base64,${product.image}` : '';

    const handleQuantityChange = (e) => {
        const newQuantity = Math.max(1, parseInt(e.target.value, 10)); // Ensure minimum quantity is 1
        setQuantity(newQuantity);
        onQuantityChange(product.productId, newQuantity); // Notify parent of the change
    };

    const totalPrice = (parseFloat(product.productPrice) * quantity).toFixed(2); // This is the total price for the individual item based on its quantity

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
                    src={imageUrl} // Display product's image or fallback
                    alt={product.productName}
                    sx={{ width: '80%', height: 'auto', borderRadius: 1 }}
                />
            </Grid>

            {/* Product Details */}
            <Grid item xs={12} md={4} sx={{ paddingLeft: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{product.productName}</Typography>
                <Typography variant="body2">Price: ${parseFloat(product.productPrice).toFixed(2)}</Typography>
                <Select
                    value={quantity}
                    onChange={handleQuantityChange}
                    sx={{ minWidth: '40px', height: '30px', fontSize: '0.75rem' }}
                >
                    {[1, 2, 3, 4, 5].map(num => (
                        <MenuItem key={num} value={num}>{num}</MenuItem>
                    ))}
                </Select>
            </Grid>

            {/* Total Price */}
            <Grid item xs={12} md={3}>
                <Typography variant="body2">Total: ${totalPrice}</Typography>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', bottom: '10px', right: '10px' }}>
                <Button variant="contained" color="primary" sx={{ backgroundColor: 'black', color: 'white', marginRight: 1 }}>BUY NOW</Button>
                <Button variant="contained" color="error" onClick={() => onRemoveFromCart(product.productId)}>
                    REMOVE
                </Button>
            </Grid>
        </Grid>
    );
};

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const cartid = localStorage.getItem("id");

    useEffect(() => {
        axios.get('http://localhost:8080/api/cart/getCart/' + cartid, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        })
        .then(response => {
            setCartItems(response.data.products); // Update state with the entire response data
        })
        .catch(error => {
            console.error('There was an error fetching the cart!', error);
        });
    }, [cartid]);

    const handleRemoveFromCart = (productId) => {
        const token = localStorage.getItem('token');
        
        axios.delete(`http://localhost:8080/api/cart/${cartid}/product/${productId}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            },
        })
        .then(() => {
            setCartItems(cartItems.filter(item => item.productId !== productId));
        })
        .catch(error => {
            console.error('There was an error removing the product from the cart!', error);
        });
    };

    const handleQuantityChange = (productId, newQuantity) => {
        // Update the quantity of the specific product in the cartItems array
        setCartItems(cartItems.map(item => {
            if (item.productId === productId) {
                item.quantity = newQuantity; // Update the quantity of the item
            }
            return item;
        }));
    };

    useEffect(() => {
        // Recalculate total price based on quantity and price for each item
        const total = cartItems.reduce((sum, item) => {
            const itemPrice = parseFloat(item.productPrice) || 0; // Ensure price is a valid number
            const itemQuantity = item.quantity || 1; // Default to 1 if quantity is not available
            const itemTotal = itemPrice * itemQuantity;
            return sum + itemTotal;
        }, 0);
        setTotalCartPrice(total.toFixed(2)); // Update the total cart price
    }, [cartItems]); // Only recalculate totalCartPrice when cartItems change

    return (
        <Container maxWidth={false} disableGutters sx={{ height: '90vh' }}>
            <Navbar />
            <Grid container sx={{ height: '100%' }} className="padding-color-outer">
                <Grid item md={2.61} sx={{ border: '2px solid black', marginRight: 5.94 }}>
                    <SideBar />
                </Grid>
                <Grid
                    item
                    md={7.573}
                    className="scrollable-cart"
                    sx={{
                        backgroundColor: 'white',
                        padding: 4,
                        overflowY: 'auto',
                        maxHeight: '770px', // Set the height of the scrollable cart
                        border: '2px solid black',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            borderBottom: '2px solid black',
                            marginBottom: 3,
                        }}
                    >
                        MY PURCHASE
                    </Typography>
                    {cartItems.length > 0 ? (
                        cartItems.map((product) => (
                            <CartItem 
                                key={product.productId} 
                                product={product} 
                                onRemoveFromCart={handleRemoveFromCart} 
                                onQuantityChange={handleQuantityChange}
                            />
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ marginTop: 2 }}>
                            Your cart is empty.
                        </Typography>
                    )}
                    {/* Total Price for the Cart */}
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 3 }}>
                        Total Price: ${totalCartPrice}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;
