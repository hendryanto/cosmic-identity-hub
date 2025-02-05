import { Product } from '../../types/product';

export const transformProducts = (data: any[]): Product[] => {
  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    description: item.description || '',
    category: item.category || '',
    price: item.price || '',
    features: Array.isArray(item.features) ? item.features : [],
    whatsInTheBox: Array.isArray(item.whatsInTheBox) ? item.whatsInTheBox : [],
    warranty: item.warranty || '',
    manual: item.manual || '',
    images: item.image ? [item.image] : ['/placeholder.svg'],
  }));
};