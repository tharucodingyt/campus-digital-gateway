
import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroBanner from '../components/home/HeroBanner';
import QuickLinks from '../components/home/QuickLinks';
import FeaturedNews from '../components/home/FeaturedNews';
import Testimonials from '../components/home/Testimonials';
import ParallaxSection from '../components/layout/ParallaxSection';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  useEffect(() => {
    // Initialize AOS with more options
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      offset: 100,
      delay: 100,
      mirror: true
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroBanner />
        
        <div data-aos="fade-up">
          <QuickLinks />
        </div>
        
        <ParallaxSection 
          backgroundImage="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          height="400px"
        >
          <div className="text-center text-white" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="200">
              To nurture young minds and prepare them to become responsible global citizens through 
              quality education that focuses on academic excellence, character building, and innovation.
            </p>
            <div data-aos="zoom-in" data-aos-delay="400">
              <a
                href="/about"
                className="inline-block bg-white text-school-primary font-medium py-3 px-8 rounded-md hover:bg-school-accent transition-colors hover:shadow-lg transform hover:scale-105"
              >
                Learn More About Us
              </a>
            </div>
          </div>
        </ParallaxSection>
        
        <div data-aos="fade-up" data-aos-delay="100">
          <FeaturedNews />
        </div>
        
        <ParallaxSection 
          backgroundImage="https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          overlayColor="rgba(24, 53, 124, 0.7)"
          height="350px"
        >
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-down">Our Programs</h2>
            <p className="text-xl max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              From elementary to high school, we offer comprehensive programs focusing on academic 
              excellence, character development, and real-world skills.
            </p>
            <div className="flex justify-center mt-8 gap-4" data-aos="fade-up" data-aos-delay="400">
              <a
                href="/programs#elementary"
                className="inline-block bg-transparent border border-white text-white font-medium py-2 px-6 rounded-md hover:bg-white hover:text-school-primary transition-all duration-300 transform hover:scale-105"
              >
                Elementary
              </a>
              <a
                href="/programs#middle"
                className="inline-block bg-transparent border border-white text-white font-medium py-2 px-6 rounded-md hover:bg-white hover:text-school-primary transition-all duration-300 transform hover:scale-105"
              >
                Middle School
              </a>
              <a
                href="/programs#high"
                className="inline-block bg-transparent border border-white text-white font-medium py-2 px-6 rounded-md hover:bg-white hover:text-school-primary transition-all duration-300 transform hover:scale-105"
              >
                High School
              </a>
            </div>
          </div>
        </ParallaxSection>
        
        <div data-aos="fade-up" data-aos-delay="200">
          <Testimonials />
        </div>
        
        {/* Call to Action Section */}
        <section 
          className="py-16 bg-school-primary text-white text-center"
          data-aos="fade-up" 
          data-aos-delay="300"
        >
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Our Community?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Take the first step towards a bright future. Apply for admission today.
            </p>
            <a
              href="/admissions"
              className="inline-block bg-white text-school-primary font-medium py-3 px-8 rounded-md hover:bg-school-accent transition-colors hover:shadow-lg transform hover-scale"
            >
              Apply Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
