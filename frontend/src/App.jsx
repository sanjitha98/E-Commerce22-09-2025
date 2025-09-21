import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminProducts from './pages/AdminProducts';
import ThankYou from './pages/Thankyou';

export default function App() {
  return (
    
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </div>
  );
}
