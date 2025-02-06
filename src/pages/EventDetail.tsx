import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { fabric } from "fabric";
import { useEffect, useRef } from "react";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      // This would be replaced with actual API call
      return {
        id: Number(id),
        title: "Product Launch: New Rice Cooker Series",
        description: "Join us for the launch of our latest rice cooker series with advanced features.",
        date: "2024-03-15",
        image: "/lovable-uploads/42c7ecd0-4323-444c-a0d5-374d9404a16e.png",
        content: `{"version":"5.3.0","objects":[{"type":"text","version":"5.3.0","originX":"left","originY":"top","left":100,"top":100,"width":300,"height":45.2,"fill":"#000000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"text":"Event Content Example","fontSize":40,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"normal","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"path":null,"direction":"ltr","minWidth":20,"splitByGrapheme":false,"styles":{}}],"background":"#ffffff"}`
      };
    },
  });

  useEffect(() => {
    if (!canvasRef.current || !event?.content) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
    });

    try {
      canvas.loadFromJSON(event.content, () => {
        canvas.renderAll();
      });
    } catch (error) {
      console.error("Error loading canvas content:", error);
    }

    // Make canvas static (non-interactive)
    canvas.selection = false;
    canvas.forEachObject((obj) => {
      obj.selectable = false;
      obj.hoverCursor = "default";
    });

    return () => {
      canvas.dispose();
    };
  }, [event?.content]);

  if (isLoading) return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto pt-24 px-4">
        Loading...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto pt-24 px-4">
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-2 text-red-500 hover:text-red-600"
          onClick={() => navigate("/events")}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Events
        </Button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <img
            src={event?.image}
            alt={event?.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-red-500" />
              <span className="text-red-500">
                {event?.date && new Date(event.date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }).split('/').join('/')}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{event?.title}</h1>
            <p className="text-gray-600 mb-8">{event?.description}</p>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
              <canvas ref={canvasRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;