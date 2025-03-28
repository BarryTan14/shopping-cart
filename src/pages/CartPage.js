import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [selectedItems, setSelectedItems] = useState(new Set());

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(itemId)) {
        newSelection.delete(itemId);
      } else {
        newSelection.add(itemId);
      }
      return newSelection;
    });
  };

  const toggleAllItems = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map(item => item.id)));
    }
  };

  const getSelectedTotal = () => {
    return cartItems
      .filter(item => selectedItems.has(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0)
      .toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
        <div className="flex items-center gap-4">
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              checked={selectedItems.size === cartItems.length}
              onChange={toggleAllItems}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
            />
            Select All
          </label>
          <span className="text-sm text-gray-600">
            {selectedItems.size} of {cartItems.length} selected
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        {cartItems.map(item => (
          <div 
            key={item.id} 
            className={`flex items-center bg-white p-4 rounded-lg shadow-sm transition-colors
              ${selectedItems.has(item.id) ? 'bg-blue-50' : ''}`}
          >
            <div className="flex items-center gap-4 flex-1">
              <input
                type="checkbox"
                checked={selectedItems.has(item.id)}
                onChange={() => toggleItemSelection(item.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <img 
                src={item.image} 
                alt={item.title}
                className="w-24 h-24 object-contain rounded"
                onError={(e) => {
                  e.target.src = '/placeholder-image.png';
                  e.target.alt = 'Image not available';
                }}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600">${item.price?.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1 border-x">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Cart Total:</span>
            <span>${getTotalPrice()}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Selected Total:</span>
            <span className="text-blue-600">${getSelectedTotal()}</span>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button 
            className={`px-6 py-2 rounded-md text-sm transition-colors
              ${selectedItems.size > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            disabled={selectedItems.size === 0}
          >
            Checkout ({selectedItems.size})
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
