
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AboutUs = () => {
  // School history milestones
  const historyMilestones = [
    { year: '1995', event: 'Founded with a vision to provide quality education' },
    { year: '2000', event: 'Expanded to include secondary education' },
    { year: '2005', event: 'Added science and technical streams' },
    { year: '2010', event: 'Opened new campus with modern facilities' },
    { year: '2015', event: 'Celebrated 20 years of educational excellence' },
    { year: '2020', event: 'Launched digital learning initiatives' },
  ];

  // Leadership team
  const leadership = [
    {
      id: 1,
      name: 'Dr. Robert Johnson',
      position: 'Principal',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      message: 'Our mission is to provide a nurturing environment where students can develop intellectually, emotionally, and socially. We strive to cultivate a love for learning that will last a lifetime.',
    },
    {
      id: 2,
      name: 'Prof. Amanda Carter',
      position: 'Vice Principal',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
      message: 'Academic excellence is at the core of our philosophy. We focus on developing critical thinking skills, problem-solving abilities, and a growth mindset in all our students.',
    },
    {
      id: 3,
      name: 'Mr. David Thompson',
      position: 'Managing Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      message: 'Our investment in quality infrastructure, talented faculty, and innovative teaching methods ensures that we remain at the forefront of educational excellence.',
    },
    {
      id: 4,
      name: 'Dr. Elizabeth Chen',
      position: 'Chairman',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1761&q=80',
      message: 'Education is the foundation of society. Our commitment is to shape responsible citizens who will contribute positively to their communities and the world at large.',
    },
  ];

  // Admin team
  const adminTeam = [
    { name: 'Michael Robertson', position: 'Administrative Director', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80' },
    { name: 'Sarah Williams', position: 'Admissions Coordinator', image: 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80' },
    { name: 'James Parker', position: 'Finance Manager', image: 'https://images.unsplash.com/photo-1602459816722-c364d7797af7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80' },
    { name: 'Jessica Thompson', position: 'Student Counselor', image: 'https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80' },
  ];

  // Faculty departments
  const departments = [
    { name: 'Science Department', count: '12 Faculty Members' },
    { name: 'Mathematics Department', count: '8 Faculty Members' },
    { name: 'Languages Department', count: '10 Faculty Members' },
    { name: 'Social Studies Department', count: '6 Faculty Members' },
    { name: 'Computer Science Department', count: '5 Faculty Members' },
    { name: 'Arts and Music Department', count: '7 Faculty Members' },
    { name: 'Physical Education Department', count: '4 Faculty Members' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-80 bg-school-primary">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative container-custom h-full flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl max-w-3xl">Learn about our history, mission, and the dedicated team behind our success</p>
          </div>
        </section>

        {/* History Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="section-heading text-center">Our History</h2>
            <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
              Since our foundation in 1995, we have been committed to providing quality education and nurturing young talents.
            </p>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-school-accent"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {historyMilestones.map((milestone, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-center">
                      <div className="bg-school-primary text-white font-bold py-2 px-4 rounded-md z-10">
                        {milestone.year}
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Messages Section */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <h2 className="section-heading text-center mb-12">Leadership Messages</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {leadership.map((leader) => (
                <div key={leader.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img
                        className="h-48 w-full md:h-full md:w-48 object-cover"
                        src={leader.image}
                        alt={leader.name}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-school-primary">{leader.name}</h3>
                      <p className="text-school-secondary font-medium mb-4">{leader.position}</p>
                      <p className="text-gray-600 italic">{leader.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Administrative Team Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="section-heading text-center mb-12">Our Administrative Team</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {adminTeam.map((member, index) => (
                <div key={index} className="bg-gray-50 rounded-lg overflow-hidden text-center shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-school-primary">{member.name}</h3>
                    <p className="text-gray-600">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Faculty Section */}
        <section className="py-12 bg-school-accent">
          <div className="container-custom">
            <h2 className="section-heading text-center mb-12">Our Faculty</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-school-primary mb-2">{dept.name}</h3>
                  <p className="text-gray-600">{dept.count}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-700 mb-6">
                Our faculty members are highly qualified professionals dedicated to providing the best education.
              </p>
              <a href="#" className="btn-primary">
                View All Faculty
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
