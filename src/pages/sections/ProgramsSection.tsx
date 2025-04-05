
import { useState, useEffect } from "react";
import { Layout } from '@/components/layout/layout';
import { useParams, Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

      // Filter by section is now done client-side based on extracted category
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
          image_url: program.image_url,
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

  return (
    <Layout>
      <div className="bg-gradient-to-b from-school-light to-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-school-primary tracking-tight">
              {section 
                ? `${section.charAt(0).toUpperCase() + section.slice(1)} Programs` 
                : "All Academic Programs"}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
              {getSectionDescription()}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-school-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-10 bg-red-50 rounded-xl border border-red-100 p-8">
              <p className="text-red-500 font-medium">Error loading programs: {error}</p>
            </div>
          ) : programs.length === 0 ? (
            <div className="text-center py-16 bg-school-neutral rounded-xl border border-gray-100 p-8">
              <p className="text-lg text-gray-600">No programs available in this category. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {programs.map((program, index) => (
                <Card key={program.id} className="overflow-hidden border-0 shadow-card transition-all duration-300 hover:shadow-soft-lg group">
                  <div className="relative">
                    <img
                      src={program.image_url || 'https://via.placeholder.com/800x400?text=Program'}
                      alt={program.title}
                      className="w-full h-52 object-cover transition-all duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/800x400?text=Program';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                    <div className="absolute top-4 right-4 space-x-2">
                      {program.duration && (
                        <Badge className="bg-school-primary hover:bg-school-secondary">
                          {program.duration}
                        </Badge>
                      )}
                      {program.category && (
                        <Badge variant="outline" className="bg-white/90 text-school-primary border-0">
                          {program.category}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardHeader className="relative -mt-8 bg-white rounded-t-2xl z-10 pb-0">
                    <CardTitle className="text-2xl font-heading font-bold text-school-primary">{program.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      {program.duration && (
                        <span className="text-sm text-gray-600 font-medium">{program.duration}</span>
                      )}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-4">
                    <p className="mb-6 text-gray-600 leading-relaxed">{program.description}</p>
                    
                    {program.features && program.features.length > 0 && (
                      <div className="bg-school-neutral/50 p-5 rounded-lg">
                        <h3 className="font-medium mb-3 text-school-primary">Program Features:</h3>
                        <ul className="space-y-2.5">
                          {program.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProgramsSection;
