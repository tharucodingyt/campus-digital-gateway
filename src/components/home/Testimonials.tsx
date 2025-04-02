
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
    <section className="py-12 bg-school-accent">
      <div className="container-custom">
        <h2 className="section-heading text-center mb-12">What Our Community Says</h2>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          {/* Testimonials */}
          <div className="relative bg-white rounded-lg shadow-lg p-8 md:p-10">
            <div className="relative z-10">
              <svg
                className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-school-primary opacity-20"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              
              <div className="relative">
                <p className="text-gray-600 text-xl italic mb-6">{testimonials[activeIndex].quote}</p>
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-school-primary">{testimonials[activeIndex].name}</h4>
                    <p className="text-gray-500">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white text-school-primary border border-school-primary hover:bg-school-primary hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === activeIndex 
                      ? 'bg-school-primary' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white text-school-primary border border-school-primary hover:bg-school-primary hover:text-white transition-colors"
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
