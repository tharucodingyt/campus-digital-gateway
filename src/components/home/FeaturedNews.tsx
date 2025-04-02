
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

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

  return (
    <section className="py-12">
      <div className="container-custom">
        <h2 className="section-heading text-center mb-12">Featured News & Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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
                  className="text-school-secondary font-medium hover:text-school-primary"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/events" className="btn-primary">
            View All News & Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
