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
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

interface EventForm {
  id?: number;  // Added id as optional since new events won't have an id
  title: string;
  description: string;
  date: string;
  image: string;
  content: string;
}

const initialForm: EventForm = {
  title: "",
  description: "",
  date: "",
  image: "",
  content: "",
};

const EventsManager = () => {
  const [form, setForm] = useState<EventForm>(initialForm);
  const [events, setEvents] = useState<EventForm[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting event:", form);

    try {
      const response = await fetch('http://localhost/src/server/events.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to save event');
      }

      const data = await response.json();
      console.log('Event saved:', data);
      
      // Update the events array with the new event including its id from the response
      const newEvent = { ...form, id: data.id };
      setEvents(prev => [...prev, newEvent]);
      setForm(initialForm);
      
      toast({
        title: "Success",
        description: "Event saved successfully",
      });
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: "Error",
        description: "Failed to save event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (index: number) => {
    try {
      const eventToDelete = events[index];
      // Only proceed with deletion if we have an id
      if (!eventToDelete.id) {
        throw new Error('Event ID not found');
      }

      const response = await fetch(`http://localhost/src/server/events.php?id=${eventToDelete.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setEvents(prev => prev.filter((_, i) => i !== index));
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Event Date</Label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) => setForm(prev => ({ ...prev, image: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Event Content (HTML)</Label>
              <Textarea
                id="content"
                value={form.content}
                onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                className="min-h-[200px]"
              />
            </div>

            <Button type="submit">Save Event</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsManager;