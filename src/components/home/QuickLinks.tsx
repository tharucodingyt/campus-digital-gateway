
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
      color: 'bg-blue-50',
    },
    {
      title: 'Academic Calendar',
      description: 'View important dates and school events',
      icon: <Calendar className="h-8 w-8 text-school-primary animate-icon" />,
      link: '/events#calendar',
      color: 'bg-green-50',
    },
    {
      title: 'Teacher/Admin Login',
      description: 'Access your dashboard and resources',
      icon: <LogIn className="h-8 w-8 text-school-primary animate-icon" />,
      link: '/login',
      color: 'bg-amber-50',
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with our administration',
      icon: <Phone className="h-8 w-8 text-school-primary animate-icon" />,
      link: '/contact',
      color: 'bg-purple-50',
    },
    {
      title: 'Student Portal',
      description: 'Access study materials and grades',
      icon: <GraduationCap className="h-8 w-8 text-school-primary animate-icon" />,
      link: '/login?role=student',
      color: 'bg-red-50',
    },
    {
      title: 'Library Resources',
      description: 'Browse our digital and physical collections',
      icon: <BookOpen className="h-8 w-8 text-school-primary animate-icon" />,
      link: '/resources#library',
      color: 'bg-teal-50',
    }
  ];

  return (
    <section className="py-12 bg-gray-50" id="quick-links">
      <div className="container-custom">
        <h2 className="section-heading text-center mb-12" data-aos="fade-up">Quick Access</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`card-link ${item.color} rounded-lg p-6 shadow-sm transition-all duration-300 transform hover:-translate-y-2`}
              data-aos="fade-up"
              data-aos-delay={100 + (index * 50)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 card-icon-container p-3 rounded-full bg-white/80">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-school-primary">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
