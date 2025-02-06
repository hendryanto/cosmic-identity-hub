import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { ImageUpload } from "../products/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Event } from "../../../types/event";
import { useToast } from "../../ui/use-toast";
import { SERVER_URL } from "../../../config/serverConfig";
import { EventContentEditor } from "./EventContentEditor";

interface EventFormProps {
  event?: Event;
  onSave: () => void;
  onCancel?: () => void;
}

const EventForm = ({ event, onSave, onCancel }: EventFormProps) => {
  const [form, setForm] = useState<Partial<Event>>(event || {
    title: "",
    description: "",
    date: "",
    content: "",
    images: [],
  });
  const { toast } = useToast();

  const handleImageUpload = (imageUrl: string) => {
    setForm(prev => ({
      ...prev,
      images: [...(prev.images || []), imageUrl]
    }));
  };

  const handleImageDelete = (imageUrl: string) => {
    setForm(prev => ({
      ...prev,
      images: (prev.images || []).filter(img => img !== imageUrl)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SERVER_URL}/src/server/events.php`, {
        method: event ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to save event');
      }

      toast({
        title: "Success",
        description: `Event ${event ? 'updated' : 'created'} successfully`,
      });
      onSave();
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: "Error",
        description: "Failed to save event",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event ? 'Edit Event' : 'Add New Event'}</CardTitle>
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
            <Label>Event Images</Label>
            <ImageUpload
              onUpload={handleImageUpload}
              existingImages={form.images || []}
              onDelete={handleImageDelete}
            />
          </div>

          <div className="space-y-2">
            <Label>Event Content</Label>
            <EventContentEditor
              initialContent={form.content}
              onChange={(content) => setForm(prev => ({ ...prev, content: content }))}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit">
              {event ? 'Update Event' : 'Create Event'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventForm;