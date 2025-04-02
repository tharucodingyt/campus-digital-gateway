
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    // Here you would typically send the data to a server
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    // Reset form submitted status after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-80 bg-school-primary">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559523275-0b8f02a81751?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative container-custom h-full flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-3xl">Get in touch with us for any inquiries or to schedule a visit</p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-school-accent rounded-full">
                    <MapPin className="h-6 w-6 text-school-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-school-primary mb-2">Our Location</h3>
                <p className="text-gray-600">123 Education Road, Academic District, City, Country</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-school-accent rounded-full">
                    <Phone className="h-6 w-6 text-school-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-school-primary mb-2">Phone Number</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-gray-600">+1 (555) 765-4321</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-school-accent rounded-full">
                    <Mail className="h-6 w-6 text-school-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-school-primary mb-2">Email Address</h3>
                <p className="text-gray-600">info@campusgateway.edu</p>
                <p className="text-gray-600">admissions@campusgateway.edu</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-school-accent rounded-full">
                    <Clock className="h-6 w-6 text-school-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-school-primary mb-2">Office Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9 AM - 4 PM</p>
                <p className="text-gray-600">Saturday: 9 AM - 12 PM</p>
              </div>
            </div>
          </div>
        </section>

        {/* Map and Contact Form */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Map */}
              <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215266467711!2d-73.98509278461598!3d40.74866597932764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b30eac9f%3A0xaca8d930bacf250d!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1676988348388!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School Location"
                />
              </div>
              
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-school-primary mb-6">Send Us a Message</h2>
                
                {formSubmitted ? (
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                    <p className="font-bold">Thank you!</p>
                    <p>Your message has been sent successfully. We'll get back to you soon.</p>
                  </div>
                ) : null}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-school-primary"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-school-primary"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-school-primary"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-school-primary"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="section-heading text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-school-primary mb-2">How can I schedule a campus visit?</h3>
                  <p className="text-gray-600">
                    You can schedule a campus tour by calling our admissions office or filling out the contact form on this page.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-school-primary mb-2">How can I check my child's attendance?</h3>
                  <p className="text-gray-600">
                    Parents can check attendance and other academic records through our online portal. Login credentials are provided at the beginning of the academic year.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-school-primary mb-2">Who should I contact for fee-related queries?</h3>
                  <p className="text-gray-600">
                    For fee-related inquiries, please contact our accounts department at accounts@campusgateway.edu or call during office hours.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-school-primary mb-2">How can I apply for a teaching position?</h3>
                  <p className="text-gray-600">
                    We post all job openings on our careers page. You can also send your resume to careers@campusgateway.edu for future opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
