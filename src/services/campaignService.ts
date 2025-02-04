import { CampaignProduct } from '../types/campaign';

const API_URL = 'http://localhost/src/server'; // Update this with your actual server URL

export const getCampaignProducts = async (): Promise<CampaignProduct[]> => {
  const response = await fetch(`${API_URL}/campaign.php`);
  if (!response.ok) {
    throw new Error('Failed to fetch campaign products');
  }
  return response.json();
};

export const createCampaignProduct = async (product: Omit<CampaignProduct, 'id'>): Promise<CampaignProduct> => {
  const response = await fetch(`${API_URL}/campaign.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Failed to create campaign product');
  }
  return response.json();
};

export const deleteCampaignProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/campaign.php?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete campaign product');
  }
};