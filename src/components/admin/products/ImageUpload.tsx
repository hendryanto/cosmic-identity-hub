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
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles) return;

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const formData = new FormData();
        formData.append('image', selectedFiles[i]);

        console.log('Uploading image:', selectedFiles[i].name);
        const response = await fetch(`${SERVER_URL}/src/server/upload.php`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');

        const data = await response.json();
        console.log('Image uploaded successfully:', data);
        onUpload(data.imageUrl);
      }

      setSelectedFiles(null);
      // Clear the input
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (input) input.value = '';
      
      toast({
        title: "Success",
        description: "Images uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Error",
        description: "Failed to upload images. Please try again.",
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
            multiple
            onChange={handleFileSelect}
            className="flex-1"
          />
          <Button 
            type="button"
            onClick={handleUpload}
            disabled={!selectedFiles}
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