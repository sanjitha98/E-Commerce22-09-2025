import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [page, keyword]);

  const fetchProducts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products?limit=12&page=${page}${keyword? `&keyword=${encodeURIComponent(keyword)}` : ''}`);
    setProducts(res.data.products);
    setPages(res.data.pages);
  };

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div>
          <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Search..." className="border px-3 py-1 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: pages }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded ${page === i+1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
}
