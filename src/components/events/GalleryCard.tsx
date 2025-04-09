import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface GalleryCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  category?: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  id,
  title,
  description,
  date,
  imageUrl,
  category = 'Event',
}) => {
  const [expanded, setExpanded] = useState(false);
  const defaultImage = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80';
  
  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const truncatedDescription = description.length > 100 ? description.substring(0, 100) + '...' : description;

  return (
    <div className="gallery-item bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all animate-fadeInUp h-full flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <img
          className="gallery-image w-full h-full object-cover"
          src={imageUrl || defaultImage}
          alt={title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImage;
          }}
        />
        <div className="gallery-caption p-4">
          <h4 className="gallery-title font-medium text-white">{title}</h4>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center text-gray-200 text-xs">
              <Calendar size={12} className="mr-1" />
              {date}
            </div>
            <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-white">
              {category}
            </span>
          </div>
          <a href={`/events/${id}`} className="gallery-button text-white font-medium hover:text-school-primary mt-3 inline-block">
            View Details
          </a>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-gray-600 mb-2">
          {expanded ? description : truncatedDescription}
        </div>
        {description.length > 100 && (
          <button 
            onClick={toggleExpand} 
            className="text-school-secondary font-medium hover:text-school-primary inline-flex items-center group mt-auto self-start"
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
      </div>
    </div>
  );
};

export default GalleryCard;