import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container py-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {err && <div className="bg-red-100 text-red-700 p-2 rounded mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full border px-3 py-2 rounded" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
      </form>
    </div>
  );
}
