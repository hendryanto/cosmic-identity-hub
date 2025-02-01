import Navbar from "../components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChefHat,
  Utensils,
  Flame,
  Coffee,
  Fan,
  Waves,
  Beef,
  Timer,
  Box,
  Wind,
  Droplet,
  Zap,
  Lightbulb
} from "lucide-react";

interface ProductItem {
  name: string;
  icon: JSX.Element;
}

const kitchenAppliances: ProductItem[] = [
  { name: "Blender", icon: <Beef className="w-12 h-12" /> },
  { name: "Cooking Ware", icon: <Utensils className="w-12 h-12" /> },
  { name: "Gas Cooker", icon: <Flame className="w-12 h-12" /> },
  { name: "Gas Rice Cooker", icon: <ChefHat className="w-12 h-12" /> },
  { name: "Induction Cooker", icon: <Flame className="w-12 h-12" /> },
  { name: "Juicer", icon: <Waves className="w-12 h-12" /> },
  { name: "Mixer", icon: <Timer className="w-12 h-12" /> },
  { name: "Oven", icon: <Flame className="w-12 h-12" /> },
  { name: "Rice Cooker", icon: <ChefHat className="w-12 h-12" /> },
  { name: "SPB (Rice Box)", icon: <Box className="w-12 h-12" /> },
];

const homeAppliances: ProductItem[] = [
  { name: "Air Purifier", icon: <Wind className="w-12 h-12" /> },
  { name: "Coffee Maker", icon: <Coffee className="w-12 h-12" /> },
  { name: "Electric Kettle", icon: <Droplet className="w-12 h-12" /> },
  { name: "Fan", icon: <Fan className="w-12 h-12" /> },
  { name: "Iron", icon: <Zap className="w-12 h-12" /> },
  { name: "Water Dispenser", icon: <Droplet className="w-12 h-12" /> },
  { name: "Water Pump", icon: <Zap className="w-12 h-12" /> },
  { name: "Sterilizer UVC Lamp", icon: <Lightbulb className="w-12 h-12" /> },
];

const Products = () => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kitchenAppliances.map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      {product.icon}
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
          </TabsContent>
          
          <TabsContent value="home">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {homeAppliances.map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      {product.icon}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Products;