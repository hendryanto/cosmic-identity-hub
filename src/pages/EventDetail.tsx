import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "../config/serverConfig";
import { Event } from "../types/event";
import { Skeleton } from "@/components/ui/skeleton";

declare const fabric: any;

const EventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      console.log('Fetching event details for id:', id);
      const response = await fetch(`${SERVER_URL}/src/server/events.php?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event details');
      }
      const data = await response.json();
      console.log('Fetched event details:', data);
      return data as Event;
    },
  });

  useEffect(() => {
    if (canvasRef.current && event) {
      const canvas = new fabric.Canvas(canvasRef.current);
      canvas.setDimensions({ width: 800, height: 600 });

      // Add text objects to canvas
      const title = new fabric.IText(event.title, {
        left: 50,
        top: 50,
        fontSize: 40,
        fontFamily: 'Arial',
      });

      const dateText = new fabric.IText(format(new Date(event.date), 'MMMM dd, yyyy'), {
        left: 50,
        top: 100,
        fontSize: 24,
        fontFamily: 'Arial',
      });

      const locationText = new fabric.IText('Convention Center', {
        left: 50,
        top: 140,
        fontSize: 20,
        fontFamily: 'Arial',
      });

      canvas.add(title);
      canvas.add(dateText);
      canvas.add(locationText);
    }
  }, [event]);

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="text-center text-red-600">
            Error loading event details. Please try again later.
          </div>
        </div>
      </div>
    );
  }

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
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20" />
              </div>
            ) : event ? (
              <>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p>{event.description}</p>
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
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;