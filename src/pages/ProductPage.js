import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import LoadingSpinner from '../components/LoadingSpinner';
import { productService } from '../services/productService';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const { addToCart, cartItems } = useCart();
  
  const cartItem = cartItems.find(item => item.id === Number(id));
  const quantityInCart = cartItem?.quantity || 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    try {
      addToCart(product);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } catch (err) {
      setError('Failed to add item to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 text-red-700 p-6 rounded-lg max-w-md w-full text-center">
          <p className="text-lg font-semibold mb-2">Error loading product</p>
          <p className="mb-4">{error}</p>
          <Link to="/" className="text-red-600 hover:text-red-800 underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product not found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="aspect-w-1 aspect-h-1 w-full">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-contain rounded-lg"
              onError={(e) => {
                e.target.src = '/placeholder-image.png';
                e.target.alt = 'Image not available';
              }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-8 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
          
          <div className="flex items-center mb-6">
            <span className="text-3xl font-bold text-gray-900">${product.price?.toFixed(2)}</span>
            {quantityInCart > 0 && (
              <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {quantityInCart} in cart
              </span>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-2 text-gray-700">
                {product.rating?.rate} ({product.rating?.count} reviews)
              </span>
            </div>
            <p className="text-sm text-gray-600 capitalize">Category: {product.category}</p>
          </div>

          <p className="text-gray-700 mb-8">{product.description}</p>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>
            <Link
              to="/cart"
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-8 rounded-md hover:bg-gray-200 transition-colors text-center"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Success Alert */}
      {showAlert && (
        <div className="fixed inset-0 z-50" onClick={() => setShowAlert(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="flex items-center justify-center h-full">
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
    </div>
  );
};

export default ProductPage;
