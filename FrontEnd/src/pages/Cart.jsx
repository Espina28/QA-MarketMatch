import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Button, Select, MenuItem } from '@mui/material';
import SideBar from '../components/SideBar';
import '../App.css';
import axios from 'axios';
import Navbar from '../components/Navbar';

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

    const handleBuy = (product) => {
        console.log(product.productId);
        if (product) {
            const payload = {
                quantity: product.quantity || 1, // Use product quantity or default to 1
                orderDate: new Date().toISOString(),
                total: parseFloat(product.productPrice) * (product.quantity || 1),
                buyer: {
                    buyerId: localStorage.getItem("id"),
                },
                product: {
                    productId: product.productId,
                },
            };

            axios.post('http://localhost:8080/api/buy/create', payload, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
        setCartItems(cartItems.map(item => {
            if (item.productId === productId) {
                item.quantity = newQuantity;
            }
            return item;
        }));
    };

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => {
            const itemPrice = parseFloat(item.productPrice) || 0;
            const itemQuantity = item.quantity || 1;
            const itemTotal = itemPrice * itemQuantity;
            return sum + itemTotal;
        }, 0);
        setTotalCartPrice(total.toFixed(2));
    }, [cartItems]);

    return (
        <Container maxWidth={false} disableGutters sx={{ height: '90vh' }}>
            <Navbar />
            <Grid container sx={{ height: '100%' }} className="padding-color-outer">
                <Grid item md={2.61} sx={{ border: '2px solid black', marginRight: 5.94 }}>
                    <SideBar />
                </Grid>
                <Grid item md={7.573} sx={{ backgroundColor: 'white', padding: 4, overflowY: 'auto' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', borderBottom: '2px solid black', marginBottom: 3 }}>
                        MY PURCHASE
                    </Typography>
                    {cartItems.length > 0 ? (
                        cartItems.map((product) => (
                            <CartItem 
                                key={product.productId} 
                                product={product} 
                                onRemoveFromCart={handleRemoveFromCart} 
                                onQuantityChange={handleQuantityChange}
                                onBuy={() => handleBuy(product)} // Pass handleBuy as a prop
                            />
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ marginTop: 2 }}>Your cart is empty.</Typography>
                    )}
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 3 }}>
                        Total Price: ${totalCartPrice}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

const CartItem = ({ product, onRemoveFromCart, onQuantityChange, onBuy }) => {
    const [quantity, setQuantity] = useState(product.quantity || 1);
    const imageUrl = product.image ? `data:image/jpeg;base64,${product.image}` : '';

    const handleQuantityChange = (e) => {
        const newQuantity = Math.max(1, parseInt(e.target.value, 10));
        setQuantity(newQuantity);
        onQuantityChange(product.productId, newQuantity);
    };

    const totalPrice = (parseFloat(product.productPrice) * quantity).toFixed(2);

    return (
        <Grid container sx={{ border: '1px solid black', borderRadius: 1, padding: 2, marginBottom: 2, position: 'relative' }}>
            <Typography variant="body2" sx={{ position: 'absolute', top: 8, right: 8, fontSize: '0.8rem', color: 'gray' }}>
                {product.dateAdded}
            </Typography>
            <Grid item xs={12} md={2}>
                <Box
                    component="img"
                    src={imageUrl}
                    alt={product.productName}
                    sx={{ width: '80%', height: 'auto', borderRadius: 1 }}
                />
            </Grid>
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
            <Grid item xs={12} md={3}>
                <Typography variant="body2">Total: ${totalPrice}</Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', bottom: '10px', right: '10px' }}>
                <Button variant="contained" color="primary" onClick={onBuy} sx={{ backgroundColor: 'black', color: 'white', marginRight: 1 }}>BUY NOW</Button>
                <Button variant="contained" color="error" onClick={() => onRemoveFromCart(product.productId)}>
                    REMOVE
                </Button>
            </Grid>
        </Grid>
    );
};

export default Cart;
