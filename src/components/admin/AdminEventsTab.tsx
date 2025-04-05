
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  category: string;
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
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const [newEvent, setNewEvent] = useState({
    title: "",
    event_date: "",
    category: "news", // Default category
    content: "",
    image_url: "",
    is_event: false,
  });

  // Event categories
  const eventCategories = [
    { value: "news", label: "News" },
    { value: "calendar", label: "Calendar Events" },
    { value: "gallery", label: "Gallery" },
    { value: "newsletter", label: "Newsletter" }
  ];

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

      // Process events data to ensure each event has a category
      const formattedEvents = data.map(event => {
        // Default category
        let category = "news";
        
        if (event.is_event) {
          category = "calendar";
        }
        
        // Try to extract category from event content
        if (event.content) {
          // First check if there's a category tag
          const categoryMatch = event.content.match(/category:([a-zA-Z]+)/i);
          if (categoryMatch && categoryMatch[1]) {
            category = categoryMatch[1].toLowerCase();
          }
        }
        
        return {
          ...event,
          category
        };
      });

      console.log("Fetched events:", formattedEvents);
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error in fetchEvents:", error);
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
      console.log("Adding new event:", newEvent);
      
      // Set is_event based on category
      const isEvent = newEvent.category === "calendar";
      
      // Prepare content with category metadata
      let finalContent = newEvent.content || "";
      
      // Add category as metadata in the content if it doesn't exist
      if (!finalContent.includes("category:")) {
        finalContent = `${finalContent.trim()}\n\ncategory:${newEvent.category}`;
      }
      
      const { data, error } = await supabase.from('news_events').insert([
        {
          title: newEvent.title,
          event_date: newEvent.category === "calendar" ? newEvent.event_date : null,
          content: finalContent,
          image_url: newEvent.image_url,
          is_event: isEvent,
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
        description: "Content added successfully.",
      });

      // Reset form and refresh events list
      setNewEvent({
        title: "",
        event_date: "",
        category: "news",
        content: "",
        image_url: "",
        is_event: false,
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
      console.log("Updating event:", editingEvent);
      
      // Set is_event based on category
      const isEvent = editingEvent.category === "calendar";
      
      // Prepare content with category metadata
      let finalContent = editingEvent.content || "";
      
      // Update or add category as metadata in the content
      if (finalContent.includes("category:")) {
        finalContent = finalContent.replace(/category:[a-zA-Z]+/i, `category:${editingEvent.category}`);
      } else {
        finalContent = `${finalContent.trim()}\n\ncategory:${editingEvent.category}`;
      }
      
      const { error } = await supabase
        .from('news_events')
        .update({
          title: editingEvent.title,
          event_date: editingEvent.category === "calendar" ? editingEvent.event_date : null,
          content: finalContent,
          image_url: editingEvent.image_url,
          is_event: isEvent
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
        description: "Content updated successfully.",
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
        description: "Content deleted successfully.",
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

  const filteredEvents = events.filter((event) => {
    // Filter by search term
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by active tab/category
    const matchesCategory = 
      activeTab === "all" || 
      event.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList className="inline-flex h-10">
            <TabsTrigger value="all">All</TabsTrigger>
            {eventCategories.map(category => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button onClick={() => setIsAddingEvent(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </Button>
        </div>

        <div className="relative w-64 mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search content"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TabsContent value="all" className="space-y-4">
          {/* Events list will be rendered here */}
        </TabsContent>

        {eventCategories.map(category => (
          <TabsContent key={category.value} value={category.value} className="space-y-4">
            {/* Category-specific events will be rendered here */}
          </TabsContent>
        ))}
      </Tabs>

      {isAddingEvent && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Content</CardTitle>
            <CardDescription>Create a new event or news item</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
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
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Select 
                value={newEvent.category} 
                onValueChange={(value) => {
                  setNewEvent({ 
                    ...newEvent, 
                    category: value,
                    is_event: value === "calendar" 
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {eventCategories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Show date field only for calendar events */}
            {newEvent.category === "calendar" && (
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
            )}

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description / Content
              </label>
              <Textarea
                id="description"
                value={newEvent.content}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, content: e.target.value })
                }
                placeholder="Enter content here"
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
            <Button onClick={handleAddEvent}>Save</Button>
          </CardFooter>
        </Card>
      )}

      {editingEvent && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Content</CardTitle>
            <CardDescription>Update content details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="edit-title" className="text-sm font-medium">
                Title
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
              <label htmlFor="edit-category" className="text-sm font-medium">
                Category
              </label>
              <Select 
                value={editingEvent.category} 
                onValueChange={(value) => {
                  setEditingEvent({ 
                    ...editingEvent, 
                    category: value,
                    is_event: value === "calendar" 
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {eventCategories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Show date field only for calendar events */}
            {editingEvent.category === "calendar" && (
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
            )}

            <div className="space-y-2">
              <label htmlFor="edit-description" className="text-sm font-medium">
                Description / Content
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
            <Button onClick={handleEditEvent}>Update</Button>
          </CardFooter>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center py-10">
          <p>Loading content...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-10">
          <p>No content found. Create your first item by clicking "Add Content" above.</p>
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
                          {event.category === "calendar" && (
                            <>
                              <Calendar className="h-3 w-3 mr-1" />
                              {event.event_date ? new Date(event.event_date).toLocaleDateString() : 'No date'}
                            </>
                          )}
                          <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded-full">
                            {eventCategories.find(cat => cat.value === event.category)?.label || event.category}
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
                    <p className="text-sm">{event.content?.replace(/category:[a-zA-Z]+/i, '')}</p>
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
