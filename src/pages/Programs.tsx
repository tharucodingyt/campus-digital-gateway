
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  category?: string;
}

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Image placeholder options for fallback
  const placeholderImages = [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80'
  ];

  // Program categories
  const programCategories = [
    { value: "all", label: "All Programs" },
    { value: "technical", label: "Technical Programs" },
    { value: "science", label: "Science Programs" },
    { value: "general", label: "General Education" },
    { value: "primary", label: "Primary Education" },
    { value: "secondary", label: "Secondary Education" },
  ];

  // Get a random image placeholder based on program id
  const getPlaceholderImage = (id: string) => {
    // Use the last character of the id as a simple hash
    const lastChar = id.slice(-1);
    const index = parseInt(lastChar, 16) % placeholderImages.length;
    return placeholderImages[index];
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

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

      setPrograms(formattedPrograms);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching programs:", err);
    } finally {
      setIsLoading(false);
    }
  }

  // Filter programs by category
  const filteredPrograms = activeCategory && activeCategory !== 'all'
    ? programs.filter(program => program.category === activeCategory)
    : programs;

  return (
    <Layout>
      {/* Hero Banner Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <div className="container mx-auto py-16 px-4 relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Academic Programs
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Whole child development programs with phonics and progressive pedagogy
            </p>
            <Button className="bg-white text-orange-600 hover:bg-orange-100">
              Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-end">
            <img 
              src="/lovable-uploads/3d6de585-9b88-499d-a8d5-d4388ecb75a4.png" 
              alt="School Programs"
              className="rounded-lg shadow-lg max-h-60 md:max-h-72 object-cover"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {programCategories.map((category) => (
            <Button
              key={category.value}
              variant={activeCategory === category.value ? "default" : "outline"}
              onClick={() => setActiveCategory(category.value === 'all' ? null : category.value)}
              className="mb-2"
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="text-center mb-12">
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
        ) : filteredPrograms.length === 0 ? (
          <div className="text-center py-10">
            <p>No programs available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredPrograms.map((program) => (
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
                        <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0">
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
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white border-0">
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

export default Programs;
