import { SERVER_URL } from '../../config/serverConfig';
import { Product } from '../../types/product';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${SERVER_URL}/src/server/products.php`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const result = await response.json();
  console.log('API Response:', result);
  
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch products');
  }
  
  return result.data;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await fetch(`${SERVER_URL}/src/server/products.php?category=${encodeURIComponent(category)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products by category');
  }
  const result = await response.json();
  console.log('API Response for category:', category, result);
  
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch products by category');
  }
  
  return result.data;
};

export const fetchCampaignProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${SERVER_URL}/src/server/products.php?campaign=true`);
  if (!response.ok) {
    throw new Error('Failed to fetch campaign products');
  }
  const result = await response.json();
  console.log('API Response for campaign products:', result);
  
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch campaign products');
  }
  
  return result.data;
};