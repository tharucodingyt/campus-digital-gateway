import React, { useState, useEffect } from 'react';
import EnhancedGalleryCard from './EnhancedGalleryCard';
import ImageLightbox from './ImageLightbox';

interface MasonryGalleryProps {
  items: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    imageUrl: string;
    category?: string;
  }>;
  columns?: number;
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ 
  items, 
  columns = 3 
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [columnItems, setColumnItems] = useState<Array<Array<typeof items[0]>>>([]);

  // Prepare images for lightbox
  const lightboxImages = items.map(item => ({
    src: item.imageUrl || '',
    alt: item.title,
    title: item.title
  }));

  // Handle window resize to adjust columns
  useEffect(() => {
    const handleResize = () => {
      let cols = columns;
      if (window.innerWidth < 768) {
        cols = 1;
      } else if (window.innerWidth < 1024) {
        cols = 2;
      }
      distributeItems(cols);
    };

    handleResize(); // Initial distribution
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [items, columns]);

  // Distribute items across columns
  const distributeItems = (cols: number) => {
    const newColumnItems: Array<Array<typeof items[0]>> = Array.from({ length: cols }, () => []);
    
    // Distribute items to columns (simple approach - could be improved with height calculations)
    items.forEach((item, index) => {
      const columnIndex = index % cols;
      newColumnItems[columnIndex].push(item);
    });
    
    setColumnItems(newColumnItems);
  };

  const handleImageClick = (imageUrl: string, title: string) => {
    // Find the index of the clicked image
    const index = items.findIndex(item => item.imageUrl === imageUrl);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-4">
        {columnItems.map((column, columnIndex) => (
          <div key={`column-${columnIndex}`} className="flex-1 flex flex-col gap-4">
            {column.map((item) => (
              <div key={item.id} className="mb-4 transform transition-transform hover:z-10 hover:scale-[1.02]">
                <EnhancedGalleryCard
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  imageUrl={item.imageUrl}
                  category={item.category}
                  onImageClick={handleImageClick}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Lightbox for full-screen image viewing */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={currentImageIndex}
      />
    </div>
  );
};

export default MasonryGallery;