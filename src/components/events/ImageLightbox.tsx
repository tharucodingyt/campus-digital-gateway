import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: {
    src: string;
    alt: string;
    title?: string;
  }[];
  currentIndex: number;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex: initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Update current index if it changes externally
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    // Handle keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          navigateToPrevious();
          break;
        case 'ArrowRight':
          navigateToNext();
          break;
        default:
          break;
      }
    };

    // Prevent scrolling when lightbox is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen) return null;

  const navigateToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsLoading(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const navigateToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsLoading(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-school-primary z-50 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-all"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      {/* Navigation buttons */}
      <button
        onClick={navigateToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-school-primary z-50 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-all"
        aria-label="Previous image"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={navigateToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-school-primary z-50 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-all"
        aria-label="Next image"
      >
        <ChevronRight size={32} />
      </button>

      {/* Image container */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className={`max-h-[90vh] max-w-[90vw] object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
        
        {/* Image caption */}
        {currentImage.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 text-center">
            <h3 className="text-lg font-medium">{currentImage.title}</h3>
          </div>
        )}
      </div>

      {/* Image counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/40 px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageLightbox;