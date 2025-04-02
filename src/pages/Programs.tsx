
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Programs = () => {
  const [activeTab, setActiveTab] = useState('technical');

  const programs = {
    technical: {
      title: 'Technical Stream (IX-XII)',
      description: 'Our technical stream prepares students with practical skills and knowledge in various technical domains.',
      subjects: ['Information Technology', 'Basic Electronics', 'Technical Drawing', 'Engineering Mathematics', 'Workshop Practice'],
      features: ['Well-equipped laboratories', 'Industry-experienced faculty', 'Field visits and internships', 'Project-based learning'],
      careers: ['Engineering', 'Technical Design', 'IT Professionals', 'Technical Consultancy'],
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    },
    science: {
      title: 'Science Stream (XI-XII)',
      description: 'Our science stream focuses on developing strong theoretical and practical knowledge in core science subjects.',
      subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science'],
      features: ['Modern laboratories', 'Experienced science faculty', 'Regular experiments and demonstrations', 'Science olympiad preparation'],
      careers: ['Medicine', 'Research', 'Engineering', 'Environmental Science'],
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    },
    general: {
      title: 'General Stream (XI-XII)',
      description: 'Our general stream offers a balanced curriculum with focus on humanities, commerce, and languages.',
      subjects: ['Economics', 'Business Studies', 'Accountancy', 'Political Science', 'History', 'Geography'],
      features: ['Comprehensive library', 'Career counseling', 'Debates and discussions', 'Field trips'],
      careers: ['Management', 'Law', 'Civil Services', 'Media and Communications'],
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    },
    primary: {
      title: 'Primary School (I-V)',
      description: 'Our primary education focuses on building a strong foundation for future learning through activity-based methods.',
      subjects: ['Language and Literacy', 'Mathematics', 'Environmental Studies', 'Arts and Crafts', 'Physical Education'],
      features: ['Child-friendly classrooms', 'Play-based learning', 'Individual attention', 'Regular parent-teacher interaction'],
      specialFeatures: ['Story sessions', 'Field trips', 'Cultural activities', 'Sports and games'],
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1722&q=80',
    },
    secondary: {
      title: 'Secondary School (VI-X)',
      description: 'Our secondary education builds on the foundation with more structured learning and preparation for board exams.',
      subjects: ['Languages', 'Mathematics', 'Science', 'Social Studies', 'Information Technology'],
      features: ['Subject-specific labs', 'Experienced teachers', 'Regular assessments', 'Exam preparation'],
      specialFeatures: ['Career guidance', 'Extra-curricular activities', 'Leadership opportunities', 'Community service'],
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1764&q=80',
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-80 bg-school-primary">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative container-custom h-full flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Academic Programs</h1>
            <p className="text-xl max-w-3xl">Explore our diverse educational offerings designed to nurture young minds</p>
          </div>
        </section>

        {/* Programs Navigation */}
        <section className="py-8 bg-white border-b">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center">
              {Object.keys(programs).map((key) => (
                <button
                  key={key}
                  className={`px-4 py-2 mx-2 mb-2 rounded-md transition-colors ${
                    activeTab === key
                      ? 'bg-school-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab(key)}
                  id={key}
                >
                  {programs[key].title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Program Details */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/3">
                  <img
                    className="h-64 w-full object-cover md:h-full"
                    src={programs[activeTab].image}
                    alt={programs[activeTab].title}
                  />
                </div>
                <div className="p-8 md:w-2/3">
                  <h2 className="text-3xl font-bold text-school-primary mb-4">{programs[activeTab].title}</h2>
                  <p className="text-gray-700 mb-6">{programs[activeTab].description}</p>
                  
                  <h3 className="text-xl font-semibold text-school-secondary mb-3">Core Subjects</h3>
                  <ul className="list-disc list-inside space-y-1 mb-6 text-gray-700">
                    {programs[activeTab].subjects.map((subject, index) => (
                      <li key={index}>{subject}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-school-secondary mb-3">Key Features</h3>
                  <ul className="list-disc list-inside space-y-1 mb-6 text-gray-700">
                    {programs[activeTab].features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  
                  {programs[activeTab].careers && (
                    <>
                      <h3 className="text-xl font-semibold text-school-secondary mb-3">Career Opportunities</h3>
                      <ul className="list-disc list-inside space-y-1 mb-6 text-gray-700">
                        {programs[activeTab].careers.map((career, index) => (
                          <li key={index}>{career}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {programs[activeTab].specialFeatures && (
                    <>
                      <h3 className="text-xl font-semibold text-school-secondary mb-3">Special Features</h3>
                      <ul className="list-disc list-inside space-y-1 mb-6 text-gray-700">
                        {programs[activeTab].specialFeatures.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  <div className="mt-6">
                    <a
                      href="#"
                      className="inline-block text-school-secondary font-medium underline hover:text-school-primary"
                    >
                      Download Syllabus PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-10 text-center">
              <p className="text-gray-700 mb-6">
                Interested in enrolling your child in our {programs[activeTab].title} program?
              </p>
              <a href="/admissions" className="btn-primary">
                Apply for Admission
              </a>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="section-heading text-center mb-12">Our Educational Facilities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-school-primary mb-3">Modern Classrooms</h3>
                <p className="text-gray-600">
                  Spacious, well-ventilated classrooms equipped with smart boards and modern teaching aids.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-school-primary mb-3">Science Laboratories</h3>
                <p className="text-gray-600">
                  Well-equipped physics, chemistry, and biology labs for practical learning.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-school-primary mb-3">Computer Labs</h3>
                <p className="text-gray-600">
                  Modern computer labs with the latest hardware and software for technical education.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-school-primary mb-3">Library</h3>
                <p className="text-gray-600">
                  Extensive collection of books, journals, and digital resources for research and reading.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-school-primary mb-3">Sports Facilities</h3>
                <p className="text-gray-600">
                  Sports grounds, indoor games facilities, and equipment for physical education.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-school-primary mb-3">Auditorium</h3>
                <p className="text-gray-600">
                  Multipurpose auditorium for cultural events, seminars, and performances.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Programs;
