import React, { useState, useEffect } from 'react';

export default function ProductForm({ submit, initial, cancel }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [countInStock, setCountInStock] = useState(0);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || '');
      setPrice(initial.price || 0);
      setCategory(initial.category || '');
      setDesc(initial.description || '');
      setImage(initial.image || '');
      setCountInStock(initial.countInStock || 0);
    } else {
      setTitle(''); setPrice(0); setCategory(''); setDesc(''); setImage(''); setCountInStock(0);
    }
  }, [initial]);

  const handle = (e) => {
    e.preventDefault();
    submit({ title, price, category, description: desc, image, countInStock });
  };

  return (
    <form onSubmit={handle} className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-semibold">{initial ? 'Edit Product' : 'Create Product'}</h2>
      <input className="w-full border px-2 py-1" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="number" className="w-full border px-2 py-1" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <input className="w-full border px-2 py-1" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <input className="w-full border px-2 py-1" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
      <input type="number" className="w-full border px-2 py-1" placeholder="Stock" value={countInStock} onChange={e => setCountInStock(e.target.value)} />
      <textarea className="w-full border px-2 py-1" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-blue-600 text-white rounded" type="submit">
          Save
        </button>
        <button
          type="button"
          className="px-3 py-1 bg-gray-300 rounded"
          onClick={() => {
            if (initial && cancel) {
              cancel(); // for edit mode
            } else {
              // reset form for create mode
              setTitle('');
              setPrice(0);
              setCategory('');
              setDesc('');
              setImage('');
              setCountInStock(0);
            }
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
