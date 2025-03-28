import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCart } from '../hooks/useCart';

const ProductCard = memo(({ product }) => {
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddToCart = () => {
    setIsLoading(true);
    setError(null);
    
    try {
      addToCart(product);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } catch (err) {
      setError('Failed to add item to cart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return null;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow relative h-[450px] flex flex-col">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="absolute top-0 left-0 right-0 bg-red-100 text-red-700 px-4 py-2 text-sm z-10">
            {error}
          </div>
        )}

        <div className="h-[250px] bg-gray-50 p-4 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full w-auto object-contain"
            onError={(e) => {
              e.target.src = '/placeholder-image.png';
              e.target.alt = 'Image not available';
            }}
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3.5rem]" title={product.title}>
            {product.title}
          </h3>
          <p className="mt-2 text-xl font-bold text-gray-900">${product.price?.toFixed(2)}</p>

          <div className="mt-auto pt-4 flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className={`
                flex-1 py-2 px-4 rounded-md transition-all
                ${isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                }
              `}
            >
              {isLoading ? 'Adding...' : 'Add to Cart'}
            </button>
            <Link
              to={`/product/${product.id}`}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-center"
            >
              View More
            </Link>
          </div>
        </div>
      </div>

      {showAlert && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setShowAlert(false)}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div 
            className="flex items-center justify-center h-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg shadow-xl p-6 relative z-10">
              <div className="flex items-center text-green-600">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg font-medium">Item added to cart!</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

ProductCard.displayName = 'ProductCard';

export default ProductCard; 