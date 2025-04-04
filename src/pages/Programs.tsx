
import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  features: string[];
  image_url?: string;
}

const Programs = () => {
  const [activeTab, setActiveTab] = useState('');
  const [programs, setPrograms] = useState<Record<string, Program>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const defaultProgramImage = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';

  // Sample fallback facilities data
  const facilities = [
    { name: 'Modern Classrooms', description: 'Spacious, well-ventilated classrooms equipped with smart boards and modern teaching aids.' },
    { name: 'Science Laboratories', description: 'Well-equipped physics, chemistry, and biology labs for practical learning.' },
    { name: 'Computer Labs', description: 'Modern computer labs with the latest hardware and software for technical education.' },
    { name: 'Library', description: 'Extensive collection of books, journals, and digital resources for research and reading.' },
    { name: 'Sports Facilities', description: 'Sports grounds, indoor games facilities, and equipment for physical education.' },
    { name: 'Auditorium', description: 'Multipurpose auditorium for cultural events, seminars, and performances.' }
  ];

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('status', 'published');

      if (error) {
        console.error("Error fetching programs:", error);
        toast({
          title: "Error",
          description: "Failed to fetch programs data. Using sample data.",
          variant: "destructive",
        });
        return;
      }

      if (data && data.length > 0) {
        const programsMap: Record<string, Program> = {};
        
        // Process and organize the data
        data.forEach(program => {
          // Create a key based on program title or a slugified version of the title
          const key = program.title.toLowerCase().replace(/\s+/g, '-');
          
          // Format the program data
          programsMap[key] = {
            id: program.id,
            title: program.title,
            description: program.description,
            duration: program.duration || 'Regular Program',
            features: program.features ? 
              (Array.isArray(program.features) ? program.features : Object.values(program.features)) : 
              [],
            image_url: program.image_url || defaultProgramImage
          };
        });
        
        setPrograms(programsMap);
        
        // Set the active tab to the first program's key if it exists
        if (Object.keys(programsMap).length > 0) {
          setActiveTab(Object.keys(programsMap)[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch programs data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentProgram = activeTab ? programs[activeTab] : null;

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
            {isLoading ? (
              <div className="text-center py-5">
                <p>Loading programs...</p>
              </div>
            ) : Object.keys(programs).length > 0 ? (
              <div className="flex flex-wrap justify-center">
                {Object.entries(programs).map(([key, program]) => (
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
                    {program.title}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <p>No programs found. Programs will be displayed here once added by an admin.</p>
              </div>
            )}
          </div>
        </section>

        {/* Program Details */}
        {currentProgram && (
          <section className="py-12 bg-gray-50">
            <div className="container-custom">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 md:w-1/3">
                    <img
                      className="h-64 w-full object-cover md:h-full"
                      src={currentProgram.image_url}
                      alt={currentProgram.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = defaultProgramImage;
                      }}
                    />
                  </div>
                  <div className="p-8 md:w-2/3">
                    <h2 className="text-3xl font-bold text-school-primary mb-4">{currentProgram.title}</h2>
                    <p className="text-gray-700 mb-6">{currentProgram.description}</p>
                    
                    <h3 className="text-xl font-semibold text-school-secondary mb-3">Program Duration</h3>
                    <p className="mb-6 text-gray-700">{currentProgram.duration}</p>
                    
                    {currentProgram.features && currentProgram.features.length > 0 && (
                      <>
                        <h3 className="text-xl font-semibold text-school-secondary mb-3">Key Features</h3>
                        <ul className="list-disc list-inside space-y-1 mb-6 text-gray-700">
                          {currentProgram.features.map((feature, index) => (
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
                  Interested in enrolling your child in our {currentProgram.title} program?
                </p>
                <a href="/admissions" className="btn-primary">
                  Apply for Admission
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Facilities Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="section-heading text-center mb-12">Our Educational Facilities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {facilities.map((facility, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-school-primary mb-3">{facility.name}</h3>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Programs;
