import { Product } from '../types/product';

const API_URL = 'http://your-server-domain/src/server'; // Replace with your actual PHP server domain

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products.php`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products.php?category=${encodeURIComponent(category)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const getCampaignProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products.php?campaign=true`);
    if (!response.ok) {
      throw new Error('Failed to fetch campaign products');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching campaign products:', error);
    throw error;
  }
};

// Mock data for development until the API is ready
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Rice Cooker Digital",
    description: "Smart rice cooker with multiple cooking modes",
    category: "Kitchen Appliances",
    price: "Rp 599.000",
    features: "Multiple cooking modes,Digital display,Keep warm function",
    whatsInTheBox: "Rice cooker,Measuring cup,Spatula,Steam basket",
    warranty: "1 year official warranty",
    manual: "https://cosmos.id/manuals/rice-cooker.pdf",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Stand Fan",
    description: "Powerful and quiet stand fan",
    category: "Home Appliances",
    price: "Rp 299.000",
    features: "3 speed settings,Oscillation,Height adjustment",
    whatsInTheBox: "Fan base,Stand pole,Fan head,Assembly manual",
    warranty: "2 years official warranty",
    manual: "https://cosmos.id/manuals/stand-fan.pdf",
    image: "/placeholder.svg"
  }
];

// Use mock data for development
export const getMockProducts = () => mockProducts;
export const getMockProductsByCategory = (category: string) => 
  mockProducts.filter(p => p.category === category);
export const getMockCampaignProducts = () => 
  mockProducts.slice(0, 3);

export type { Product };
