import React, { useState } from 'react';
import { Calendar, Eye, Tag } from 'lucide-react';

interface EnhancedGalleryCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  category?: string;
  onImageClick?: (imageUrl: string, title: string) => void;
}

const EnhancedGalleryCard: React.FC<EnhancedGalleryCardProps> = ({
  id,
  title,
  description,
  date,
  imageUrl,
  category = 'Event',
  onImageClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const defaultImage = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80';
  
  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onImageClick) {
      onImageClick(imageUrl || defaultImage, title);
    }
  };

  const truncatedDescription = description.length > 100 ? description.substring(0, 100) + '...' : description;

  return (
    <div 
      className="enhanced-gallery-item bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-72 overflow-hidden group">
        <img
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          src={imageUrl || defaultImage}
          alt={title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white flex items-center">
                <Tag size={12} className="mr-1" />
                {category}
              </span>
              <div className="flex items-center text-gray-200 text-xs">
                <Calendar size={12} className="mr-1" />
                {date}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <button 
              onClick={handleImageClick}
              className="inline-flex items-center text-white bg-school-primary/80 hover:bg-school-primary px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200"
            >
              <Eye size={16} className="mr-1" />
              View Full Image
            </button>
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h4 className="text-lg font-semibold text-school-primary mb-2 transition-colors duration-200 hover:text-school-secondary">
          <a href={`/events/${id}`}>{title}</a>
        </h4>
        <div className="text-gray-600 mb-4 flex-grow">
          {truncatedDescription}
        </div>
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-500 flex items-center">
            <Calendar size={14} className="mr-1 text-school-primary" />
            {date}
          </span>
          <a 
            href={`/events/${id}`} 
            className="text-school-secondary font-medium hover:text-school-primary inline-flex items-center group text-sm"
          >
            Details
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnhancedGalleryCard;