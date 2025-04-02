
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, LogIn } from 'lucide-react';

const QuickLinks = () => {
  const links = [
    {
      title: 'Admission Portal',
      description: 'Apply for admission to any of our programs',
      icon: <User className="h-8 w-8 text-school-primary" />,
      link: '/admissions',
      color: 'bg-blue-50',
    },
    {
      title: 'Academic Calendar',
      description: 'View important dates and school events',
      icon: <Calendar className="h-8 w-8 text-school-primary" />,
      link: '/events#calendar',
      color: 'bg-green-50',
    },
    {
      title: 'Teacher/Admin Login',
      description: 'Access your dashboard and resources',
      icon: <LogIn className="h-8 w-8 text-school-primary" />,
      link: '/login',
      color: 'bg-amber-50',
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-heading text-center mb-12">Quick Access</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`${item.color} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{item.icon}</div>
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
