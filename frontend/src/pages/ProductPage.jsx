import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
      setProduct(res.data);
    };
    load();
  }, [id]);

  if (!product) return <div className="container py-6">Loading...</div>;

  return (
    <div className="container py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-2">
        <img src={product.image || 'https://via.placeholder.com/800x400'} alt={product.title} className="w-full h-96 object-cover rounded" />
        <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
        <p className="mt-2">{product.description}</p>
      </div>
      <aside className="bg-white p-4 rounded shadow">
        <div className="text-2xl font-bold">₹ {product.price}</div>
        <div className="mt-2">Stock: {product.countInStock}</div>
        {/* <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded"
         onClick={() => addToCart(product, 1)}>Add to Cart</button> */}
        <button
          className="mt-4 w-full py-2 bg-blue-600 text-white rounded"
          onClick={() => {
            addToCart(product, 1);
            alert("Item added to cart!");
          }}
        >
          Add to Cart
        </button>

      </aside>
    </div>
  );
}
