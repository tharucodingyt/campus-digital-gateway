import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/layout';
import { useParams, Navigate } from 'react-router-dom';
import { Calendar, Search } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EventCard from "@/components/events/EventCard";
import GalleryCard from "@/components/events/GalleryCard";
import CalendarEventCard from "@/components/events/CalendarEventCard";
import EnhancedGalleryCard from "@/components/events/EnhancedGalleryCard";
import ImageLightbox from "@/components/events/ImageLightbox";
import MasonryGallery from "@/components/events/MasonryGallery";

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
  // Filter functionality removed, but keeping state for compatibility with existing code
  const [activeFilter] = useState('all');
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
  const validSections = ['news', 'calendar', 'gallery'];
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
                <EventCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  content={item.content}
                  date={item.event_date ? new Date(item.event_date).toLocaleDateString() : new Date(item.created_at).toLocaleDateString()}
                  imageUrl={item.image_url || ''}
                  category={item.category || (item.is_event ? 'Event' : 'News')}
                  tags={item.tags}
                />
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
          
          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-gray-600">Loading events...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-10">
              <Calendar className="h-12 w-12 mx-auto text-school-primary/50 mb-2" />
              <p className="text-gray-600">No events found. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredNews.filter(event => event.is_event).map((event) => (
                <div key={event.id} className="event-calendar-card animate-fadeInUp h-full flex flex-col">
                  <div className="event-date">
                    <div className="text-sm font-semibold text-center p-2">
                      {event.event_date ? new Date(event.event_date).toLocaleDateString() : new Date(event.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={event.image_url || defaultImage}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = defaultImage;
                      }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center mb-3">
                      <Calendar className="event-icon h-5 w-5 mr-2" />
                      <span className="news-tag">
                        {event.category || 'Event'}
                      </span>
                    </div>
                    <h3 className="news-title">{event.title}</h3>
                    <div className="text-gray-600 mb-4 flex-grow">
                      {event.content && (
                        <React.Fragment>
                          {event.content.length > 100 ? (
                            <>
                              <p>{event.content.substring(0, 100)}...</p>
                              <a
                                href={`/events/${event.id}`}
                                className="text-school-secondary font-medium hover:text-school-primary inline-flex items-center group mt-2"
                              >
                                Read More
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </a>
                            </>
                          ) : (
                            <p>{event.content}</p>
                          )}
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {section === 'gallery' && (
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Photo Gallery</h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse through images from our recent events and activities
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative w-full max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search gallery..."
                className="pl-10 pr-4 py-2 border rounded-md w-full shadow-sm focus:ring-2 focus:ring-school-primary/30 focus:border-school-primary transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-md">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-school-primary mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading gallery...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-md p-8">
              <p className="text-gray-600 mb-4">No gallery items found for your search. Please try different keywords.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                }}
                className="px-4 py-2 bg-school-primary text-white rounded-md hover:bg-school-secondary transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="mb-8">
              <MasonryGallery 
                items={filteredNews.map(item => ({
                  id: item.id,
                  title: item.title,
                  description: item.content,
                  date: item.event_date 
                    ? new Date(item.event_date).toLocaleDateString() 
                    : new Date(item.created_at).toLocaleDateString(),
                  imageUrl: item.image_url || '',
                  category: item.category || (item.is_event ? 'Event' : 'News')
                }))}
                columns={3}
              />
            </div>
          )}
          
          <div className="mt-10 text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/events" className="btn-primary inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-school-primary text-school-primary rounded-md hover:bg-school-primary hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Events
              </a>
              <a href="/events/calendar" className="btn-primary inline-flex items-center justify-center gap-2 px-4 py-2 bg-school-primary text-white rounded-md hover:bg-school-secondary transition-colors">
                <Calendar className="h-5 w-5" />
                View Event Calendar
              </a>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default EventsSection;
