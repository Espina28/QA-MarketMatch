import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import Navbar from '../components/Navbar';

const placeholderProducts = [
  { name: 'Product 1', image: 'https://via.placeholder.com/400x300?text=Product+1' },
  { name: 'Product 2', image: 'https://via.placeholder.com/400x300?text=Product+2' },
  { name: 'Product 3', image: 'https://via.placeholder.com/400x300?text=Product+3' },
  { name: 'Product 4', image: 'https://via.placeholder.com/400x300?text=Product+4' },
  { name: 'Product 5', image: 'https://via.placeholder.com/400x300?text=Product+5' },
  { name: 'Product 6', image: 'https://via.placeholder.com/400x300?text=Product+6' },
];

export default function HomePage() {
  return (
    <div>
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
              <Typography variant="h5" sx={{ textAlign: 'center', padding: 2 }}>
                Swiper Content Placeholder
              </Typography>
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
              backgroundColor: '#800000', // Dark maroon background
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
            <Grid container spacing={2} sx={{ zIndex: 2 }}>
              {placeholderProducts.map((product, index) => (
                <Grid item xs={4} key={index}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100px',
                      backgroundColor: '#E0E0E0',
                      borderRadius: 2,
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
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
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
