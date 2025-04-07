
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Import Layout correctly
import { Layout } from "@/components/layout/layout";

interface Program {
  id: string;
  title: string;
  description: string;
  features?: string[];
  duration?: string;
  image_url?: string;
  status?: string;
}

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Image placeholder options
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
    async function fetchPrograms() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('programs')
          .select('*')
          .eq('status', 'published')
          .order('title', { ascending: true });

        if (error) {
          throw new Error(error.message);
        }

        // Map the database fields to our Program interface
        const formattedPrograms = data.map(program => {
          // Safely extract features from program.requirements
          let features: string[] = [];
          try {
            // Check if requirements is a string and can be parsed as JSON
            if (program.requirements) {
              const parsed = JSON.parse(program.requirements);
              if (Array.isArray(parsed)) {
                features = parsed;
              } else if (typeof parsed === 'object') {
                features = Object.values(parsed);
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
            image_url: program.image_url || getPlaceholderImage(program.id),
            features: features,
            status: program.status
          };
        });

        setPrograms(formattedPrograms);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching programs:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPrograms();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Academic Programs</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of academic programs designed to nurture talent and foster excellence.
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
            <p>No programs available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program) => (
              <Card key={program.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  {program.image_url ? (
                    <img
                      src={program.image_url}
                      alt={program.title}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                  {program.duration && (
                    <Badge className="absolute top-4 right-4">
                      {program.duration}
                    </Badge>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{program.title}</h3>
                    {program.duration && (
                      <p className="text-white/75 text-sm mt-1">{program.duration}</p>
                    )}
                  </div>
                </div>

                <CardContent className="pt-6">
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

export default Programs;
