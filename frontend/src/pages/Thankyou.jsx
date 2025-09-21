// src/pages/ThankYou.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <div className="container py-6 text-center">
      <h1 className="text-3xl font-bold mb-4">✅ Thank You for Your Purchase!</h1>
      <p className="mb-4">Your order has been placed successfully.</p>
      <Link to="/" className="py-2 px-4 bg-blue-600 text-white rounded">
        Continue Shopping
      </Link>
    </div>
  );
}
