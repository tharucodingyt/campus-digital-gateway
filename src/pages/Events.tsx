import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/layout';
import { Calendar, Search } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EventCard from "@/components/events/EventCard";
import GalleryCard from "@/components/events/GalleryCard";

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
        const formattedEvents = data.map(event => ({
          ...event,
          tags: ['school', 'education', event.is_event ? 'event' : 'news'],
          category: event.is_event ? 'Event' : 'News'
        }));
        
        setNewsItems(formattedEvents);
        
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
      <section className="relative h-80 bg-school-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative container-custom h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events & News</h1>
          <p className="text-xl max-w-3xl">Stay updated with the latest happenings and announcements</p>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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

      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    <EventCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      content={item.content}
                      date={item.event_date ? new Date(item.event_date).toLocaleDateString() : new Date(item.created_at).toLocaleDateString()}
                      imageUrl={item.image_url || ''}
                      category={item.is_event ? 'Event' : 'News'}
                      tags={item.tags}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-school-primary mb-4">Upcoming Events</h3>
                <div id="calendar" className="space-y-4">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event, index) => (
                      <div key={index} className="event-calendar-card flex flex-col mb-4">
                        <div className="event-date">
                          <div className="text-xs font-semibold text-center p-1">
                            {event.date}
                          </div>
                        </div>
                        <div className="p-4 flex items-center">
                          <div className="mr-3">
                            <Calendar className="event-icon h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{event.event}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <Calendar className="h-12 w-12 mx-auto text-school-primary/50 mb-2" />
                      <p className="text-gray-600">No upcoming events scheduled.</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-school-primary mb-4">Photo Highlights</h3>
                <div className="gallery-grid">
                  {newsItems.slice(0, 4).map((item) => (
                    <GalleryCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      description={item.content}
                      date={item.event_date ? new Date(item.event_date).toLocaleDateString() : new Date(item.created_at).toLocaleDateString()}
                      imageUrl={item.image_url || ''}
                      category={item.category || (item.is_event ? 'Event' : 'News')}
                    />
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <a href="/events/gallery" className="btn-primary inline-flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
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
