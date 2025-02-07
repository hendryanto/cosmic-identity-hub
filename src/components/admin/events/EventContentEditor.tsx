import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Card, CardContent } from "../../ui/card";
import { 
  Image,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Type,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface EventContentEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

export const EventContentEditor = ({ initialContent, onChange }: EventContentEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fontSize, setFontSize] = useState("16");
  const [textColor, setTextColor] = useState("#000000");

  const fonts = [
    "Arial",
    "Times New Roman",
    "Helvetica",
    "Georgia",
    "Verdana",
    "Courier New"
  ];

  const fontSizes = [
    "12", "14", "16", "18", "20", "24", "28", "32", "36", "48"
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    if (initialContent) {
      fabricCanvas.loadFromJSON(initialContent, () => {
        fabricCanvas.renderAll();
      });
    }

    fabricCanvas.on("object:modified", () => {
      const json = fabricCanvas.toJSON();
      onChange(JSON.stringify(json));
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const addText = () => {
    if (!canvas) return;
    const text = new fabric.IText("Click to edit text", {
      left: 50,
      top: 50,
      fontFamily: selectedFont,
      fontSize: parseInt(fontSize),
      fill: textColor,
      width: 300,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    const json = canvas.toJSON();
    onChange(JSON.stringify(json));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !e.target.files?.[0]) return;
    console.log("Uploading image:", e.target.files[0].name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;
      console.log("Image loaded into FileReader");
      
      fabric.Image.fromURL(event.target.result.toString(), {
        crossOrigin: 'anonymous'
      }).then((img) => {
        console.log("Image created from URL");
        img.scale(0.5);
        canvas.add(img);
        canvas.setActiveObject(img);
        const json = canvas.toJSON();
        onChange(JSON.stringify(json));
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const applyTextStyle = (style: string) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject || !(activeObject instanceof fabric.IText)) return;

    switch (style) {
      case 'bold':
        activeObject.set('fontWeight', activeObject.fontWeight === 'bold' ? 'normal' : 'bold');
        break;
      case 'italic':
        activeObject.set('fontStyle', activeObject.fontStyle === 'italic' ? 'normal' : 'italic');
        break;
      case 'underline':
        activeObject.set('underline', !activeObject.underline);
        break;
      case 'alignLeft':
        activeObject.set('textAlign', 'left');
        break;
      case 'alignCenter':
        activeObject.set('textAlign', 'center');
        break;
      case 'alignRight':
        activeObject.set('textAlign', 'right');
        break;
    }

    canvas.renderAll();
    const json = canvas.toJSON();
    onChange(JSON.stringify(json));
  };

  const deleteSelected = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      const json = canvas.toJSON();
      onChange(JSON.stringify(json));
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-4 mb-4 items-center border-b pb-4">
          {/* Text Controls */}
          <Button variant="outline" onClick={addText}>
            <Type className="w-4 h-4 mr-2" />
            Add Text
          </Button>

          <Select value={selectedFont} onValueChange={setSelectedFont}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font} value={font}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-12 h-8 p-0 border-none"
          />

          <div className="flex gap-1">
            <Button size="icon" variant="outline" onClick={() => applyTextStyle('bold')}>
              <Bold className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={() => applyTextStyle('italic')}>
              <Italic className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={() => applyTextStyle('underline')}>
              <Underline className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-1">
            <Button size="icon" variant="outline" onClick={() => applyTextStyle('alignLeft')}>
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={() => applyTextStyle('alignCenter')}>
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={() => applyTextStyle('alignRight')}>
              <AlignRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Image Upload */}
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <Label htmlFor="image-upload">
              <Button variant="outline" asChild>
                <span>
                  <Image className="w-4 h-4 mr-2" />
                  Add Image
                </span>
              </Button>
            </Label>
          </div>

          <Button variant="destructive" size="icon" onClick={deleteSelected}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} className="max-w-full" />
        </div>
      </CardContent>
    </Card>
  );
};