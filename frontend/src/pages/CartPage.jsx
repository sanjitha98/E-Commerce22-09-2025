import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
export default function CartPage() {
  const { cart, removeFromCart, totalPrice,clearCart} = useContext(CartContext);
  const nav = useNavigate();
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? <div>Your cart is empty</div> : (
        <div>
          <div className="grid gap-4">
            {cart.map(item => (
              <div key={item.product} className="flex items-center gap-4 border p-3 rounded">
                <img src={item.image || 'https://via.placeholder.com/80'} alt={item.title} className="w-20 h-20 object-cover" />
                <div className="flex-1">
                  <div className="font-semibold">{item.title}</div>
                  <div>Qty: {item.qty}</div>
                </div>
                <div className="font-bold">₹ {item.price * item.qty}</div>
                <button className="text-red-600" onClick={() => removeFromCart(item.product)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end items-center gap-4">
  <div className="text-xl font-bold">Total: ₹ {totalPrice}</div>
  <button
    className="py-2 px-4 bg-green-600 text-white rounded"
    onClick={() => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      setTimeout(() => {
        clearCart();
        nav("/thank-you"); // redirect
      }, 1000);
    }}
  >
    Checkout (Mock Payment)
  </button>
</div>

        </div>
      )}
    </div>
  );
}

