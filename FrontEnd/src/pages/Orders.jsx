import Navbar from '../components/Navbar'
import Container from '@mui/material/Container'
import SideBar from '../components/SideBar'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import '../App.css' /*<---- custom css*/

import DeleteIcon from '@mui/icons-material/Delete';

import {useState, useEffect} from 'react'
import axios from "axios"
import { useLocation } from 'react-router-dom'

export default function Orders(){

    const [products, setProducts] = useState(null);
    const location = useLocation();
    const [userData, setUserData] = useState();

    useEffect(() => {
        // Safely check if location.state and location.state.userData are defined
        if (location.state && location.state.userData) {
          setUserData(location.state.userData);
        }
      }, [location]); 
    
      useEffect(() => {
        if (userData) {
          console.log('Updated userData:', userData); // This will log after the state is updated
        }
      }, [userData]); 

    // useEffect(()=>{  
    //     axios.get("http://localhost:8080/api/product/buyer/purchase", {
    //         params: {
    //             buyerPk: 2   //<---change this
    //         }
    //     }).then((response) => {
    //         setProducts(response.data);
    //     }).catch((error)=>{
    //         console.error("Error fetching products:", error);
    //     });
    // },[])


    return (
        <Container maxWidth={false} disableGutters  sx={{height: '100vh'}} >
            <Grid sx={{paddingTop: 1, paddingBottom: 1}}>
                <Navbar/> 
            </Grid>
            <Grid className="padding-color-outer" container direction={'row'}  spacing={3} wrap='nowrap' sx={{height: '100%'}}>
                <Grid size={{md: 4}}  sx={{maxWidth: '100%', border: '2px solid black'}}>
                    <SideBar/>
                </Grid>
                <Grid size={{md: 8}} container direction={'column'} sx={{backgroundColor: 'white', padding: 4}}>
                    <Grid>
                        <Typography variant='h4'>My Orders</Typography>
                        <Divider sx={{ borderBottomWidth: 2, borderColor: 'black', margin: '20px 0' }} />
                    </Grid>
                    <Grid container spacing={2} className="" direction={'column'}
                        sx={{
                            maxHeight: '80%',  // Set the maximum height as needed
                            overflowY: 'auto',   // Enable vertical scrolling
                            overflowX: 'hidden', // Prevent horizontal scrolling (optional)
                            border: '1px solid black'
                        }}>
                        {/* Your content goes here */}
                        {
                            products ? products.map((product, index) => (
                                <PrintProducts key={index} product={product} />
                            )) : <Typography>No products found.</Typography> // Optional fallback
                            
                        }      
                    </Grid>
                </Grid>
            </Grid>  
        </Container>
    )
}

function PrintProducts(props){
    return (
        <Grid container alignItems="center" spacing={2} direction={'row'} sx={{border: '1px solid grey', padding: '.5rem'}}>
                <Grid size={{md: 3}}>
                    <img width ='200px' src={`data:image/jpeg;base64,${props.product.image}`} alt="product image"/>
                </Grid>
                <Grid size={{md: 6}} container direction={'column'}>
                    <Typography variant="h6">{props.product.productName}</Typography>
                    <Typography variant="h6">{props.product.productDescription}</Typography>
                    <Typography variant="h5">
                            2x
                    </Typography>
                </Grid>
                <Grid container direction={'column'} size={{md: 3}}>
                    <Typography>Order Ordered: 12/12/2020</Typography>
                    <Button variant='contained' startIcon={<DeleteIcon />}
                    sx={{
                        background: 'black'
                    }}>Cancel</Button>
                </Grid>
            </Grid>
    )
}