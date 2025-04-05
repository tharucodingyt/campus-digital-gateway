
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-school-light via-white to-white">
      <Navbar />
      <main className="flex-grow">
        <HeroBanner />
        
        <div data-aos="fade-up">
          <QuickLinks />
        </div>
        
        <ParallaxSection 
          backgroundImage="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          height="450px"
        >
          <div className="text-center text-white" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-shadow-sm">Our Mission & Vision</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 leading-relaxed text-shadow-sm" data-aos="fade-up" data-aos-delay="200">
              To nurture young minds and prepare them to become responsible global citizens through 
              quality education that focuses on academic excellence, character building, and innovation.
            </p>
            <div data-aos="zoom-in" data-aos-delay="400">
              <a
                href="/about"
                className="btn-modern-primary inline-block"
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
          overlayColor="rgba(55, 90, 140, 0.7)"
          height="400px"
        >
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-shadow" data-aos="fade-down">Our Programs</h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
              From elementary to high school, we offer comprehensive programs focusing on academic 
              excellence, character development, and real-world skills.
            </p>
            <div className="flex flex-wrap justify-center mt-8 gap-4" data-aos="fade-up" data-aos-delay="400">
              <a
                href="/programs/primary"
                className="btn-modern-outline"
              >
                Primary
              </a>
              <a
                href="/programs/secondary"
                className="btn-modern-outline"
              >
                Secondary
              </a>
              <a
                href="/programs/technical"
                className="btn-modern-outline"
              >
                Technical
              </a>
            </div>
          </div>
        </ParallaxSection>
        
        <div data-aos="fade-up" data-aos-delay="200">
          <Testimonials />
        </div>
        
        {/* Call to Action Section */}
        <section 
          className="py-20 bg-gradient-to-r from-school-primary to-school-secondary text-white text-center"
          data-aos="fade-up" 
          data-aos-delay="300"
        >
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-shadow-sm">Ready to Join Our Community?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Take the first step towards a bright future. Apply for admission today.
            </p>
            <a
              href="/admissions"
              className="inline-flex items-center bg-white text-school-primary font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1"
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
