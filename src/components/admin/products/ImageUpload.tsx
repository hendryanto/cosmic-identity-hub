import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { ImageSlider } from "./ImageSlider";
import { SERVER_URL } from "../../../config/serverConfig";
import { useToast } from "../../ui/use-toast";
import { Progress } from "../../ui/progress";

interface ImageUploadProps {
  onUpload: (imageUrl: string) => void;
  existingImages: string[];
}

export const ImageUpload = ({ onUpload, existingImages }: ImageUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
      console.log("Files selected:", e.target.files.length);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles) return;

    setIsUploading(true);
    setUploadProgress(0);
    const totalFiles = selectedFiles.length;
    let uploadedCount = 0;

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const formData = new FormData();
        formData.append('image', selectedFiles[i]);

        console.log('Uploading image:', selectedFiles[i].name);
        const response = await fetch(`${SERVER_URL}/src/server/upload.php`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed for ${selectedFiles[i].name}`);
        }

        const data = await response.json();
        console.log('Image uploaded successfully:', data);
        onUpload(data.imageUrl);
        
        uploadedCount++;
        setUploadProgress((uploadedCount / totalFiles) * 100);
      }

      setSelectedFiles(null);
      // Clear the input
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (input) input.value = '';
      
      toast({
        title: "Success",
        description: `${totalFiles} image${totalFiles > 1 ? 's' : ''} uploaded successfully`,
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Error",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
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
            disabled={isUploading}
          />
          <Button 
            type="button"
            onClick={handleUpload}
            disabled={!selectedFiles || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </div>

      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-sm text-gray-500 text-center">
            Uploading... {Math.round(uploadProgress)}%
          </p>
        </div>
      )}
      
      {existingImages.length > 0 && (
        <div className="mt-4">
          <Label>Current Images</Label>
          <ImageSlider images={existingImages} />
        </div>
      )}
    </div>
  );
};