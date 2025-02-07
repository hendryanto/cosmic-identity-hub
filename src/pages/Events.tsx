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
import { SERVER_URL } from "../config/serverConfig";
import { Event } from "../types/event";

const Events = () => {
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      console.log("Fetching events from server...");
      const response = await fetch(`${SERVER_URL}/src/server/events.php`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      console.log("Fetched events:", data);
      return data as Event[];
    },
  });

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/placeholder.svg';
    if (imagePath.startsWith('http')) return imagePath;
    return `/lovable-uploads/${imagePath}`;
  };

  if (error) {
    console.error("Error loading events:", error);
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto pt-24 px-4">
        <div className="flex items-center gap-2 mb-8">
          <Calendar className="h-8 w-8 text-red-500" />
          <h1 className="text-3xl font-bold">Events</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p>Loading events...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">
            Failed to load events. Please try again later.
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-500">
            No events available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {events.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`}>
                <Card className="hover:shadow-lg transition-shadow border border-gray-200">
                  <CardHeader className="p-0">
                    <img
                      src={getImageUrl(event.images?.[0] || '')}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;