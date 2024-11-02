import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import OrderHistory from './pages/OrderHistory';
import UploadProduct from './pages/UploadProduct';
import ProductDetail from './pages/ProductDetail';
import MyAccount from './pages/MyAccount';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyPurchase from './pages/Cart'; // Import MyPurchase component

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/sell-product" element={<UploadProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-order-history" element={<OrderHistory />} />
          <Route path="/product-detail/:productId" element={<ProductDetail />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/cart" element={<MyPurchase />} /> {/* My Purchase route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
