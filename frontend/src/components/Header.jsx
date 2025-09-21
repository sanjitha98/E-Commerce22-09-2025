import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-semibold">MyShop</Link>
        <nav className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            Cart
            <span className="ml-1 inline-block bg-blue-500 text-white text-xs px-2 rounded-full">{cart.length}</span>
          </Link>
          {user ? (
            <>
              <Link to="/profile">{user.name}</Link>
              {user.role === 'admin' && <Link to="/admin/products">Admin</Link>}
              <button className="text-sm" onClick={() => { logout(); navigate('/'); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="ml-2">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
