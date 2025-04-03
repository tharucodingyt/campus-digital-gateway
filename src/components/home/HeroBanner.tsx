
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Play, Pause, ChevronDown } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useEmblaCarousel } from 'embla-carousel-react';

const HeroBanner = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const typedTextRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, draggable: true });

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      heading: 'Welcome to Campus Digital Gateway',
      subheading: 'Empowering Young Minds Since 1995',
      textColor: 'text-white',
      overlayColor: 'bg-black/60',
      gradient: 'bg-gradient-to-r from-blue-900/70 to-indigo-900/70',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      heading: 'Excellence in Education',
      subheading: 'Preparing Students for a Bright Future',
      textColor: 'text-white',
      overlayColor: 'bg-black/50',
      gradient: 'bg-gradient-to-r from-purple-900/70 to-pink-900/70',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1597392582469-a329eb1f753c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      heading: 'Holistic Development',
      subheading: 'Academics, Sports, Arts, and Character Building',
      textColor: 'text-white',
      overlayColor: 'bg-black/40',
      gradient: 'bg-gradient-to-r from-emerald-900/70 to-teal-900/70',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      heading: 'Innovation in Learning',
      subheading: 'Modern Teaching Methods for the Digital Age',
      textColor: 'text-white',
      overlayColor: 'bg-black/50',
      gradient: 'bg-gradient-to-r from-amber-900/70 to-orange-900/70',
    },
  ];

  const typedTextOptions = [
    'Empowering Young Minds for a Brighter Future.',
    'Nurturing Leaders of Tomorrow.',
    'Building Character Through Education.',
    'Excellence in Every Endeavor.'
  ];

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });

    // Simple typed text effect without using typed.js
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;
    let pauseTime = 2000;
    
    const type = () => {
      if (!typedTextRef.current) return;
      
      const currentText = typedTextOptions[currentTextIndex];
      
      if (isDeleting) {
        // Deleting text
        currentCharIndex--;
        typingSpeed = 30;
      } else {
        // Typing text
        currentCharIndex++;
        typingSpeed = 50;
      }
      
      typedTextRef.current.textContent = currentText.substring(0, currentCharIndex);
      
      // If finished typing, pause before deleting
      if (!isDeleting && currentCharIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = pauseTime;
      } 
      // If finished deleting, move to next text
      else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typedTextOptions.length;
      }
      
      setTimeout(type, typingSpeed);
    };
    
    // Start typing
    setTimeout(type, 1000);

    // Start autoplay
    if (isPlaying) {
      startAutoplay();
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // Effect to update emblaApi and current slide
  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      };
      
      emblaApi.on('select', onSelect);
      // Initial call to set first slide
      onSelect();
      
      return () => {
        emblaApi.off('select', onSelect);
      };
    }
    return undefined;
  }, [emblaApi]);

  const startAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    }, 5000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
    setIsPlaying(!isPlaying);
  };

  const goToSlide = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  const scrollToContent = () => {
    const quickLinksSection = document.getElementById('quick-links');
    if (quickLinksSection) {
      quickLinksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden relative">
      {/* Main Carousel with direct embla-carousel for more control */}
      <div className="w-full h-full embla overflow-hidden" ref={emblaRef}>
        <div className="h-full flex">
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className="h-full w-full flex-[0_0_100%] relative"
            >
              {/* Background Image with zoom effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 scale-[1.02]"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  transform: currentSlide === index ? 'scale(1.12)' : 'scale(1.02)',
                  transition: 'transform 8s ease-out',
                }}
              />
              
              {/* Color overlay with gradient */}
              <div className={`absolute inset-0 ${slide.gradient}`} />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-10">
                <div className="max-w-4xl mx-auto">
                  <div 
                    className="mb-4"
                    data-aos="fade-down"
                    data-aos-delay="200"
                  >
                    <h1 className={`text-5xl md:text-7xl font-bold mb-4 ${slide.textColor} [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom duration-1000`}>
                      {slide.heading}
                    </h1>
                  </div>
                  
                  <div 
                    className="mb-6"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <p className={`text-xl md:text-3xl ${slide.textColor} [text-shadow:_0_1px_2px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom duration-1000 delay-300`}>
                      {slide.subheading}
                    </p>
                  </div>
                  
                  <div 
                    className="mb-10"
                    data-aos="zoom-in"
                    data-aos-delay="600"
                  >
                    <span 
                      ref={typedTextRef} 
                      className={`text-xl md:text-3xl font-light block text-school-accent ${slide.textColor} [text-shadow:_0_1px_2px_rgba(0,0,0,0.4)]`}
                    >
                      {/* Typed text will be inserted here by useEffect */}
                    </span>
                  </div>
                  
                  <div 
                    className="flex flex-wrap justify-center gap-6 mt-10"
                    data-aos="fade-up"
                    data-aos-delay="800"
                  >
                    <Link to="/admissions">
                      <Button 
                        size="lg"
                        variant="default" 
                        className="bg-school-primary hover:bg-school-secondary transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] transform hover:scale-105 text-lg px-8 py-6"
                      >
                        Apply Now
                      </Button>
                    </Link>
                    <Link to="/about">
                      <Button 
                        size="lg"
                        variant="outline" 
                        className="bg-transparent text-white border-white hover:bg-white hover:text-school-primary transition-all duration-300 text-lg px-8 py-6"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Navigation Controls */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-6 z-10">
        {/* Play/Pause Button */}
        <button
          className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        {/* Dots Navigation */}
        <div className="flex justify-center space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? 'bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                  : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Arrow Navigation - Hidden on mobile for cleaner UI */}
        <div className="hidden md:flex gap-4">
          <button
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous slide"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next slide"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10 animate-bounce">
        <button 
          onClick={scrollToContent}
          className="text-white hover:text-school-accent transition-colors"
          aria-label="Scroll to content"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
