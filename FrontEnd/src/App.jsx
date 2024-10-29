import React, { useImperativeHandle } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Correct path to Navbar
import HomePage from './pages/HomePage'; // Correct path to HomePage
import OrderHistory from './pages/OrderHistory'; // Correct path to OrderHistory
import UploadProduct from './pages/UploadProduct'; // Correct path to UploadProduct
import ProductDetail from './pages/ProductDetail';
import MyAccount from './pages/MyAccount';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome/>} /> {/* Homepage route */}
          <Route path="/sell-product" element={<UploadProduct />} /> {/* Upload Product route */}
          <Route path="/signup" element={<Signup />} /> {/* Order History route */}
          <Route path="/login" element={<Login />} /> {/* Order History route */}
          <Route path="/my-order-history" element={<OrderHistory />} /> {/* Order History route */}
          <Route path="/my-account" element={<MyAccount/>}/>{/*My Account route*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
