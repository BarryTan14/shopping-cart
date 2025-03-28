import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Navbar = memo(() => {
  const { cartItems, getTotalQuantity } = useCart();
  const [showAnimation, setShowAnimation] = useState(false);
  const totalQuantity = getTotalQuantity();

  useEffect(() => {
    setShowAnimation(true);
    const timer = setTimeout(() => setShowAnimation(false), 300);
    return () => clearTimeout(timer);
  }, [cartItems]);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-semibold text-gray-800">
            Fake Shop
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-gray-900">
              <div className="relative">
                <svg 
                  data-testid="cart-icon"
                  className={`w-6 h-6 transition-transform duration-300 ${showAnimation ? 'scale-125' : 'scale-100'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                  />
                </svg>
                {totalQuantity > 0 && (
                  <span 
                    className={`
                      absolute -top-2 -right-2 
                      bg-red-500 text-white text-xs font-bold 
                      rounded-full w-5 h-5 flex items-center justify-center
                      transition-transform duration-300
                      ${showAnimation ? 'scale-125' : 'scale-100'}
                    `}
                  >
                    {totalQuantity}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
