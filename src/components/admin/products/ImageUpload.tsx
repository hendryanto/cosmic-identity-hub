import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { ImageSlider } from "./ImageSlider";

interface ImageUploadProps {
  onUpload: (imageUrl: string) => void;
  existingImages: string[];
}

export const ImageUpload = ({ onUpload, existingImages }: ImageUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      onUpload(data.imageUrl);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Product Images</Label>
        <div className="flex gap-4 items-end">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="flex-1"
          />
          <Button 
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </div>
      </div>
      
      {existingImages.length > 0 && (
        <div className="mt-4">
          <Label>Current Images</Label>
          <ImageSlider images={existingImages} />
        </div>
      )}
    </div>
  );
};