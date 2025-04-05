import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/layout';
import { useParams, Navigate } from 'react-router-dom';
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

const EventsSection = () => {
  const { section } = useParams();
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
  }, [section]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching events for section:", section);
      
      // Start with base query
      let query = supabase
        .from('news_events')
        .select('*')
        .eq('status', 'published');
      
      // Execute query - filtering will be done client-side
      const { data, error } = await query.order('created_at', { ascending: false });

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
        const formattedEvents = data.map(event => {
          // Default category
          let category = event.is_event ? "calendar" : "news";
          
          // Check for category in content
          if (event.content && event.content.includes("category:")) {
            const match = event.content.match(/category:([a-zA-Z]+)/i);
            if (match && match[1]) {
              category = match[1].toLowerCase();
            }
          }
          
          // Clean content by removing the category tag
          let cleanContent = event.content;
          if (cleanContent && cleanContent.includes("category:")) {
            cleanContent = cleanContent.replace(/\s*\n*category:[a-zA-Z]+\s*\n*/i, '').trim();
          }
          
          return {
            ...event,
            content: cleanContent,
            tags: ['school', 'education', event.is_event ? 'event' : 'news'],
            category: category
          };
        });
        
        console.log("Formatted events:", formattedEvents);
        console.log("Current section:", section);
        
        // If a section is specified, filter events by category
        let filteredEvents = formattedEvents;
        if (section) {
          filteredEvents = formattedEvents.filter(event => {
            return event.category === section;
          });
        }
        
        console.log("Filtered events:", filteredEvents);
        setNewsItems(filteredEvents);
        
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

  // Redirect if section is invalid
  const validSections = ['news', 'calendar', 'gallery', 'newsletter'];
  if (section && !validSections.includes(section)) {
    return <Navigate to="/events" replace />;
  }

  return (
    <Layout>
      {section === 'news' && (
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Latest News</h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Stay updated with the latest happenings and announcements from our school
          </p>
          
          <div className="w-full max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="pl-10 pr-4 py-2 border rounded-md w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">Loading news...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">No news found for your search. Please try different keywords.</p>
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
                          {item.category || (item.is_event ? 'Event' : 'News')}
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
      )}
      
      {section === 'calendar' && (
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Event Calendar</h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            View our upcoming events and important dates
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-school-primary mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start border-b pb-4 last:border-0">
                    <div className="flex-shrink-0 mr-3">
                      <div className="bg-school-accent text-school-primary text-xs font-semibold text-center rounded p-2 w-20">
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
        </div>
      )}
      
      {section === 'gallery' && (
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Photo Gallery</h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse through images from our recent events and activities
          </p>
          
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newsItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                  <img
                    className="w-full h-64 object-cover"
                    src={item.image_url || defaultImage}
                    alt={item.title}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = defaultImage;
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-school-primary">{item.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center text-gray-500 text-xs">
                        <Calendar size={12} className="mr-1" />
                        {item.event_date 
                          ? new Date(item.event_date).toLocaleDateString() 
                          : new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {section === 'newsletter' && (
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Newsletter</h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive regular updates about school events and activities
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
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
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-school-primary text-white py-2 px-4 rounded-md hover:bg-school-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-4 text-sm text-gray-600">
              <p>By subscribing, you agree to receive our newsletter and school updates. You can unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default EventsSection;
