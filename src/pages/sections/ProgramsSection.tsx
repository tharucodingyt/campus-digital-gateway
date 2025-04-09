
import { useState, useEffect } from "react";
import { Layout } from '@/components/layout/layout';
import { useParams, Navigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import ParallaxSection from "@/components/layout/ParallaxSection";

interface Program {
  id: string;
  title: string;
  description: string;
  features?: string[];
  duration?: string;
  image_url?: string;
  status?: string;
  category?: string;
}

const ProgramsSection = () => {
  const { section } = useParams();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Image placeholder options for fallback
  const placeholderImages = [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80'
  ];

  // Get a random image placeholder based on program id
  const getPlaceholderImage = (id: string) => {
    // Use the last character of the id as a simple hash
    const lastChar = id.slice(-1);
    const index = parseInt(lastChar, 16) % placeholderImages.length;
    return placeholderImages[index];
  };

  useEffect(() => {
    fetchSectionPrograms();
  }, [section]);

  async function fetchSectionPrograms() {
    try {
      setIsLoading(true);
      // Start with base query
      let query = supabase
        .from('programs')
        .select('*')
        .eq('status', 'published');

      // Get all programs, filter by category client-side
      const { data, error } = await query.order('title', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      // Map the database fields to our Program interface
      const formattedPrograms = data.map(program => {
        // Safely extract features and category from program.requirements
        let features: string[] = [];
        let category = "general"; // Default category
        
        try {
          // Check if requirements is a string and can be parsed as JSON
          if (program.requirements) {
            const parsed = JSON.parse(program.requirements);
            
            // Extract features
            if (parsed.features && Array.isArray(parsed.features)) {
              features = parsed.features;
            } else if (Array.isArray(parsed)) {
              features = parsed;
            } else if (typeof parsed === 'object') {
              features = Object.values(parsed).filter(item => typeof item === 'string');
            }
            
            // Extract category if it exists
            if (parsed.category) {
              category = parsed.category;
            }
          }
        } catch (e) {
          // If requirements isn't valid JSON, treat it as a comma-separated list
          if (typeof program.requirements === 'string') {
            features = program.requirements.split(',').map(item => item.trim());
          }
        }

        return {
          id: program.id,
          title: program.title,
          description: program.description,
          duration: program.duration,
          // Use admin-uploaded image URL or fallback to placeholder
          image_url: program.image_url || getPlaceholderImage(program.id),
          features: features,
          status: program.status,
          category: category
        };
      });

      // If a section is specified, filter programs by category
      let filteredPrograms = formattedPrograms;
      if (section) {
        filteredPrograms = formattedPrograms.filter(program => {
          return program.category === section;
        });
      }

      setPrograms(filteredPrograms);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching programs:", err);
    } finally {
      setIsLoading(false);
    }
  }

  // Redirect to Programs page if section is invalid or not found
  const validSections = ['technical', 'science', 'general', 'primary', 'secondary'];
  if (section && !validSections.includes(section)) {
    return <Navigate to="/programs" replace />;
  }

  const getSectionDescription = () => {
    switch(section) {
      case 'technical':
        return "Explore our technical programs focusing on IT, Engineering, and more.";
      case 'science':
        return "Discover our science programs with Physics, Chemistry, Biology, and Mathematics.";
      case 'general':
        return "Learn about our general education programs in Humanities, Commerce, and Languages.";
      case 'primary':
        return "Foundational learning through play-based methods for grades I-V.";
      case 'secondary':
        return "Intermediate learning and board exam preparation for grades VI-X.";
      default:
        return "Discover our comprehensive range of academic programs designed to nurture talent and foster excellence.";
    }
  };

  const getSectionBannerImage = () => {
    switch(section) {
      case 'technical':
        return 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=2000&q=80';
      case 'science':
        return 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=2000&q=80';
      case 'general':
        return 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=2000&q=80';
      case 'primary':
        return 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=2000&q=80';
      case 'secondary':
        return 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2000&q=80';
      default:
        return 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80';
    }
  };

  return (
    <Layout>
      {/* Hero Banner Section with background image */}
      <ParallaxSection
        backgroundImage={getSectionBannerImage()}
        height="500px"
        overlayColor="rgba(0, 0, 0, 0.6)"
      >
        <div className="container mx-auto relative z-10 flex flex-col items-center justify-center text-center">
          <div className="w-full max-w-3xl mb-8 md:mb-0 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {section 
                ? `${section.charAt(0).toUpperCase() + section.slice(1)} Programs` 
                : "All Academic Programs"}
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Whole child development with progressive education methods
            </p>
            <Button className="bg-white text-primary hover:bg-gray-100">
              Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </ParallaxSection>

      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {getSectionDescription()}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-10 bg-red-50 rounded-xl border border-red-100 p-8">
            <p className="text-red-500 font-medium">Error loading programs: {error}</p>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100 p-8">
            <p className="text-lg text-gray-600">No programs available in this category. Please check back later.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {programs.map((program) => (
              <Card key={program.id} className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-60 md:h-auto relative">
                    {program.image_url ? (
                      <img
                        src={program.image_url}
                        alt={program.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getPlaceholderImage(program.id);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <ImageIcon className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 space-x-2">
                      {program.category && (
                        <Badge className="bg-primary/80 hover:bg-primary text-white border-0">
                          {program.category}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="flex-1 p-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                      {program.duration && (
                        <Badge variant="outline" className="mb-2">
                          {program.duration}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="mb-6 text-gray-700">{program.description}</p>
                    
                    {program.features && program.features.length > 0 && (
                      <div className="bg-gray-50 p-5 rounded-lg">
                        <h3 className="font-semibold mb-2">Program Features:</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {program.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <Button className="bg-primary hover:bg-primary/90 text-white border-0">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProgramsSection;
