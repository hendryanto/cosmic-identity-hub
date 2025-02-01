import { executeQuery } from '../lib/db';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  features: string;
  whatsInTheBox: string;
  warranty: string;
  manual: string;
  image?: string;
}

export const getProducts = async (): Promise<Product[]> => {
  console.log('Fetching all products');
  return executeQuery<Product[]>('SELECT * FROM products');
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  console.log('Fetching products by category:', category);
  return executeQuery<Product[]>('SELECT * FROM products WHERE category = ?', [category]);
};

export const getCampaignProducts = async (): Promise<Product[]> => {
  console.log('Fetching campaign products');
  return executeQuery<Product[]>('SELECT * FROM products WHERE isCampaign = true LIMIT 3');
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<number> => {
  console.log('Adding new product:', product);
  const result = await executeQuery<any>(
    'INSERT INTO products (name, description, category, price, features, whatsInTheBox, warranty, manual, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      product.name,
      product.description,
      product.category,
      product.price,
      product.features,
      product.whatsInTheBox,
      product.warranty,
      product.manual,
      product.image
    ]
  );
  return result.insertId;
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<void> => {
  console.log('Updating product:', id, product);
  const updates = Object.entries(product)
    .filter(([_, value]) => value !== undefined)
    .map(([key, _]) => `${key} = ?`);
  
  const values = Object.entries(product)
    .filter(([_, value]) => value !== undefined)
    .map(([_, value]) => value);

  await executeQuery(
    `UPDATE products SET ${updates.join(', ')} WHERE id = ?`,
    [...values, id]
  );
};

export const deleteProduct = async (id: number): Promise<void> => {
  console.log('Deleting product:', id);
  await executeQuery('DELETE FROM products WHERE id = ?', [id]);
};