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

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  productLink: string;
  cta: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };
}

const initialSlide: Slide = {
  image: "",
  title: "",
  subtitle: "",
  productLink: "",
  cta: {
    primary: { text: "", link: "" },
    secondary: { text: "", link: "" },
  },
};

const SlideManager = () => {
  const [slides, setSlides] = useState<Slide[]>([initialSlide]);

  const handleAddSlide = () => {
    setSlides([...slides, { ...initialSlide }]);
  };

  const handleRemoveSlide = (index: number) => {
    setSlides(slides.filter((_, i) => i !== index));
  };

  const handleSlideChange = (index: number, field: string, value: string) => {
    const newSlides = [...slides];
    if (field.startsWith("cta.")) {
      const [ctaType, ctaField, subField] = field.split(".");
      newSlides[index].cta[ctaField][subField] = value;
    } else {
      newSlides[index][field as keyof Omit<Slide, "cta">] = value;
    }
    setSlides(newSlides);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving slides:", slides);
    // Here you would typically save to your backend
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Slider Images</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {slides.map((slide, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Slide {index + 1}</h3>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleRemoveSlide(index)}
                >
                  Remove Slide
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={slide.image}
                    onChange={(e) => handleSlideChange(index, "image", e.target.value)}
                    placeholder="Image URL"
                  />
                </div>

                <div>
                  <Label>Title</Label>
                  <Input
                    value={slide.title}
                    onChange={(e) => handleSlideChange(index, "title", e.target.value)}
                    placeholder="Slide title"
                  />
                </div>

                <div>
                  <Label>Subtitle</Label>
                  <Input
                    value={slide.subtitle}
                    onChange={(e) => handleSlideChange(index, "subtitle", e.target.value)}
                    placeholder="Slide subtitle"
                  />
                </div>

                <div>
                  <Label>Product Link</Label>
                  <Input
                    value={slide.productLink}
                    onChange={(e) => handleSlideChange(index, "productLink", e.target.value)}
                    placeholder="Link to product page"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Primary Button Text</Label>
                    <Input
                      value={slide.cta.primary.text}
                      onChange={(e) => handleSlideChange(index, "cta.primary.text", e.target.value)}
                      placeholder="Primary button text"
                    />
                  </div>
                  <div>
                    <Label>Primary Button Link</Label>
                    <Input
                      value={slide.cta.primary.link}
                      onChange={(e) => handleSlideChange(index, "cta.primary.link", e.target.value)}
                      placeholder="Primary button link"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Secondary Button Text</Label>
                    <Input
                      value={slide.cta.secondary.text}
                      onChange={(e) => handleSlideChange(index, "cta.secondary.text", e.target.value)}
                      placeholder="Secondary button text"
                    />
                  </div>
                  <div>
                    <Label>Secondary Button Link</Label>
                    <Input
                      value={slide.cta.secondary.link}
                      onChange={(e) => handleSlideChange(index, "cta.secondary.link", e.target.value)}
                      placeholder="Secondary button link"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button type="button" onClick={handleAddSlide} className="w-full">
            Add New Slide
          </Button>

          <Button type="submit" className="w-full">
            Save All Slides
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SlideManager;