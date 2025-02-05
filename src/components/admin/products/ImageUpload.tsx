import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { ImageSlider } from "./ImageSlider";
import { SERVER_URL } from "../../../config/serverConfig";
import { useToast } from "../../ui/use-toast";

interface ImageUploadProps {
  onUpload: (imageUrl: string) => void;
  existingImages: string[];
}

export const ImageUpload = ({ onUpload, existingImages }: ImageUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

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
      console.log('Uploading image to:', `${SERVER_URL}/src/server/upload.php`);
      const response = await fetch(`${SERVER_URL}/src/server/upload.php`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      console.log('Image uploaded successfully:', data);
      onUpload(data.imageUrl);
      setSelectedFile(null);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
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