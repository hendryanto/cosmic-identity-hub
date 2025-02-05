import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";
import { SERVER_URL } from "../../config/serverConfig";

const categories = [
  "Kitchen Appliances",
  "Home Appliances",
];

interface ProductForm {
  name: string;
  description: string;
  category: string;
  price: string;
  features: string[];
  whatsInTheBox: string[];
  warranty: string;
  manual: string;
}

const initialForm: ProductForm = {
  name: "",
  description: "",
  category: "",
  price: "",
  features: [""],
  whatsInTheBox: [""],
  warranty: "",
  manual: "",
};

const ProductsManager = () => {
  const [form, setForm] = useState<ProductForm>(initialForm);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting product:", form);
    
    try {
      const response = await fetch(`${SERVER_URL}/src/server/products.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      const data = await response.json();
      console.log('Product saved successfully:', data);
      
      toast({
        title: "Success",
        description: "Product saved successfully",
      });
      
      setForm(initialForm);
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addFeature = () => {
    setForm(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }));
  };

  const addBoxItem = () => {
    setForm(prev => ({
      ...prev,
      whatsInTheBox: [...prev.whatsInTheBox, ""]
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={form.category}
              onValueChange={(value) => setForm(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              value={form.price}
              onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Features</Label>
            {form.features.map((feature, index) => (
              <Input
                key={index}
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...form.features];
                  newFeatures[index] = e.target.value;
                  setForm(prev => ({ ...prev, features: newFeatures }));
                }}
              />
            ))}
            <Button type="button" variant="outline" onClick={addFeature}>
              Add Feature
            </Button>
          </div>

          <div className="space-y-2">
            <Label>What's in the Box</Label>
            {form.whatsInTheBox.map((item, index) => (
              <Input
                key={index}
                value={item}
                onChange={(e) => {
                  const newItems = [...form.whatsInTheBox];
                  newItems[index] = e.target.value;
                  setForm(prev => ({ ...prev, whatsInTheBox: newItems }));
                }}
              />
            ))}
            <Button type="button" variant="outline" onClick={addBoxItem}>
              Add Box Item
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="warranty">Warranty Information</Label>
            <Textarea
              id="warranty"
              value={form.warranty}
              onChange={(e) => setForm(prev => ({ ...prev, warranty: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="manual">Manual URL</Label>
            <Input
              id="manual"
              value={form.manual}
              onChange={(e) => setForm(prev => ({ ...prev, manual: e.target.value }))}
            />
          </div>

          <Button type="submit">Save Product</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductsManager;
