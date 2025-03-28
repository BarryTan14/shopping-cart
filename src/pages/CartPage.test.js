import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CartPage from './CartPage';
import { CartProvider } from '../hooks/useCart';

const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

const renderWithProviders = (component) => {
  return render(
    <CartProvider>
      <BrowserRouter {...router}>
        {component}
      </BrowserRouter>
    </CartProvider>
  );
};

beforeEach(() => {
  localStorage.clear();
});

const mockProduct = { 
  id: 1, 
  title: 'Test Product', 
  price: 10.99, 
  quantity: 2,
  image: 'test.jpg'
};

describe('CartPage Tests', () => {
  test('renders empty cart message when cart is empty', async () => {
    await act(async () => {
      renderWithProviders(<CartPage />);
    });

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('displays items in the cart and calculates total price', async () => {
    localStorage.setItem('cart', JSON.stringify([mockProduct]));
    
    await act(async () => {
      renderWithProviders(<CartPage />);
    });

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();

    expect(screen.getByText(/\$21.98/)).toBeInTheDocument(); 
  });

  test('removes an item from the cart', async () => {
    localStorage.setItem('cart', JSON.stringify([mockProduct]));
    
    await act(async () => {
      renderWithProviders(<CartPage />);
    });

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: '' });
    
    await act(async () => {
      fireEvent.click(removeButton);
    });

    expect(screen.queryByText(/Test Product/i)).not.toBeInTheDocument();
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('updates item quantity and recalculates total price', async () => {
    localStorage.setItem('cart', JSON.stringify([mockProduct]));
    
    await act(async () => {
      renderWithProviders(<CartPage />);
    });

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$21.98/)).toBeInTheDocument(); 

    const incrementButton = screen.getByRole('button', { name: '+' });
    
    await act(async () => {
      fireEvent.click(incrementButton);
    });

    expect(screen.getByText(/\$32.97/)).toBeInTheDocument(); 
  });

  test('does not allow invalid quantity', async () => {
    localStorage.setItem('cart', JSON.stringify([mockProduct]));
    
    await act(async () => {
      renderWithProviders(<CartPage />);
    });

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$21.98/)).toBeInTheDocument(); 

    const decrementButton = screen.getByRole('button', { name: '-' });
    
    await act(async () => {
      fireEvent.click(decrementButton);
      fireEvent.click(decrementButton);
    });

    expect(screen.getByText('1')).toBeInTheDocument();
    
    const cartTotal = screen.getByText('Cart Total:').nextElementSibling;
    expect(cartTotal).toHaveTextContent('$10.99');
  });

  test('shows empty cart message when localStorage is empty', async () => {
    localStorage.removeItem('cart');
    
    await act(async () => {
      renderWithProviders(<CartPage />);
    });
    
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
