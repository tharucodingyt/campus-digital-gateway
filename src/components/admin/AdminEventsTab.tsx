
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, Calendar, Search } from "lucide-react";

// Mock data for events
const initialEvents = [
  {
    id: "1",
    title: "Annual Sports Day",
    date: "2025-05-15",
    category: "Event",
    description: "Our annual sports day will be held on the school grounds. All students are encouraged to participate in various events.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=840&q=80",
  },
  {
    id: "2",
    title: "Science Exhibition Winners",
    date: "2025-04-28",
    category: "Achievement",
    description: "Congratulations to our students who won the district-level science exhibition with their innovative projects.",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=774&q=80",
  },
  {
    id: "3",
    title: "Parent-Teacher Meeting",
    date: "2025-06-10",
    category: "Notice",
    description: "The next parent-teacher meeting will be held in the main auditorium. Parents are requested to attend.",
    image: "https://images.unsplash.com/photo-1577896852618-3b02a11df647?auto=format&fit=crop&w=1770&q=80",
  },
];

const AdminEventsTab = () => {
  const [events, setEvents] = useState(initialEvents);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEvent, setEditingEvent] = useState<null | {
    id: string;
    title: string;
    date: string;
    category: string;
    description: string;
    image: string;
  }>(null);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    category: "",
    description: "",
    image: "",
  });

  const handleAddEvent = () => {
    const event = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: newEvent.date,
      category: newEvent.category,
      description: newEvent.description,
      image: newEvent.image,
    };

    setEvents([...events, event]);
    setNewEvent({
      title: "",
      date: "",
      category: "",
      description: "",
      image: "",
    });
    setIsAddingEvent(false);
  };

  const handleEditEvent = () => {
    if (!editingEvent) return;

    const updatedEvents = events.map((event) =>
      event.id === editingEvent.id ? editingEvent : event
    );

    setEvents(updatedEvents);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
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
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
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
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
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
                value={newEvent.image}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, image: e.target.value })
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
                value={editingEvent.date}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, date: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-category" className="text-sm font-medium">
                Category
              </label>
              <Input
                id="edit-category"
                value={editingEvent.category}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, category: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="edit-description"
                value={editingEvent.description}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, description: e.target.value })
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
                value={editingEvent.image}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, image: e.target.value })
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

      <div className="grid grid-cols-1 gap-4">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="sm:flex">
              <div className="sm:w-1/3 h-48 sm:h-auto">
                <img
                  src={event.image}
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
                        {new Date(event.date).toLocaleDateString()}
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded-full">
                          {event.category}
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
                  <p className="text-sm">{event.description}</p>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminEventsTab;
