
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, Calendar, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  event_date: string;
  content: string;
  image_url: string;
  is_event: boolean;
  category?: string;
  created_at?: string;
  updated_at?: string;
  status: 'draft' | 'published' | 'archived';
}

const AdminEventsTab = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [newEvent, setNewEvent] = useState({
    title: "",
    event_date: "",
    category: "",
    content: "",
    image_url: "",
    is_event: true,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('news_events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching events:", error);
        toast({
          title: "Error",
          description: "Failed to fetch events. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Error",
        description: "Failed to fetch events. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEvent = async () => {
    try {
      const { data, error } = await supabase.from('news_events').insert([
        {
          title: newEvent.title,
          event_date: newEvent.event_date,
          content: newEvent.content,
          image_url: newEvent.image_url,
          is_event: newEvent.is_event,
          status: 'published'
        }
      ]).select();

      if (error) {
        console.error("Error adding event:", error);
        toast({
          title: "Error",
          description: "Failed to add event. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Event/news item added successfully.",
      });

      // Reset form and refresh events list
      setNewEvent({
        title: "",
        event_date: "",
        category: "",
        content: "",
        image_url: "",
        is_event: true,
      });
      setIsAddingEvent(false);
      fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error);
      toast({
        title: "Error",
        description: "Failed to add event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditEvent = async () => {
    if (!editingEvent) return;

    try {
      const { error } = await supabase
        .from('news_events')
        .update({
          title: editingEvent.title,
          event_date: editingEvent.event_date,
          content: editingEvent.content,
          image_url: editingEvent.image_url,
          is_event: editingEvent.is_event
        })
        .eq('id', editingEvent.id);

      if (error) {
        console.error("Error updating event:", error);
        toast({
          title: "Error",
          description: "Failed to update event. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Event/news item updated successfully.",
      });

      setEditingEvent(null);
      fetchEvents();
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        title: "Error",
        description: "Failed to update event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news_events')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting event:", error);
        toast({
          title: "Error",
          description: "Failed to delete event. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Event/news item deleted successfully.",
      });

      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search events"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddingEvent(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {isAddingEvent && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Event</CardTitle>
            <CardDescription>Create a new event or news item</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Event Title
              </label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                placeholder="e.g., Annual Science Fair"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <Input
                id="date"
                type="date"
                value={newEvent.event_date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, event_date: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Input
                id="category"
                value={newEvent.category}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, category: e.target.value })
                }
                placeholder="e.g., Event, Notice, Achievement"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                value={newEvent.content}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, content: e.target.value })
                }
                placeholder="Describe the event"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="image"
                value={newEvent.image_url}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, image_url: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingEvent(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Save Event</Button>
          </CardFooter>
        </Card>
      )}

      {editingEvent && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Event</CardTitle>
            <CardDescription>Update event details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="edit-title" className="text-sm font-medium">
                Event Title
              </label>
              <Input
                id="edit-title"
                value={editingEvent.title}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-date" className="text-sm font-medium">
                Date
              </label>
              <Input
                id="edit-date"
                type="date"
                value={editingEvent.event_date?.split('T')[0] || ''}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, event_date: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="edit-description"
                value={editingEvent.content}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, content: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-image" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="edit-image"
                value={editingEvent.image_url || ''}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, image_url: e.target.value })
                }
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setEditingEvent(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditEvent}>Update Event</Button>
          </CardFooter>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center py-10">
          <p>Loading events...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-10">
          <p>No events found. Create your first event by clicking "Add Event" above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="sm:flex">
                <div className="sm:w-1/3 h-48 sm:h-auto">
                  <img
                    src={event.image_url || "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                </div>
                <div className="sm:w-2/3">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {event.event_date ? new Date(event.event_date).toLocaleDateString() : 'No date'}
                          <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded-full">
                            {event.is_event ? 'Event' : 'News'}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingEvent(event)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{event.content}</p>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEventsTab;
