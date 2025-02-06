import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Card, CardContent } from "../../ui/card";
import { 
  Image, 
  Type, 
  Square, 
  Circle as CircleIcon,
  Trash2,
  Move,
  PaintBucket,
  TextCursor,
  Palette,
  SunDim
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
  const [selectedTool, setSelectedTool] = useState<string>("select");
  const [textInput, setTextInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState("20");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [opacity, setOpacity] = useState("100");

  const fonts = [
    "Arial",
    "Times New Roman",
    "Helvetica",
    "Courier New",
    "Georgia",
    "Verdana"
  ];

  const colors = [
    "#000000", // Black
    "#ea384c", // Red
    "#8B5CF6", // Purple
    "#0EA5E9", // Blue
    "#F97316", // Orange
    "#22C55E", // Green
    "#D946EF", // Magenta
    "#ffffff", // White
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: backgroundColor,
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

  const updateSelectedObject = (property: string, value: any) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set(property, value);
      canvas.renderAll();
      const json = canvas.toJSON();
      onChange(JSON.stringify(json));
    }
  };

  const addText = () => {
    if (!canvas || !textInput) return;
    const text = new fabric.Text(textInput, {
      left: 100,
      top: 100,
      fontSize: parseInt(fontSize),
      fontFamily: fontFamily,
      fill: selectedColor,
      opacity: parseInt(opacity) / 100
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    setTextInput("");
    const json = canvas.toJSON();
    onChange(JSON.stringify(json));
  };

  const addShape = (type: "rect" | "circle") => {
    if (!canvas) return;
    
    const shape = type === "rect" 
      ? new fabric.Rect({
          left: 100,
          top: 100,
          fill: selectedColor,
          width: 100,
          height: 100,
          opacity: parseInt(opacity) / 100
        })
      : new fabric.Circle({
          left: 100,
          top: 100,
          fill: selectedColor,
          radius: 50,
          opacity: parseInt(opacity) / 100
        });

    canvas.add(shape);
    canvas.setActiveObject(shape);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !e.target.files?.[0]) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;
      
      fabric.Image.fromURL(event.target.result.toString(), {
        crossOrigin: 'anonymous'
      }).then((img) => {
        img.scale(0.5);
        canvas.add(img);
        canvas.setActiveObject(img);
        const json = canvas.toJSON();
        onChange(JSON.stringify(json));
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateBackgroundColor = (color: string) => {
    if (!canvas) return;
    canvas.set('backgroundColor', color);
    canvas.renderAll();
    const json = canvas.toJSON();
    onChange(JSON.stringify(json));
    setBackgroundColor(color);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <Button
            variant={selectedTool === "select" ? "default" : "outline"}
            onClick={() => setSelectedTool("select")}
          >
            <Move className="w-4 h-4 mr-2" />
            Select
          </Button>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="text-input">Text:</Label>
            <Input
              id="text-input"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-40"
            />
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger className="w-32">
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
            <Input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-20"
              placeholder="Size"
            />
            <Button onClick={addText} variant="outline">
              <TextCursor className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          <Button onClick={() => addShape("rect")} variant="outline">
            <Square className="w-4 h-4 mr-2" />
            Rectangle
          </Button>

          <Button onClick={() => addShape("circle")} variant="outline">
            <CircleIcon className="w-4 h-4 mr-2" />
            Circle
          </Button>

          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <Label htmlFor="image-upload" className="cursor-pointer">
              <Button variant="outline" onClick={() => {}}>
                <Image className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Label>Fill:</Label>
            <div className="flex gap-1">
              {colors.map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded cursor-pointer border border-gray-300"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setSelectedColor(color);
                    updateSelectedObject('fill', color);
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Label>Background:</Label>
            <div className="flex gap-1">
              {colors.map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded cursor-pointer border border-gray-300"
                  style={{ backgroundColor: color }}
                  onClick={() => updateBackgroundColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Label>Opacity:</Label>
            <Input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => {
                setOpacity(e.target.value);
                updateSelectedObject('opacity', parseInt(e.target.value) / 100);
              }}
              className="w-24"
            />
            <span>{opacity}%</span>
          </div>

          <Button onClick={deleteSelected} variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} className="max-w-full" />
        </div>
      </CardContent>
    </Card>
  );
};
