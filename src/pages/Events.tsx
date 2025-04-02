
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Calendar, Search } from 'lucide-react';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const newsItems = [
    {
      id: 1,
      title: 'Annual Sports Day Announced',
      date: 'March 15, 2023',
      content: 'Our annual sports day will be held on March 15th. All students are encouraged to participate in various events including track and field, team sports, and individual competitions. Parents are invited to attend and cheer for their children. Refreshments will be provided.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=840&q=80',
      category: 'Event',
      tags: ['sports', 'competition', 'annual event'],
    },
    {
      id: 2,
      title: 'Science Exhibition Winners',
      date: 'February 28, 2023',
      content: 'Congratulations to our students who won the district-level science exhibition with their innovative projects. The winning projects included a solar-powered water purifier, a biodegradable plastic alternative, and an automated plant watering system. These students will now represent our school at the state-level competition.',
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      category: 'Achievement',
      tags: ['science', 'exhibition', 'awards'],
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting Scheduled',
      date: 'April 10, 2023',
      content: 'The next parent-teacher meeting will be held on April 10th. Parents are requested to attend to discuss their child\'s academic progress and any concerns they may have. Time slots will be assigned and communicated via email. Please confirm your attendance by April 5th.',
      image: 'https://images.unsplash.com/photo-1577896852618-3b02a11df647?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      category: 'Notice',
      tags: ['meeting', 'parents', 'academic'],
    },
    {
      id: 4,
      title: 'New Computer Lab Inauguration',
      date: 'January 15, 2023',
      content: 'We are pleased to announce the inauguration of our new state-of-the-art computer lab with 30 latest computers, high-speed internet, and advanced software. This lab will enhance our technical education program and provide students with hands-on experience in programming, design, and digital skills.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      category: 'Announcement',
      tags: ['facility', 'technology', 'inauguration'],
    },
    {
      id: 5,
      title: 'Cultural Fest 2023',
      date: 'May 20, 2023',
      content: 'Mark your calendars for our annual Cultural Fest on May 20th. The event will feature performances by students showcasing various cultural dances, music, drama, and art exhibitions. There will also be food stalls representing different cuisines. Entry is free for parents and family members.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      category: 'Event',
      tags: ['cultural', 'performance', 'annual event'],
    },
    {
      id: 6,
      title: 'New Faculty Members Join Our Team',
      date: 'December 5, 2022',
      content: 'We are delighted to welcome five new faculty members who have joined our teaching staff. They bring expertise in Mathematics, Science, English Literature, Computer Science, and Physical Education. Each of them has extensive teaching experience and impressive academic credentials.',
      image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80',
      category: 'Announcement',
      tags: ['faculty', 'staff', 'academic'],
    },
  ];

  const upcomingEvents = [
    { date: 'March 15, 2023', event: 'Annual Sports Day' },
    { date: 'April 10, 2023', event: 'Parent-Teacher Meeting' },
    { date: 'April 22, 2023', event: 'Earth Day Celebration' },
    { date: 'May 5, 2023', event: 'Mathematics Olympiad' },
    { date: 'May 20, 2023', event: 'Cultural Fest 2023' },
    { date: 'June 15, 2023', event: 'End of Academic Year Ceremony' },
  ];

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = activeFilter === 'all' || item.category.toLowerCase() === activeFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
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
                {['all', 'event', 'announcement', 'achievement', 'notice'].map((filter) => (
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
                
                {filteredNews.length === 0 ? (
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
                              src={item.image}
                              alt={item.title}
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
                            <p className="text-gray-600 mb-4">
                              {item.content.length > 150 ? item.content.substring(0, 150) + '...' : item.content}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {item.tags.map((tag, index) => (
                                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                  #{tag}
                                </span>
                              ))}
                            </div>
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
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <div className="bg-school-accent text-school-primary text-xs font-semibold text-center rounded p-1 w-16">
                            {event.date.split(', ')[0]}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">{event.event}</p>
                        </div>
                      </div>
                    ))}
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
      </main>
      <Footer />
    </div>
  );
};

export default Events;
