import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface CalendarEventCardProps {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  category?: string;
}

const CalendarEventCard: React.FC<CalendarEventCardProps> = ({
  id,
  title,
  content,
  date,
  imageUrl,
  category = 'Event',
}) => {
  const [expanded, setExpanded] = useState(false);
  const defaultImage = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80';
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const truncatedContent = content && content.length > 100 ? content.substring(0, 100) + '...' : content;

  return (
    <div className="event-calendar-card animate-fadeInUp h-full flex flex-col">
      <div className="event-date">
        <div className="text-sm font-semibold text-center p-2">
          {date}
        </div>
      </div>
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl || defaultImage}
          alt={title}
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
            {category}
          </span>
        </div>
        <h3 className="news-title">{title}</h3>
        <div className="text-gray-600 mb-4 flex-grow">
          {expanded ? content : truncatedContent}
        </div>
        {content && content.length > 100 && (
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
        <a
          href={`/events/${id}`}
          className="text-school-secondary font-medium hover:text-school-primary inline-flex items-center group mt-auto"
        >
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default CalendarEventCard;