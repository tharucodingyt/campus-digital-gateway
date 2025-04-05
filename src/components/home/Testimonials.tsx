
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "My child has flourished academically and socially since joining this school. The teachers are dedicated and the facilities are excellent.",
      name: "Sarah Johnson",
      role: "Parent",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
      id: 2,
      quote: "The holistic approach to education at this school prepared me not just for university but for life. I'm proud to be an alumnus.",
      name: "Michael Lee",
      role: "Alumni, Batch of 2018",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
      id: 3,
      quote: "I love my school because we learn so many interesting things and the teachers make learning fun. The sports facilities are amazing too!",
      name: "Emma Thompson",
      role: "Student, Grade 7",
      image: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-school-cream">
      <div className="container-custom">
        <h2 className="section-heading text-center mb-12">What Our Community Says</h2>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          {/* Testimonials */}
          <div className="relative bg-white rounded-2xl shadow-card p-8 md:p-10 overflow-hidden">
            <div className="absolute top-6 left-6 text-school-pastel-blue">
              <Quote size={48} className="opacity-30" />
            </div>
            
            <div className="relative z-10 pt-6">              
              <div className="relative">
                <p className="text-gray-700 text-xl italic mb-8 leading-relaxed">{testimonials[activeIndex].quote}</p>
                <div className="flex items-center">
                  <img
                    className="h-16 w-16 rounded-full object-cover ring-4 ring-school-pastel-blue/30"
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                  />
                  <div className="ml-4">
                    <h4 className="font-heading font-semibold text-lg text-school-primary">{testimonials[activeIndex].name}</h4>
                    <p className="text-gray-500">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center mt-10 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white text-school-primary border border-school-primary/20 hover:bg-school-primary hover:text-white transition-colors shadow-sm hover:shadow-md"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex space-x-3 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-school-primary scale-125 shadow-sm' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white text-school-primary border border-school-primary/20 hover:bg-school-primary hover:text-white transition-colors shadow-sm hover:shadow-md"
              aria-label="Next testimonial"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
