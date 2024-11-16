import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Orders from './pages/Orders';
import UploadProduct from './pages/UploadProduct';
import ProductDetail from './pages/ProductDetail';
import MyAccount from './pages/MyAccount';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyPurchase from './pages/Cart';
import NotFound from './pages/NotFound';
import Transactions from './pages/Transactions';
import Cart from './pages/Cart';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import MyProducts from './pages/MyProduct';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
           <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Welcome />} />
          <Route path='/home' element={<HomePage />} />
          
          <Route path="/sell-product" element={<ProtectedRoutes><UploadProduct /></ProtectedRoutes>} />
          <Route path="/orders" element={<ProtectedRoutes><Orders /></ProtectedRoutes>} />
          <Route path="/product-detail/:productId" element={<ProtectedRoutes><ProductDetail /></ProtectedRoutes>} />
          <Route path="/my-account" element={<ProtectedRoutes><MyAccount /></ProtectedRoutes>} />
          <Route path="/cart" element={<ProtectedRoutes><Cart /></ProtectedRoutes>} />
          <Route path="/myProducts" element={<ProtectedRoutes><MyProducts /></ProtectedRoutes>} />
          <Route path="/transaction" element={<ProtectedRoutes><Transactions /></ProtectedRoutes>} />


          
          <Route path="*" element={<NotFound />} />
          

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
