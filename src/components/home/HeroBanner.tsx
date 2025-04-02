
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';
import Typed from 'typed.js';
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

const HeroBanner = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const typedRef = useRef(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      heading: 'Welcome to Campus Digital Gateway',
      subheading: 'Empowering Young Minds Since 1995',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      heading: 'Excellence in Education',
      subheading: 'Preparing Students for a Bright Future',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1597392582469-a329eb1f753c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      heading: 'Holistic Development',
      subheading: 'Academics, Sports, Arts, and Character Building',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      heading: 'Innovation in Learning',
      subheading: 'Modern Teaching Methods for the Digital Age',
    },
  ];

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });

    // Initialize typed.js
    const typed = new Typed(typedRef.current, {
      strings: [
        'Empowering Young Minds for a Brighter Future.',
        'Nurturing Leaders of Tomorrow.',
        'Building Character Through Education.',
        'Excellence in Every Endeavor.'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
    });

    // Start autoplay
    if (isPlaying) {
      startAutoplay();
    }

    // Cleanup function
    return () => {
      typed.destroy();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const startAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
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
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Slides */}
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="h-full">
              <div
                className={`relative h-full w-full transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Background Image with animation */}
                <div
                  className="absolute inset-0 bg-center bg-cover transform transition-transform duration-10000 hover:scale-105"
                  style={{ 
                    backgroundImage: `url(${slide.image})`,
                    transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 6s ease-in-out',
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60" />
                
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
                  <div data-aos="fade-down" data-aos-delay="200">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl">{slide.heading}</h1>
                  </div>
                  
                  <div data-aos="fade-up" data-aos-delay="400">
                    <p className="text-xl md:text-2xl mb-6 max-w-2xl">{slide.subheading}</p>
                  </div>
                  
                  <div data-aos="zoom-in" data-aos-delay="600">
                    <span ref={typedRef} className="text-xl md:text-3xl font-light mb-8 block text-school-accent"></span>
                  </div>
                  
                  <div 
                    className="flex flex-wrap justify-center gap-6 mt-6"
                    data-aos="fade-up" 
                    data-aos-delay="800"
                  >
                    <Link to="/admissions">
                      <Button 
                        size="lg"
                        variant="default" 
                        className="bg-school-primary hover:bg-school-secondary transition-all duration-300 hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transform hover:scale-105"
                      >
                        Apply Now
                      </Button>
                    </Link>
                    <Link to="/about">
                      <Button 
                        size="lg"
                        variant="outline" 
                        className="bg-transparent text-white border-white hover:bg-white hover:text-school-primary transition-all duration-300"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Custom Navigation Controls */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-8 z-10">
        {/* Play/Pause Button */}
        <button
          className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        {/* Dots Navigation */}
        <div className="flex justify-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Arrow Navigation */}
        <div className="flex gap-4">
          <button
            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
            onClick={goToPrevSlide}
            aria-label="Previous slide"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
            onClick={goToNextSlide}
            aria-label="Next slide"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
