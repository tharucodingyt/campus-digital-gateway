
import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroBanner from '../components/home/HeroBanner';
import QuickLinks from '../components/home/QuickLinks';
import FeaturedNews from '../components/home/FeaturedNews';
import Testimonials from '../components/home/Testimonials';
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
        
        <div data-aos="fade-up" data-aos-delay="100">
          <FeaturedNews />
        </div>
        
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
