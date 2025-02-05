import { useState } from "react";
import { Button } from "../../ui/button";
import { ProductFormData } from "../../../types/product";
import { ImageUpload } from "./ImageUpload";
import { BasicInfo } from "./form-sections/BasicInfo";
import { Features } from "./form-sections/Features";
import { BoxContents } from "./form-sections/BoxContents";
import { Documentation } from "./form-sections/Documentation";

interface ProductFormProps {
  onSubmit: (form: ProductFormData) => void;
  initialForm?: ProductFormData;
}

const ProductForm = ({ onSubmit, initialForm }: ProductFormProps) => {
  const [form, setForm] = useState<ProductFormData>(
    initialForm || {
      name: "",
      description: "",
      category: "",
      price: "",
      features: [""],
      whatsInTheBox: [""],
      warranty: "",
      manual: "",
      images: [],
    }
  );

  const handleImageUpload = (imageUrl: string) => {
    setForm(prev => ({
      ...prev,
      images: [...prev.images, imageUrl]
    }));
  };

  const updateForm = (updates: Partial<ProductFormData>) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfo form={form} onUpdate={updateForm} />
      
      <ImageUpload onUpload={handleImageUpload} existingImages={form.images} />
      
      <Features 
        features={form.features} 
        onChange={(features) => updateForm({ features })} 
      />
      
      <BoxContents 
        items={form.whatsInTheBox} 
        onChange={(items) => updateForm({ whatsInTheBox: items })} 
      />
      
      <Documentation 
        warranty={form.warranty}
        manual={form.manual}
        onUpdate={updateForm}
      />

      <Button type="submit">Save Product</Button>
    </form>
  );
};

export default ProductForm;