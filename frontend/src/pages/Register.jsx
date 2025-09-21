import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  // const submit = async (e) => {
  //   e.preventDefault();
  //   await register(name, email, password);
  //   nav('/');
  // };

  const submit = async (e) => {
  e.preventDefault();
  console.log("Button clicked");   // add this
  console.log({ name, email, password }); // check input values
  await register(name, email, password);
  console.log("Register function called");
  nav('/');
};

  return (
    <div className="container py-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border px-3 py-2 rounded" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full border px-3 py-2 rounded" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full py-2 bg-green-600 text-white rounded">Register</button>
      </form>
    </div>
  );
}
