import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    image: "/lovable-uploads/67211670-08f8-4491-8217-e15cdf3d054b.png",
    title: "Happy Chinese New Year 2025",
    subtitle: "Samsung TV & Audio wish you prosperity and good fortune",
    productLink: "/products/1",
    cta: {
      primary: { text: "Buy now", link: "#" },
      secondary: { text: "Learn more", link: "#" }
    }
  },
  // Add more slides as needed
];

const VideoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSlideClick = (productLink: string) => {
    navigate(productLink);
  };

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 cursor-pointer ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => handleSlideClick(slide.productLink)}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent">
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                {slide.subtitle}
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  variant="default"
                  className="bg-black text-white hover:bg-black/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = slide.cta.primary.link;
                  }}
                >
                  {slide.cta.primary.text}
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = slide.cta.secondary.link;
                  }}
                >
                  {slide.cta.secondary.text}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default VideoSlider;