
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import AOS from 'aos';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  event_date: string;
  created_at: string;
  image_url?: string;
  is_event: boolean;
  category?: string;
}

const FeaturedNews = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Default placeholder image
  const defaultImage = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=840&q=80';

  useEffect(() => {
    // Refresh AOS animations when component mounts
    AOS.refresh();
    
    fetchNewsItems();
  }, []);

  const fetchNewsItems = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('news_events')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching news items:", error);
        toast({
          title: "Error",
          description: "Failed to fetch news items. Using sample data.",
          variant: "destructive",
        });
        return;
      }

      if (data && data.length > 0) {
        const formattedNews = data.map(item => {
          // Extract category from content if it exists
          let category = item.is_event ? 'Event' : 'News';
          if (item.content && item.content.includes("category:")) {
            const match = item.content.match(/category:([a-zA-Z]+)/i);
            if (match && match[1]) {
              category = match[1];
              // Make first letter uppercase
              category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
            }
          }
          
          return {
            ...item,
            category
          };
        });
        setNewsItems(formattedNews);
      }
    } catch (error) {
      console.error("Error fetching news items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // If no news items are loaded yet, show a loading state
  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container-custom">
          <h2 className="section-heading text-center mb-12">Featured News & Events</h2>
          <div className="text-center py-10">
            <p>Loading featured news and events...</p>
          </div>
        </div>
      </section>
    );
  }

  // If no news items are found after loading, show alternative content
  if (newsItems.length === 0) {
    return (
      <section className="py-12">
        <div className="container-custom">
          <h2 className="section-heading text-center mb-12">Featured News & Events</h2>
          <div className="text-center py-10">
            <p>No news or events found. Check back soon for updates!</p>
            <Link 
              to="/events"
              className="btn-primary inline-block mt-4 animate-pulse hover:animate-none hover:scale-105 transition-transform" 
            >
              Browse All News & Events
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container-custom">
        <h2 className="section-heading text-center mb-12" data-aos="fade-up">Featured News & Events</h2>
        
        <div className="mb-10" data-aos="fade-up" data-aos-delay="100">
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {newsItems.map((item, index) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <div className="news-card h-full animate-fadeInUp">
                    <div className="h-52 overflow-hidden">
                      <img
                        src={item.image_url || defaultImage}
                        alt={item.title}
                        className="news-image"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = defaultImage;
                        }}
                      />
                    </div>
                    <div className="news-content">
                      <div className="flex justify-between items-center mb-3">
                        <span className="news-tag">
                          {item.category || (item.is_event ? 'Event' : 'News')}
                        </span>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar size={14} className="mr-1" />
                          {item.event_date ? new Date(item.event_date).toLocaleDateString() : new Date(item.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <h3 className="news-title">{item.title}</h3>
                      <p className="text-gray-600 mb-4">
                        {item.content && item.content.includes("category:")
                          ? item.content.replace(/category:[a-zA-Z]+/i, '').substring(0, 80) + '...'
                          : (item.content && item.content.length > 80 
                              ? `${item.content.substring(0, 80)}...` 
                              : item.content)}
                      </p>
                      <Link
                        to={`/events/${item.id}`}
                        className="text-school-secondary font-medium hover:text-school-primary inline-flex items-center group"
                      >
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-2">
              <CarouselPrevious className="relative mx-2 bg-white text-school-primary border-school-primary hover:bg-school-primary hover:text-white" />
              <CarouselNext className="relative mx-2 bg-white text-school-primary border-school-primary hover:bg-school-primary hover:text-white" />
            </div>
          </Carousel>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          {/* Thumbnails for quick navigation */}
          {newsItems.map((item, index) => (
            <div 
              key={`thumb-${item.id}`} 
              className="cursor-pointer hover:opacity-100 transition-opacity hover:scale-105 transform duration-300"
              data-aos="flip-up"
              data-aos-delay={(index + 1) * 100} /* Fixed NaN error by using index + 1 */
            >
              <img 
                src={item.image_url || defaultImage} 
                alt={item.title} 
                className="h-12 w-20 object-cover rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = defaultImage;
                }}
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            to="/events"
            className="btn-primary inline-block animate-pulse hover:animate-none hover:scale-105 transition-transform" 
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            View All News & Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
