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
  Move
} from "lucide-react";

interface EventContentEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

export const EventContentEditor = ({ initialContent, onChange }: EventContentEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>("select");
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    // Load initial content if exists
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
    if (!canvas || !textInput) return;
    const text = new fabric.Text(textInput, {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: "#000000"
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
          fill: "#f87171",
          width: 100,
          height: 100
        })
      : new fabric.Circle({
          left: 100,
          top: 100,
          fill: "#f87171",
          radius: 50
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

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex gap-4 mb-4">
          <Button
            variant={selectedTool === "select" ? "default" : "outline"}
            onClick={() => setSelectedTool("select")}
          >
            <Move className="w-4 h-4 mr-2" />
            Select
          </Button>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="text-input">Add Text:</Label>
            <Input
              id="text-input"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-40"
            />
            <Button onClick={addText} variant="outline">
              <Type className="w-4 h-4 mr-2" />
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
