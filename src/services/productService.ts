import { Product } from '../types/product';
import { SERVER_URL } from '../config/serverConfig';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${SERVER_URL}/src/server/products.php`);
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
    const response = await fetch(`${SERVER_URL}/src/server/products.php?category=${encodeURIComponent(category)}`);
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
    const response = await fetch(`${SERVER_URL}/src/server/products.php?campaign=true`);
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
    features: ["Multiple cooking modes", "Digital display", "Keep warm function"],
    whatsInTheBox: ["Rice cooker", "Measuring cup", "Spatula", "Steam basket"],
    warranty: "1 year official warranty",
    manual: "https://cosmos.id/manuals/rice-cooker.pdf",
    images: ["/placeholder.svg"]
  },
  {
    id: 2,
    name: "Stand Fan",
    description: "Powerful and quiet stand fan",
    category: "Home Appliances",
    price: "Rp 299.000",
    features: ["3 speed settings", "Oscillation", "Height adjustment"],
    whatsInTheBox: ["Fan base", "Stand pole", "Fan head", "Assembly manual"],
    warranty: "2 years official warranty",
    manual: "https://cosmos.id/manuals/stand-fan.pdf",
    images: ["/placeholder.svg"]
  },
  {
    id: 3,
    name: "Coffee Maker",
    description: "Premium coffee maker with timer",
    category: "Kitchen Appliances",
    price: "Rp 799.000",
    features: ["Programmable timer", "Keep warm plate", "Auto shut-off"],
    whatsInTheBox: ["Coffee maker", "Filter basket", "Glass carafe", "Measuring spoon"],
    warranty: "1 year official warranty",
    manual: "https://cosmos.id/manuals/coffee-maker.pdf",
    images: ["/placeholder.svg"]
  },
  {
    id: 4,
    name: "Air Purifier",
    description: "HEPA filter air purifier for clean air",
    category: "Home Appliances",
    price: "Rp 1.299.000",
    features: ["HEPA filter", "Air quality sensor", "Silent operation"],
    whatsInTheBox: ["Air purifier", "HEPA filter", "Remote control", "Manual"],
    warranty: "2 years official warranty",
    manual: "https://cosmos.id/manuals/air-purifier.pdf",
    images: ["/placeholder.svg"]
  },
  {
    id: 5,
    name: "Blender",
    description: "High-power blender for smooth blending",
    category: "Kitchen Appliances",
    price: "Rp 499.000",
    features: ["Multiple speed settings", "Ice crushing", "Safety lock"],
    whatsInTheBox: ["Blender base", "Jar", "Lid", "Manual"],
    warranty: "1 year official warranty",
    manual: "https://cosmos.id/manuals/blender.pdf",
    images: ["/placeholder.svg"]
  },
  {
    id: 6,
    name: "Water Dispenser",
    description: "Hot and cold water dispenser",
    category: "Home Appliances",
    price: "Rp 899.000",
    features: ["Hot and cold water", "Child safety lock", "Energy efficient"],
    whatsInTheBox: ["Water dispenser", "Drip tray", "Manual"],
    warranty: "1 year official warranty",
    manual: "https://cosmos.id/manuals/water-dispenser.pdf",
    images: ["/placeholder.svg"]
  }
];

// Use mock data for development
export const getMockProducts = () => mockProducts;
export const getMockProductsByCategory = (category: string) => 
  mockProducts.filter(p => p.category === category);
export const getMockCampaignProducts = () => 
  mockProducts.slice(0, 3);

export type { Product };