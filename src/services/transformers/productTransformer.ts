import { Product } from '../../types/product';

export const transformProducts = (data: any[]): Product[] => {
  return data.map((item: any) => {
    // Ensure image URL is properly formatted
    let images = [];
    if (item.image) {
      // If image is a string, convert it to an array
      images = [item.image.startsWith('http') ? item.image : `${window.location.origin}${item.image}`];
    } else {
      // Fallback image
      images = ['/placeholder.svg'];
    }

    // Ensure features and whatsInTheBox are arrays
    const features = Array.isArray(item.features) ? item.features : 
                    typeof item.features === 'string' ? JSON.parse(item.features) : [];
    
    const whatsInTheBox = Array.isArray(item.whatsInTheBox) ? item.whatsInTheBox :
                         typeof item.whatsInTheBox === 'string' ? JSON.parse(item.whatsInTheBox) : [];

    return {
      id: item.id,
      name: item.name || '',
      description: item.description || '',
      category: item.category || '',
      price: item.price || '',
      features: features,
      whatsInTheBox: whatsInTheBox,
      warranty: item.warranty || '',
      manual: item.manual || '',
      images: images,
    };
  });
};