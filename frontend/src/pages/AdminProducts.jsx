import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import ProductForm from '../components/ProductForm';

export default function AdminProducts() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetch = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
    setProducts(res.data.products);
  };

  useEffect(() => { fetch(); }, []);

  const createOrUpdate = async (payload) => {
    if (!token) return alert('Admin token required');
    if (editing) {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${editing._id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
    } else {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, payload, { headers: { Authorization: `Bearer ${token}` } });
    }
    setEditing(null);
    fetch();
  };

  const remove = async (id) => {
    if (!token) return alert('Admin token required');
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetch();
  };

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <ProductForm submit={createOrUpdate} initial={editing} cancel={() => setEditing(null)} />
        </div>
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 gap-3">
            {products.map(p => (
              <div key={p._id} className="p-3 border rounded flex justify-between items-center">
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm">₹ {p.price}</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-2 py-1 bg-yellow-400 rounded" onClick={() => setEditing(p)}>Edit</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => remove(p._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
