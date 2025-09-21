import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="border rounded p-4 bg-white">
      <Link to={`/product/${product._id}`}>
        <img src={product.image || 'https://via.placeholder.com/300'} alt={product.title} className="w-full h-48 object-cover rounded" />
        <h3 className="mt-2 font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="mt-2 font-bold">₹ {product.price}</div>
      </Link>
    </div>
  );
}
