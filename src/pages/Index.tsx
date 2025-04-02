
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroBanner from '../components/home/HeroBanner';
import QuickLinks from '../components/home/QuickLinks';
import FeaturedNews from '../components/home/FeaturedNews';
import Testimonials from '../components/home/Testimonials';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroBanner />
        <QuickLinks />
        <FeaturedNews />
        <Testimonials />
        
        {/* Call to Action Section */}
        <section className="py-16 bg-school-primary text-white text-center">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Our Community?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Take the first step towards a bright future. Apply for admission today.
            </p>
            <a
              href="/admissions"
              className="inline-block bg-white text-school-primary font-medium py-3 px-8 rounded-md hover:bg-school-accent transition-colors"
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
