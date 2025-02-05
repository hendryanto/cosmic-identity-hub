import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useToast } from "../ui/use-toast";
import { SERVER_URL } from "../../config/serverConfig";
import ProductForm from "./products/ProductForm";
import { ProductFormData } from "../../types/product";

const ProductsManager = () => {
  const { toast } = useToast();

  const handleSubmit = async (form: ProductFormData) => {
    console.log("Submitting product:", form);
    
    try {
      console.log("Making request to:", `${SERVER_URL}/src/server/products.php`);
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
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductForm onSubmit={handleSubmit} />
      </CardContent>
    </Card>
  );
};

export default ProductsManager;