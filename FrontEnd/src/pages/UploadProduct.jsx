import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Container from '@mui/material/Container';
import SideBar from '../components/SideBar';
import Grid from '@mui/material/Grid2';
import { IconButton, imageListClasses } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import '../App.css'; 
import '../../public/css/UploadProducts.css'; 
import { useLocation } from 'react-router-dom';

const UnderlinedText = styled(Typography)({
    position: 'relative',
    display: 'inline-block',
    fontWeight: 'bold',
    '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: '-2px', 
        width: '100%',
        height: '2px',
        backgroundColor: 'black',
        transform: 'scaleX(1)',
        transformOrigin: 'bottom left',
        },
    });

export default function UploadProduct() {
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
    
    const [product, setProduct] = useState({
        productName: '',
        productPrice: '',
        productStock: '',
        productStatus: '',
        productDescription: '',
        image: null,
        productTimeCreated: new Date().toISOString(),
    });
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                const imageData = reader.result.replace(/^data:image\/[a-z]+;base64,/, ''); // Remove the prefix
                setProduct({
                    ...product,
                    image: imageData, // Set only the Base64 data
                });
            };
            reader.readAsDataURL(file);
        } else {
            setProduct({
                ...product,
                [e.target.name]: e.target.value,
            });
        }
    };
    const handleSave = async () => {
        try {
            await axios.post('http://localhost:8080/api/user/create', {
                email: userData.email,
                product: product
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                auth: {
                    username: 'user@gmail.com',
                    password: '1'
                }
            });         
            alert('Product saved successfully!');
        } catch (error) {
            console.error(error);
            alert('Error saving product!');
        }
    };
    return (
        <Container maxWidth={false} disableGutters sx={{ height: '90vh' }}>
            <Grid>
                <Navbar/>
            </Grid>
            <Grid container direction={'row'} spacing={6} sx={{ height: '101.5%' }} className="padding-color-outer">
                <Grid  md={4} sx={{ maxWidth: '100%', border: '2px solid black' }}>
                <SideBar 
                    state={{ 
                    userData: location.state ? location.state.userData : null
                    }} 
                />
                </Grid>
                <Grid  md={8} container direction={'column'} sx={{ backgroundColor: 'white', padding: 4 }}>
                    <Box textAlign="center" mb={3}>
                        <UnderlinedText variant="h6" component="span">
                            UPLOAD PRODUCT
                        </UnderlinedText>
                    </Box>
                    <Grid container spacing={3} sx={{ width: '100%' }}>
                        <Grid container direction="column" spacing={2}>
                            <Grid container direction="row" spacing={2}>
                                <Grid container direction="column" spacing={2} sx={{ width: '500px' }}>
                                    <Grid >
                                        <TextField fullWidth label="Product Name" name="productName" variant="outlined" className="customTextField" onChange={handleChange} />
                                    </Grid>
                                    <Grid >
                                        <TextField fullWidth label="Product Price" name="productPrice" variant="outlined" className="customTextField" onChange={handleChange} />
                                    </Grid>
                                    <Grid >
                                        <TextField fullWidth label="Product Stock" name="productStock" variant="outlined" className="customTextField" onChange={handleChange} />
                                    </Grid>
                                    <Grid >
                                        <TextField fullWidth label="Product Status" name="productStatus" variant="outlined" className="customTextField" onChange={handleChange} />
                                    </Grid>
                                </Grid>
                                
                                <Grid > 
                                    <Box
                                        sx={{
                                            border: '2px dashed grey',
                                            borderRadius: 2,
                                            height: 250,
                                            width: 380,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        {image ? ( // Conditionally render the image
                                            <Box
                                                component="img"
                                                src={image}
                                                alt="Uploaded"
                                                sx={{
                                                    maxHeight: '100%',
                                                    maxWidth: '100%',
                                                    borderRadius: 2,
                                                    marginTop: 1,
                                                }}
                                            />
                                        ):(
                                            <Box sx={{ textAlign: 'center', marginTop: 1 }}>
                                                <IconButton color="primary" aria-label="upload image" component="label">
                                                <input hidden accept="image/*" type="file" onChange={handleChange}/>
                                                <CloudUploadIcon sx={{ fontSize: 50 }} />
                                                </IconButton>
                                                <Typography variant="body2">Upload an image</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid sx={{ width: '900px', height: '80px' }}>
                                <Grid>
                                    <TextField fullWidth label="Product Description" name="productDescription" variant="outlined" multiline rows={4} className="customTextField" onChange={handleChange} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" spacing={5}>
                        <Grid>
                            <Button variant="contained" color="primary" sx={{ width: '200px', height: '40px' }} onClick={handleSave}>Save</Button>
                        </Grid>
                        <Grid>
                            <Button variant="outlined" color="secondary" sx={{ width: '200px', height: '40px' }}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
