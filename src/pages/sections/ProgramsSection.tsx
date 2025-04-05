
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

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {section 
              ? `${section.charAt(0).toUpperCase() + section.slice(1)} Programs` 
              : "All Academic Programs"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {section === 'technical' && "Explore our technical programs focusing on IT, Engineering, and more."}
            {section === 'science' && "Discover our science programs with Physics, Chemistry, Biology, and Mathematics."}
            {section === 'general' && "Learn about our general education programs in Humanities, Commerce, and Languages."}
            {section === 'primary' && "Foundational learning through play-based methods for grades I-V."}
            {section === 'secondary' && "Intermediate learning and board exam preparation for grades VI-X."}
            {!section && "Discover our comprehensive range of academic programs designed to nurture talent and foster excellence."}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">Error loading programs: {error}</p>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-10">
            <p>No programs available in this category. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program) => (
              <Card key={program.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={program.image_url || 'https://via.placeholder.com/800x400?text=Program'}
                    alt={program.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/800x400?text=Program';
                    }}
                  />
                  {program.duration && (
                    <Badge className="absolute top-4 right-4">
                      {program.duration}
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-2xl">{program.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    {program.duration && (
                      <span>{program.duration}</span>
                    )}
                    {program.category && (
                      <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {program.category}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="mb-6">{program.description}</p>
                  
                  {program.features && program.features.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Program Features:</h3>
                      <ul className="space-y-2">
                        {program.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>{feature}</span>
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
    </Layout>
  );
};

export default ProgramsSection;
