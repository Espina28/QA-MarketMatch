import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, Dialog, DialogContent, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800000', // Maroon
    },
    secondary: {
      main: '#FFD700', // Gold
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 500,
    },
  },
});

export default function NavbarWelcome() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        address: '',
        phonenumber: '',
        student_Id: '',
        email: '',
        password: '',
    });
    const [openLogin, setOpenLogin] = React.useState(false);
    const [openSignup, setOpenSignup] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => setOpenLogin(false);
    const handleOpenSignup = () => setOpenSignup(true);
    const handleCloseSignup = () => setOpenSignup(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const isFormComplete = () => {
        return Object.values(formData).every((field) => field.trim() !== '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (isFormComplete()) {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:8080/api/user/postUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    const userId = data.userId;
                    console.log('Form submitted:', data);
                    
                    // Create Cart Payload
                    const cartPayload = {
                        dateAdded: new Date().toISOString(),
                        quantity: 0,
                        user: { userId: userId },
                    };
                    console.log(cartPayload);
                    await axios.post(
                        `http://localhost:8080/api/cart/postCart/` + userId,
                        cartPayload,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
    
                    // Create Seller Data Payload
                    const SellerData = {
                        products_sold: 0,
                        userid: { userId: userId },
                    };
                    console.log(SellerData);
                    await axios.post(
                        `http://localhost:8080/api/seller/postSeller/` + userId,
                        SellerData,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
    
                    // Create Buyer Data Payload
                    const BuyerData = {
                        totalTransaction: 0,
                        user: { userId: userId },
                    };
                    console.log(BuyerData);
                    await axios.post(
                        `http://localhost:8080/api/buyers/postBuyer/` + userId,
                        BuyerData,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
    
                    // Clear form data and session storage
                    setFormData({
                        firstname: '',
                        lastname: '',
                        address: '',
                        phonenumber: '',
                        student_Id: '',
                        email: '',
                        password: '',
                    });
                    localStorage.removeItem('signupData');
    
                    // Popup and redirect logic
                    handleCloseSignup();
                    setSuccessMessage('Signup successful! Please proceed to login.');
                    setIsSuccess(true);
                    setTimeout(() => {
                        setIsSuccess(false);
                        handleOpenLogin();
                    }, 2000);
                } else {
                    throw new Error('Failed to sign up');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('An error occurred. Please try again.');
            } finally {
                setIsLoading(false);
            }
        } else {
            setError('Please fill in all fields before proceeding.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(input);
        setError('');
        setIsLoading(true);
        try {
            const response = await login(input);
            if (response) {
                setError(response);
            } else {
                setSuccessMessage('Login Successful!');
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    navigate('/home');
                }, 2000);
            }
        } catch (error) {
            setError("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" sx={styles.appBar}>
                <Toolbar>
                    <Grid container alignItems="center">
                        <Grid item xs={6}>
                            <a>
                                <img
                                    src="/images/cit-logo.png"
                                    alt="Logo"
                                    style={styles.logo}
                                />
                            </a>
                        </Grid>

                        <Grid item xs={6} style={styles.buttonContainer}>
                            <div style={styles.buttonWrapper}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleOpenSignup}
                                    sx={styles.button}
                                >
                                    Sign Up
                                </Button>

                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleOpenLogin}
                                    sx={styles.button}
                                >
                                    Log In
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>

                {/* Sign Up Modal */}
                <Modal open={openSignup} onClose={handleCloseSignup}>
                    <Box sx={styles.modal}>
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseSignup}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: 'grey.500',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <h2 className="signup-title" style={styles.textstyle}>Sign up</h2>

                        <div className='signupbox' style={{marginLeft:50}}>
                            <form className="signup-form" onSubmit={handleSubmit} >
                                <input
                                    type="text"
                                    name="student_Id"
                                    placeholder="Student ID no."
                                    className="signup-input"
                                    value={formData.student_Id}
                                    style={styles.input}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="First Name"
                                    className="signup-input"
                                    value={formData.firstname}
                                    style={styles.input}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
                                    className="signup-input"
                                    value={formData.lastname}
                                    style={styles.input}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    className="signup-input"
                                    value={formData.address}
                                    style={styles.input}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="phonenumber"
                                    placeholder="Phone Number"
                                    className="signup-input"
                                    value={formData.phonenumber}
                                    style={styles.input}
                                    onChange={handleChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Institutional Email"
                                    className="signup-input"
                                    value={formData.email}
                                    style={styles.input}
                                    onChange={handleChange}
                                />
                                <div className="password-container" >
                                    <input
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Password"
                                        className="signup-input password-input"
                                        value={formData.password}
                                        style={styles.passwordinput}
                                        onChange={handleChange}
                                    />
                                    <IconButton onClick={togglePasswordVisibility} className="visibility-icon" style={{right:45, top:'1px'}}>
                                        {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </div>

                                <button type="submit" className="signup-button">
                                    SIGN UP
                                </button>

                                <span style={{ color: 'gold' }}>Already have an account?</span>
                                <span
                                    onClick={() => {
                                        handleOpenLogin();
                                        handleCloseSignup();
                                    }}
                                    style={{ color: 'gold', cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    {' '}
                                    Log in Here
                                </span>
                            </form>
                        </div>
                    </Box>
                </Modal>

                {/* Log In Modal */}
                <Modal open={openLogin} onClose={handleCloseLogin}>
                    <Box sx={styles.modal}>
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseLogin}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: 'grey.500',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <h2 className="login-title" style={styles.textstyle}>Log in</h2>
                        <div className='formdiv' style={styles.forms}>
                            <form>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="login-input"
                                    name="email"
                                    onChange={handleInput}
                                    style={styles.input}
                                />
                                <div className="password-container-login" style={styles.passwordContainerLogin}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        className="login-input"
                                        name="password"
                                        onChange={handleInput}
                                        style={styles.input}
                                    />
                                    <span
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={styles.icon}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </span>
                                </div>

                                <button type="submit" className="login-button" onClick={handleLogin} style={styles.loginButton}>
                                    LOGIN
                                </button>

                                <span style={{ color: 'gold', marginLeft:30}}>Don't have an account?</span>
                                <span
                                    onClick={() => {
                                        handleOpenSignup();
                                        handleCloseLogin();
                                    }}
                                    style={{ color: 'gold', cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    {' '}
                                    Register here
                                </span>
                                
                                {error && (
                                    <Typography variant="body2" color="error" align="center">
                                        {error}
                                    </Typography>
                                )}
                            </form>
                        </div>
                    </Box>
                </Modal>

                {/* Loading Dialog */}
                <Dialog 
                    open={isLoading} 
                    disableEscapeKeyDown 
                    PaperProps={{
                        style: { backgroundColor: '#800000', border: '2px solid #FFD700' },
                    }}
                >
                    <DialogContent>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                            <CircularProgress style={{ color: 'white' }} />
                            <Typography variant="body1" style={{ marginTop: '1rem', color: 'white' }}>
                                Processing...
                            </Typography>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Success Dialog */}
                <Dialog 
                    open={isSuccess} 
                    disableEscapeKeyDown
                    PaperProps={{
                        style: { backgroundColor: '#800000', border: '2px solid #FFD700' },
                    }}
                >
                    <DialogContent>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                            <Typography variant="h6" style={{ color: 'white' }}>
                                {successMessage}
                            </Typography>
                        </div>
                    </DialogContent>
                </Dialog>
            </AppBar>
        </ThemeProvider>
    );
}

const styles = {
    appBar: {
        backgroundColor: 'white',
        boxShadow: 'none',
    },
    logo: {
        height: '60px',
        marginLeft: '-600px',
        cursor: 'pointer',
    },
    buttonContainer: {
        textAlign: 'right',
    },
    buttonWrapper: {
        display: 'inline-flex',
        gap: '10px',
    },
    button: {
        fontWeight: 'bold',
        padding: '10px 10px',
        borderRadius: '50px',
        backgroundColor: '#641616',
        transition: 'all 0.3s ease',
        color: 'white',
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'maroon',
        padding: '20px',
        borderRadius: '4px',
        boxShadow: 24,
        width: '80%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
    },
    input: {
        width: '90%', 
        padding: '12px', 
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
        outline: 'none',
        backgroundColor:'white'
    },
    loginButton: {
        width: '95%',
        padding: '12px',
        backgroundColor: '#641616',
        borderRadius: '4px',
        border: 'none',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    icon: {
        cursor: 'pointer',
        position: 'absolute', 
        left: 270,        
        top: '50%',           
        transform: 'translateY(-50%)', 
    },
    textstyle: {
        color: 'white',
        textAlign: 'center',
    },
    passwordContainerLogin: {
        position: 'relative', 
        display: 'flex',
        alignItems: 'center',
    },
    forms:{
        width:300
    },
    passwordinput:{
        width:200, 
        padding: '12px', 
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
        outline: 'none',
        backgroundColor:'white',
    }
};

