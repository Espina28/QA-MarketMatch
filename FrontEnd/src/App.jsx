import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Correct path to Navbar
import HomePage from './pages/HomePage'; // Correct path to HomePage
import OrderHistory from './pages/OrderHistory'; // Correct path to OrderHistory
import UploadProduct from './pages/UploadProduct'; // Correct path to UploadProduct
import Welcome from './pages/Welcome';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome/>} /> {/* Homepage route */}
          <Route path="/sell-product" element={<UploadProduct />} /> {/* Upload Product route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
