import { Product } from '../../types/product';

export const transformProducts = (data: any[]): Product[] => {
  if (!Array.isArray(data)) {
    console.warn('Data is not an array:', data);
    return [];
  }

  return data.map((item: any) => {
    console.log('Transforming product item:', item);
    
    // Ensure image URL is properly formatted
    let images = [];
    if (item.image) {
      // If image is a string, convert it to an array
      const imageUrl = item.image.startsWith('http') ? 
        item.image : 
        `${window.location.origin}${item.image}`;
      console.log('Processed image URL:', imageUrl);
      images = [imageUrl];
    } else {
      // Fallback image
      images = ['/placeholder.svg'];
    }

    // Ensure features and whatsInTheBox are arrays
    let features = [];
    try {
      features = Array.isArray(item.features) ? item.features :
                typeof item.features === 'string' ? JSON.parse(item.features) : [];
    } catch (error) {
      console.warn('Error parsing features:', error);
    }
    
    let whatsInTheBox = [];
    try {
      whatsInTheBox = Array.isArray(item.whatsInTheBox) ? item.whatsInTheBox :
                      typeof item.whatsInTheBox === 'string' ? JSON.parse(item.whatsInTheBox) : [];
    } catch (error) {
      console.warn('Error parsing whatsInTheBox:', error);
    }

    const transformedProduct = {
      id: item.id || 0,
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

    console.log('Transformed product:', transformedProduct);
    return transformedProduct;
  });
};