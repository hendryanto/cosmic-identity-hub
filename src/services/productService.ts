import { Product } from '../types/product';
import { fetchProducts, fetchProductsByCategory, fetchCampaignProducts } from './api/productApi';
import { transformProducts } from './transformers/productTransformer';

export const getProducts = async (): Promise<Product[]> => {
  const data = await fetchProducts();
  return transformProducts(data);
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const data = await fetchProductsByCategory(category);
  return transformProducts(data);
};

export const getCampaignProducts = async (): Promise<Product[]> => {
  const data = await fetchCampaignProducts();
  return transformProducts(data);
};

export type { Product };