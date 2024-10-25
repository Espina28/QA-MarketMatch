import React from 'react';
import Navbar from '../components/Navbar';
import Container from '@mui/material/Container';
import SideBar from '../components/SideBar';
import Grid from '@mui/material/Grid2';
import { IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import { fontSize, styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '../App.css'; 

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
    return (
        <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
            <Grid sx={{ paddingTop: 1, paddingBottom: 1 }}>
            </Grid>
            <Grid container direction={'row'} spacing={6} sx={{ height: '91.9%' }} className="padding-color-outer">
                <Grid item md={4} sx={{ maxWidth: '100%', border: '2px solid black' }}>
                    <SideBar />
                </Grid>
                <Grid item md={8} container direction={'column'} sx={{ backgroundColor: 'white', padding: 4 }}>
                    <Box textAlign="center" mb={3}>
                        <UnderlinedText variant="h6" component="span">
                            UPLOAD PRODUCT
                        </UnderlinedText>
                    </Box>
                    <Grid container spacing={3} sx={{ width: '100%' }}>
                    {/* Left Column: Text Inputs */}
                    <Grid container direction="column" spacing={2}>
                        <Grid container direction="row" spacing={2}>
                            <Grid container direction="column" spacing={2} sx={{ width: '800px' }}>
                                <Grid item>
                                    <TextField fullWidth label="Name" variant="outlined" />
                                </Grid>
                                <Grid item>
                                    <TextField fullWidth label="Price" variant="outlined" />
                                </Grid>
                                <Grid item>
                                    <TextField fullWidth label="Stock" variant="outlined" />
                                </Grid>
                                <Grid item>
                                    <TextField fullWidth label="Status" variant="outlined" />
                                </Grid>
                            </Grid>
                                    
                            {/* Right Column: Image Upload */}
                            <Grid item > 
                                <Box
                                    sx={{
                                        border: '2px dashed grey',
                                        borderRadius: 2,
                                        height: 280,
                                        width: 475,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <IconButton color="primary" aria-label="upload image" component="label">
                                        <input hidden accept="image/*" type="file" />
                                        <CloudUploadIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                    <Typography variant="body2">Upload an image</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                            <Grid spacing={2} sx={{ width: '1300px' }}>
                                <Grid item>
                                    <TextField fullWidth label="Description" variant="outlined" multiline rows={4} />
                                </Grid>
                            </Grid>
                    </Grid>
                </Grid>
                    {/* Optional Save/Cancel Buttons */}
                    <Grid container justifyContent="center" spacing={5} sx={{ marginTop: 3 }}>
                        <Grid item>
                            <Button variant="contained" color="red" sx={{ width: '200px', height: '50px' ,backgroundColor: 'rgb(232, 232, 232)'}}>Save</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="black" sx={{ width: '200px', height: '50px' }}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
