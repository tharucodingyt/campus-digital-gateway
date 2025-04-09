import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface EventCardProps {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  category?: string;
  tags?: string[];
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  content,
  date,
  imageUrl,
  category = 'Event',
  tags = [],
}) => {
  const [expanded, setExpanded] = useState(false);
  const defaultImage = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80';
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const truncatedContent = content.length > 150 ? content.substring(0, 150) + '...' : content;

  return (
    <Card className="news-card animate-fadeInUp h-full flex flex-col">
      <div className="md:flex h-full">
        <div className="md:flex-shrink-0">
          <img
            className="news-image h-52 w-full md:h-full md:w-56 object-cover"
            src={imageUrl || defaultImage}
            alt={title}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultImage;
            }}
          />
        </div>
        <CardContent className="news-content p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <span className="news-tag">
              {category}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar size={14} className="mr-1" />
              {date}
            </div>
          </div>
          <h3 className="news-title">{title}</h3>
          <div className="text-gray-600 mb-4 flex-grow">
            {expanded ? content : truncatedContent}
          </div>
          {content.length > 150 && (
            <button 
              onClick={toggleExpand} 
              className="text-school-secondary font-medium hover:text-school-primary inline-flex items-center group mb-4"
            >
              {expanded ? 'Read Less' : 'Read More'}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ml-1 transform transition-transform ${expanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={expanded ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </button>
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span key={index} className="news-tag text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <a
            href={`/events/${id}`}
            className="text-school-secondary font-medium hover:text-school-primary inline-flex items-center group mt-auto"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </CardContent>
      </div>
    </Card>
  );
};

export default EventCard;