import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Container,Grid,Box,Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ScrollableContainer from '../components/ScrollableContainer';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8080/api/user/getAllProducts', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <div>
      <Navbar/>

      {/* Main Content */}
      <Container maxWidth={false} disableGutters sx={{ backgroundColor: '#800000' }}>
        <Grid container sx={{ height: '85vh', backgroundColor: '#fff' }}>
          {/* Left Column (Swiper Placeholder) */}
          <Grid
            item
            md={6}
            sx={{ 
              backgroundColor: '#ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
            }}
          >
            <Box
              sx={{
                width: '80%',
                height: '100%',
                backgroundColor: '#E0E0E0',
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
            </Box>
          </Grid>

          {/* Right Column (MARKET MATCH + Product Grid) */}
          <Grid
            item
            md={6}
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#800000',
              padding: '2rem',
              height: '100%',
            }}
          >
            <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/images/cit-log-notext.png)', 
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                opacity: 0.5, 
            }}
            />

            <Typography variant="h2" sx={{ zIndex: 2, color: 'white', fontWeight: 'bold', marginBottom: '2rem' }}>
              MARKET MATCH
            </Typography>

            {/* Grid of Products Inside MARKET MATCH */}
            <ScrollableContainer>
              <Grid container spacing={2} sx={{ zIndex: 2 }}>
                {products.map((product, index) => (
                <Grid item xs={4} key={index}>
                <Link to={`/${product.productName}/${product.productId}`}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '200px',
                      backgroundColor: '#E0E0E0',
                      borderRadius: 2,
                    }}
                  >
                    <img
                      src={product.image? `data:image/jpeg;base64,${product.image}` : ''}
                      alt={products.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '10px',
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        bottom: 5,
                        left: 5,
                        color: '#000',
                        fontWeight: 'bold',
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Box>
                </Link>
              </Grid>
                ))}
              </Grid>
            </ScrollableContainer>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;