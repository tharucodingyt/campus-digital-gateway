
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

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
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl">{slide.heading}</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">{slide.subheading}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/admissions" className="btn-primary">
                Apply Now
              </Link>
              <Link to="/about" className="btn-secondary text-white border-white hover:text-school-primary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
        onClick={goToPrevSlide}
      >
        <ArrowLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
        onClick={goToNextSlide}
      >
        <ArrowRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
