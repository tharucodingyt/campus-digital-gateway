
import React, { ReactNode } from 'react';

interface ParallaxSectionProps {
  backgroundImage: string;
  overlayColor?: string;
  children: ReactNode;
  height?: string;
}

const ParallaxSection = ({
  backgroundImage,
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  children,
  height = '500px'
}: ParallaxSectionProps) => {
  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div 
        className="absolute inset-0" 
        style={{ backgroundColor: overlayColor }}
      />
      <div className="relative h-full z-10 flex items-center justify-center">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
