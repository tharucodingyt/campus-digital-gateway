
import React, { useEffect } from 'react';
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

const FeaturedNews = () => {
  const newsItems = [
    {
      id: 1,
      title: 'Annual Sports Day Announced',
      date: 'March 15, 2023',
      excerpt: 'Our annual sports day will be held on March 15th. All students are encouraged to participate in various events.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=840&q=80',
      category: 'Event',
    },
    {
      id: 2,
      title: 'Science Exhibition Winners',
      date: 'February 28, 2023',
      excerpt: 'Congratulations to our students who won the district-level science exhibition with their innovative projects.',
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      category: 'Achievement',
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      date: 'April 10, 2023',
      excerpt: 'The next parent-teacher meeting will be held on April 10th. Parents are requested to attend.',
      image: 'https://images.unsplash.com/photo-1577896852618-3b02a11df647?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      category: 'Notice',
    },
  ];

  useEffect(() => {
    // Refresh AOS animations when component mounts
    AOS.refresh();
  }, []);

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
              {newsItems.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-school-accent text-school-primary">
                          {item.category}
                        </span>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar size={14} className="mr-1" />
                          {item.date}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-school-primary">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.excerpt}</p>
                      <Link
                        to={`/events/${item.id}`}
                        className="text-school-secondary font-medium hover:text-school-primary transform transition-transform hover:translate-x-1"
                      >
                        Read More
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
          {newsItems.map((item) => (
            <div 
              key={`thumb-${item.id}`} 
              className="cursor-pointer hover:opacity-100 transition-opacity hover:scale-105 transform duration-300"
              data-aos="flip-up"
              data-aos-delay={100 + (item.id * 50)}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="h-12 w-20 object-cover rounded"
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
