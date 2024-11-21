import Navbar from '../components/Navbar'
import Container from '@mui/material/Container'
import SideBar from '../components/SideBar'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import '../App.css' /*<---- custom css*/

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

import DeleteIcon from '@mui/icons-material/Delete';

import {useState, useEffect} from 'react'
import axios from "axios"
import { useLocation } from 'react-router-dom'

export default function Orders() {
    const [products, setProducts] = useState(null);
    const location = useLocation();
    const [userData, setUserData] = useState();
    const [open, setOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null); // For keeping track of the product to delete

    useEffect(() => {
        if (location.state && location.state.userData) {
            setUserData(location.state.userData);
        }
    }, [location]);

    useEffect(() => {
        if (userData) {
            console.log('Updated userData:', userData);
        }
    }, [userData]);

    const handleClickOpenDialog = (productId) => {
        console.log("Opening dialog for product ID:", productId);
        setSelectedProductId(productId); // Set the product ID to be deleted
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedProductId(null); // Clear the selected product ID
    };

    const handleDelete = () => {
        console.log('Deleting product with ID:', selectedProductId);
        if (!selectedProductId) return;

        axios.delete(`http://localhost:8080/api/buy/delete/${selectedProductId}`, {
            withCredentials: true,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((response) => {
                console.log(response.data);
                alert('Order canceled successfully!');
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product.buyId !== selectedProductId)
                );
            })
            .catch((error) => {
                console.error('Error canceling order:', error);
                alert('Failed to cancel the order. Please try again.');
            })
            .finally(() => {
                handleCloseDialog(); // Close the dialog after the request
            });
    };

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
                console.log('success!');
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <Container maxWidth={false} disableGutters>
            <Grid sx={{ paddingTop: 1, paddingBottom: 1 }}>
                <Navbar />
            </Grid>
            <Grid className="padding-color-outer" container direction={'row'} spacing={3} wrap='nowrap' sx={{ height: '50%' }}>
                <Grid size={{ md: 3 }} sx={{ maxWidth: '100%', border: '2px solid black' }}>
                    <SideBar
                        state={{
                            userData: location.state ? location.state.userData : null,
                        }}
                    />
                </Grid>
                <Grid size={{ md: 9 }} container direction={'column'} sx={{ backgroundColor: 'white', padding: 4 }}>
                    <Grid>
                        <Typography variant='h4'>My Orders</Typography>
                        <Divider sx={{ borderBottomWidth: 2, borderColor: 'black', margin: '20px 0' }} />
                    </Grid>
                    <Grid container spacing={2} className=""
                        sx={{
                            maxHeight: '600px',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            border: '1px solid black',
                            height: '600px',
                            display: 'flex',
                        }}>
                        {products ? products.map((product, index) => (
                            <PrintProducts key={index} product={product} onDelete={handleClickOpenDialog} />
                        )) : <Typography>No products found.</Typography>}
                    </Grid>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are sure you want to cancel your order?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You can't undo this operation.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleCloseDialog}
                        sx={{
                            background: "rgba(112, 5, 5, 1)",
                            "&:hover": {
                                background: "rgba(140, 10, 10, 1)",
                            },
                        }}
                    >Cancel</Button>
                    <Button variant='contained' color="success" onClick={handleDelete} autoFocus>
                        Proceed
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );

    function PrintProducts(props) {
        return (
            <Grid container spacing={2} direction={'row'} sx={{ border: '1px solid grey', padding: '.5rem', width: '100%' }}>
                <Grid size={{ md: 3 }}>
                    {props.product.product.image ? (
                        <img
                            width="200px"
                            src={`data:image/jpeg;base64,${props.product.product.image}`}
                            alt="product image"
                        />
                    ) : (
                        <img
                            width="200px"
                            src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                            alt="placeholder image"
                        />
                    )}
                </Grid>
                <Grid size={{ md: 6 }} container direction={'column'}>
                    <Typography variant="h6">{props.product.product.productName}</Typography>
                    <Typography variant="h6">{props.product.product.productDescription}</Typography>
                    <Typography variant="h5">
                        2x
                    </Typography>
                </Grid>
                <Grid container direction={'column'} size={{ md: 3 }}>
                    <Typography>Order Ordered: 12/12/2020</Typography>
                    <Button variant='contained' startIcon={<DeleteIcon />} onClick={() => props.onDelete(props.product.buyId)}
                        sx={{
                            background: "rgba(112, 5, 5, 1)",
                            "&:hover": {
                                background: "rgba(140, 10, 10, 1)",
                            },
                        }}
                    >Cancel</Button>
                </Grid>
            </Grid>
        );
    }
}