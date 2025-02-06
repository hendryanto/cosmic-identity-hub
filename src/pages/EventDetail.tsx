import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
        content: `
          <p>We are excited to announce the launch of our newest rice cooker series! Join us for an exclusive event where we'll showcase the advanced features and innovative technology behind our latest products.</p>
          <h3>Event Highlights:</h3>
          <ul>
            <li>Product demonstration</li>
            <li>Cooking showcase</li>
            <li>Special launch day discounts</li>
            <li>Free gifts for attendees</li>
          </ul>
          <p>Don't miss this opportunity to be among the first to experience our new rice cooker series!</p>
        `
      };
    },
  });

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
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: event?.content || "" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;