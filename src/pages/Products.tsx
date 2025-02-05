import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChefHat, Utensils, Flame, Coffee, Fan, Waves, 
  Beef, Timer, Box, Wind, Droplet, Zap, Lightbulb
} from "lucide-react";
import { Product, getProductsByCategory } from "../services/productService";
import { useToast } from "../components/ui/use-toast";
import { Button } from "@/components/ui/button";
import ProductDetail from "../components/ProductDetail";

const Products = () => {
  const [kitchenProducts, setKitchenProducts] = useState<Product[]>([]);
  const [homeProducts, setHomeProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const kitchen = await getProductsByCategory('Kitchen Appliances');
        const home = await getProductsByCategory('Home Appliances');
        
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
      "Stand Fan": <Fan className="w-12 h-12" />,
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
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            {product.images && product.images[0] ? (
              <div className="flex justify-center mb-4">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-48 h-48 object-contain"
                />
              </div>
            ) : (
              <div className="flex justify-center mb-4">
                {getIconForProduct(product.name)}
              </div>
            )}
            <CardTitle className="text-xl">{product.name}</CardTitle>
            <CardDescription className="text-primary font-semibold">
              {product.price}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="space-y-2">
              <h4 className="font-semibold">Features:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {product.features.slice(0, 3).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <ProductDetail product={product} />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 px-4 pb-16">
        <h1 className="text-4xl font-bold text-center mb-2">Our Products</h1>
        <p className="text-gray-600 text-center mb-8">
          Discover our range of high-quality home and kitchen appliances
        </p>
        
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