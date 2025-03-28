import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { CartProvider } from './hooks/useCart';
import './index.css';

const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <BrowserRouter {...router}>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
