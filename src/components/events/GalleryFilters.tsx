import React from 'react';
import { Filter } from 'lucide-react';

interface GalleryFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const GalleryFilters: React.FC<GalleryFiltersProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-md">
        <div className="flex items-center text-school-primary font-medium">
          <Filter size={18} className="mr-2" />
          <span>Filter Gallery:</span>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === 'all' 
              ? 'bg-school-primary text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category.toLowerCase())}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === category.toLowerCase() 
                ? 'bg-school-primary text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryFilters;