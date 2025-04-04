
import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/layout';
import { Calendar, Search } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  content: string;
  event_date: string;
  image_url?: string;
  is_event: boolean;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published' | 'archived';
  tags?: string[];
  category?: string;
}

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [newsItems, setNewsItems] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<{ date: string; event: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Default placeholder image
  const defaultImage = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80';

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('news_events')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching events:", error);
        toast({
          title: "Error",
          description: "Failed to fetch events data. Using sample data.",
          variant: "destructive",
        });
        return;
      }

      if (data && data.length > 0) {
        // Process and format events data
        const formattedEvents = data.map(event => ({
          ...event,
          // Generate tags from content if they don't exist
          tags: ['school', 'education', event.is_event ? 'event' : 'news'],
          // Set a default category based on is_event
          category: event.is_event ? 'Event' : 'News'
        }));
        
        setNewsItems(formattedEvents);
        
        // Extract upcoming events (events with future dates)
        const today = new Date();
        const upcoming = formattedEvents
          .filter(event => event.is_event && new Date(event.event_date) >= today)
          .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
          .slice(0, 6)
          .map(event => ({
            date: new Date(event.event_date).toLocaleDateString(),
            event: event.title
          }));
        
        setUpcomingEvents(upcoming);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Error",
        description: "Failed to fetch events data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesFilter = 
      activeFilter === 'all' || 
      (activeFilter === 'event' && item.is_event) || 
      (activeFilter === 'news' && !item.is_event) ||
      item.category?.toLowerCase() === activeFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-80 bg-school-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative container-custom h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events & News</h1>
          <p className="text-xl max-w-3xl">Stay updated with the latest happenings and announcements</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search */}
            <div className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news & events..."
                  className="pl-10 pr-4 py-2 border rounded-md w-full md:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {['all', 'event', 'news'].map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeFilter === filter
                      ? 'bg-school-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="section-heading mb-8">Latest News & Updates</h2>
              
              {isLoading ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-600">Loading news and events...</p>
                </div>
              ) : filteredNews.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-600">No results found for your search. Please try different keywords or filters.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredNews.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                      <div className="md:flex">
                        <div className="md:flex-shrink-0">
                          <img
                            className="h-48 w-full md:h-full md:w-48 object-cover"
                            src={item.image_url || defaultImage}
                            alt={item.title}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = defaultImage;
                            }}
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold px-2 py-1 rounded bg-school-accent text-school-primary">
                              {item.is_event ? 'Event' : 'News'}
                            </span>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Calendar size={14} className="mr-1" />
                              {item.event_date ? new Date(item.event_date).toLocaleDateString() : new Date(item.created_at).toLocaleDateString()}
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-school-primary">{item.title}</h3>
                          <p className="text-gray-600 mb-4">
                            {item.content.length > 150 ? item.content.substring(0, 150) + '...' : item.content}
                          </p>
                          {item.tags && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {item.tags.map((tag, index) => (
                                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <a
                            href={`/events/${item.id}`}
                            className="text-school-secondary font-medium hover:text-school-primary"
                          >
                            Read More
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Upcoming Events Calendar */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-school-primary mb-4">Upcoming Events</h3>
                <div id="calendar" className="space-y-4">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <div className="bg-school-accent text-school-primary text-xs font-semibold text-center rounded p-1 w-16">
                            {event.date}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">{event.event}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No upcoming events scheduled.</p>
                  )}
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-school-primary mb-4">Subscribe to Newsletter</h3>
                <p className="text-gray-600 mb-4">
                  Get the latest news and updates delivered to your inbox.
                </p>
                <form>
                  <div className="mb-4">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
              
              {/* Photo Highlights */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-school-primary mb-4">Photo Highlights</h3>
                <div className="grid grid-cols-2 gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1577896852418-3c18f1a23337?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                    alt="School event"
                    className="rounded-md"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                    alt="School event"
                    className="rounded-md"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1764&q=80"
                    alt="School event"
                    className="rounded-md"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                    alt="School event"
                    className="rounded-md"
                  />
                </div>
                <div className="mt-4 text-center">
                  <a href="#" className="text-school-secondary hover:text-school-primary">
                    View Gallery
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
