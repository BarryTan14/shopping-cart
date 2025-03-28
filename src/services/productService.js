import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data.map(product => ({
        ...product,
        quantity: 1
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products. Please try again later.');
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return {
        ...response.data,
        quantity: 1
      };
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw new Error('Failed to fetch product details. Please try again later.');
    }
  }
};

export default productService; 