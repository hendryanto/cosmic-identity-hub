import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

interface ImageSliderProps {
  images: string[];
}

export const ImageSlider = ({ images }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <Carousel
      className="w-full max-w-xs mx-auto"
      currentIndex={currentIndex}
      onSelect={setCurrentIndex}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center p-6 relative">
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};