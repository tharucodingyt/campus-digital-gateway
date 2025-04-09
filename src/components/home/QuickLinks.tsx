
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, LogIn, Phone, GraduationCap, BookOpen } from 'lucide-react';

const QuickLinks = () => {
  const links = [
    {
      title: 'Admission Portal',
      description: 'Apply for admission to any of our programs',
      icon: <User className="h-8 w-8 text-school-primary animate-icon" />,
      link: '/admissions',
      color: 'bg-school-pastel-blue',
    },
    {
      title: 'Academic Calendar',
      description: 'View important dates and school events',
      icon: <Calendar className="h-8 w-8 text-school-primary animate-icon" />,
      link: '/events#calendar',
      color: 'bg-school-pastel-green',
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with our administration',
      icon: <Phone className="h-8 w-8 text-school-primary animate-icon" />,
      link: '/contact',
      color: 'bg-school-pastel-purple',
    }
  ];

  return (
    <section className="py-16 bg-school-neutral" id="quick-links">
      <div className="container-custom">
        <h2 className="section-heading text-center mb-12" data-aos="fade-up">Quick Access</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="card-link bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={100 + (index * 50)}
            >
              <div className="flex flex-col items-center text-center p-8">
                <div className="mb-5 card-icon-container bg-gray-50">
                  {item.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 text-school-primary">{item.title}</h3>
                <p className="text-gray-600 font-medium">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
