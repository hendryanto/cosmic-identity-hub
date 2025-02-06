import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

declare const fabric: any; // This declares the global fabric object

const EventDetail = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      canvas.setDimensions({ width: 800, height: 600 });

      // Example event details
      const eventDetails = {
        title: "Tech Conference 2024",
        date: new Date(),
        location: "Convention Center",
        description: "Join us for an exciting tech conference featuring industry leaders and innovative discussions.",
      };

      // Add text objects to canvas
      const title = new fabric.IText(eventDetails.title, {
        left: 50,
        top: 50,
        fontSize: 40,
        fontFamily: 'Arial',
      });

      const dateText = new fabric.IText(format(eventDetails.date, 'MMMM dd, yyyy'), {
        left: 50,
        top: 100,
        fontSize: 24,
        fontFamily: 'Arial',
      });

      const locationText = new fabric.IText(eventDetails.location, {
        left: 50,
        top: 140,
        fontSize: 20,
        fontFamily: 'Arial',
      });

      canvas.add(title);
      canvas.add(dateText);
      canvas.add(locationText);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <canvas ref={canvasRef} className="border rounded-lg shadow-lg" />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Tech Conference 2024</h1>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{format(new Date(), 'MMMM dd, yyyy')}</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <p>
                Join us for an exciting tech conference featuring industry leaders and innovative discussions.
                Network with professionals, learn about the latest technologies, and participate in hands-on
                workshops.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Event Details</h2>
              <ul className="space-y-2">
                <li>Location: Convention Center</li>
                <li>Time: 9:00 AM - 5:00 PM</li>
                <li>Capacity: 500 attendees</li>
                <li>Type: In-person</li>
              </ul>
            </div>

            <Button className="w-full md:w-auto">
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;