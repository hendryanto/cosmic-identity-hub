import { useState } from "react";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

const Events = () => {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      // This would be replaced with actual API call
      return [
        {
          id: 1,
          title: "Product Launch: New Rice Cooker Series",
          description: "Join us for the launch of our latest rice cooker series with advanced features.",
          date: "2024-03-15",
          image: "/lovable-uploads/42c7ecd0-4323-444c-a0d5-374d9404a16e.png"
        },
        {
          id: 2,
          title: "Cooking Workshop with Chef",
          description: "Learn to cook delicious meals using Cosmos appliances.",
          date: "2024-03-20",
          image: "/lovable-uploads/43efd89a-bcf3-41f9-b9d1-5a305bfd1e07.png"
        },
      ] as Event[];
    },
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto pt-24 px-4">
        <div className="flex items-center gap-2 mb-8">
          <Calendar className="h-8 w-8 text-red-500" />
          <h1 className="text-3xl font-bold">Events</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {isLoading ? (
            <p>Loading events...</p>
          ) : (
            events.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`}>
                <Card className="hover:shadow-lg transition-shadow border border-gray-200">
                  <CardHeader className="p-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <p className="text-red-500">
                      {new Date(event.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }).split('/').join('/')}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;