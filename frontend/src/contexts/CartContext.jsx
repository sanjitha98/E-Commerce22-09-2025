import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart')) || []; } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const exist = prev.find(p => p.product === product._id);
      if (exist) {
        return prev.map(p => p.product === product._id ? { ...p, qty: p.qty + qty } : p);
      }
      return [...prev, { product: product._id, title: product.title, price: product.price, image: product.image, qty }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(p => p.product !== productId));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
