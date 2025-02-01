import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChefHat, Utensils, Flame, Coffee, Fan, Waves, 
  Beef, Timer, Box, Wind, Droplet, Zap, Lightbulb
} from "lucide-react";
import { Product, getProductsByCategory } from "../services/productService";
import { useToast } from "../components/ui/use-toast";

const Products = () => {
  const [kitchenProducts, setKitchenProducts] = useState<Product[]>([]);
  const [homeProducts, setHomeProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [kitchen, home] = await Promise.all([
          getProductsByCategory('Kitchen Appliances'),
          getProductsByCategory('Home Appliances')
        ]);
        
        console.log('Fetched kitchen products:', kitchen);
        console.log('Fetched home products:', home);
        
        setKitchenProducts(kitchen);
        setHomeProducts(home);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchProducts();
  }, [toast]);

  const getIconForProduct = (name: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      "Blender": <Beef className="w-12 h-12" />,
      "Cooking Ware": <Utensils className="w-12 h-12" />,
      "Gas Cooker": <Flame className="w-12 h-12" />,
      "Rice Cooker": <ChefHat className="w-12 h-12" />,
      "Coffee Maker": <Coffee className="w-12 h-12" />,
      "Fan": <Fan className="w-12 h-12" />,
      // ... keep existing code (remaining icon mappings)
      "Induction Cooker": <Flame className="w-12 h-12" />,
      "Juicer": <Waves className="w-12 h-12" />,
      "Mixer": <Timer className="w-12 h-12" />,
      "Oven": <Flame className="w-12 h-12" />,
      "SPB (Rice Box)": <Box className="w-12 h-12" />,
      "Air Purifier": <Wind className="w-12 h-12" />,
      "Electric Kettle": <Droplet className="w-12 h-12" />,
      "Water Dispenser": <Droplet className="w-12 h-12" />,
      "Water Pump": <Zap className="w-12 h-12" />,
      "Sterilizer UVC Lamp": <Lightbulb className="w-12 h-12" />,
    };

    return iconMap[name] || <Box className="w-12 h-12" />;
  };

  const renderProductGrid = (products: Product[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {getIconForProduct(product.name)}
            </div>
            <CardTitle className="text-xl">{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              Click to view details
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto pt-24 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
        
        <Tabs defaultValue="kitchen" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="kitchen">Kitchen Appliances</TabsTrigger>
            <TabsTrigger value="home">Home Appliances</TabsTrigger>
          </TabsList>
          
          <TabsContent value="kitchen">
            {renderProductGrid(kitchenProducts)}
          </TabsContent>
          
          <TabsContent value="home">
            {renderProductGrid(homeProducts)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Products;
