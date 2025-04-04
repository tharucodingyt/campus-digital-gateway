
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Program {
  id: string;
  title: string;
  level: string;
  description: string;
  features: string[];
  created_at?: string;
  updated_at?: string;
}

const AdminProgramsTab = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isAddingProgram, setIsAddingProgram] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [newProgram, setNewProgram] = useState({
    title: "",
    level: "",
    description: "",
    features: "",
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching programs:", error);
        toast({
          title: "Error",
          description: "Failed to fetch programs. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const formattedPrograms = data.map(program => {
        // Extract features from requirements field
        let features: string[] = [];
        try {
          if (program.requirements) {
            const parsed = JSON.parse(program.requirements);
            if (Array.isArray(parsed)) {
              features = parsed;
            } else if (typeof parsed === 'object') {
              features = Object.values(parsed);
            }
          }
        } catch (e) {
          // If requirements isn't valid JSON, treat it as comma-separated
          if (typeof program.requirements === 'string') {
            features = program.requirements.split(',').map(item => item.trim());
          }
        }
        
        return {
          id: program.id,
          title: program.title,
          level: program.duration || "",
          description: program.description,
          features: features
        };
      });
      
      setPrograms(formattedPrograms);
    } catch (error) {
      console.error("Error fetching programs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch programs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProgram = async () => {
    try {
      const features = newProgram.features
        .split(",")
        .map((feature) => feature.trim())
        .filter((feature) => feature !== "");

      const { data, error } = await supabase.from('programs').insert([
        {
          title: newProgram.title,
          description: newProgram.description,
          duration: newProgram.level,
          requirements: JSON.stringify(features), // Store features as JSON string in requirements field
          status: 'published'
        }
      ]).select();

      if (error) {
        console.error("Error adding program:", error);
        toast({
          title: "Error",
          description: "Failed to add program. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Program added successfully.",
      });

      setNewProgram({
        title: "",
        level: "",
        description: "",
        features: "",
      });
      setIsAddingProgram(false);
      fetchPrograms();
    } catch (error) {
      console.error("Error adding program:", error);
      toast({
        title: "Error",
        description: "Failed to add program. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditProgram = async () => {
    if (!editingProgram) return;

    try {
      let featuresArray: string[] = [];
      
      // Handle different types of features input
      if (typeof editingProgram.features === 'string') {
        featuresArray = editingProgram.features
          .split(",")
          .map((feature) => feature.trim())
          .filter((feature) => feature !== "");
      } else if (Array.isArray(editingProgram.features)) {
        featuresArray = editingProgram.features;
      }

      const { error } = await supabase
        .from('programs')
        .update({
          title: editingProgram.title,
          description: editingProgram.description,
          duration: editingProgram.level,
          requirements: JSON.stringify(featuresArray) // Store as JSON string
        })
        .eq('id', editingProgram.id);

      if (error) {
        console.error("Error updating program:", error);
        toast({
          title: "Error",
          description: "Failed to update program. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Program updated successfully.",
      });

      setEditingProgram(null);
      fetchPrograms();
    } catch (error) {
      console.error("Error updating program:", error);
      toast({
        title: "Error",
        description: "Failed to update program. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProgram = async (id: string) => {
    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting program:", error);
        toast({
          title: "Error",
          description: "Failed to delete program. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Program deleted successfully.",
      });

      fetchPrograms();
    } catch (error) {
      console.error("Error deleting program:", error);
      toast({
        title: "Error",
        description: "Failed to delete program. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredPrograms = programs.filter((program) =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.level?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search programs"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddingProgram(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Program
        </Button>
      </div>

      {isAddingProgram && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Program</CardTitle>
            <CardDescription>Create a new academic program</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Program Name
              </label>
              <Input
                id="name"
                value={newProgram.title}
                onChange={(e) =>
                  setNewProgram({ ...newProgram, title: e.target.value })
                }
                placeholder="e.g., Advanced Mathematics"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="level" className="text-sm font-medium">
                Education Level
              </label>
              <Input
                id="level"
                value={newProgram.level}
                onChange={(e) =>
                  setNewProgram({ ...newProgram, level: e.target.value })
                }
                placeholder="e.g., High School, Middle School, Elementary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                value={newProgram.description}
                onChange={(e) =>
                  setNewProgram({ ...newProgram, description: e.target.value })
                }
                placeholder="Describe the program"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="features" className="text-sm font-medium">
                Features
              </label>
              <Textarea
                id="features"
                value={newProgram.features}
                onChange={(e) =>
                  setNewProgram({ ...newProgram, features: e.target.value })
                }
                placeholder="Enter features separated by commas"
                rows={2}
              />
              <p className="text-xs text-gray-500">
                Enter features separated by commas (e.g., Small class sizes, Expert faculty)
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingProgram(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProgram}>Save Program</Button>
          </CardFooter>
        </Card>
      )}

      {editingProgram && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Program</CardTitle>
            <CardDescription>Update program details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="edit-name" className="text-sm font-medium">
                Program Name
              </label>
              <Input
                id="edit-name"
                value={editingProgram.title}
                onChange={(e) =>
                  setEditingProgram({ ...editingProgram, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-level" className="text-sm font-medium">
                Education Level
              </label>
              <Input
                id="edit-level"
                value={editingProgram.level}
                onChange={(e) =>
                  setEditingProgram({ ...editingProgram, level: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="edit-description"
                value={editingProgram.description}
                onChange={(e) =>
                  setEditingProgram({ ...editingProgram, description: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-features" className="text-sm font-medium">
                Features
              </label>
              <Textarea
                id="edit-features"
                value={Array.isArray(editingProgram.features) 
                  ? editingProgram.features.join(", ")
                  : editingProgram.features}
                onChange={(e) => {
                  setEditingProgram({ 
                    ...editingProgram, 
                    features: e.target.value 
                  });
                }}
                rows={2}
              />
              <p className="text-xs text-gray-500">
                Enter features separated by commas
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setEditingProgram(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditProgram}>Update Program</Button>
          </CardFooter>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center py-10">
          <p>Loading programs...</p>
        </div>
      ) : filteredPrograms.length === 0 ? (
        <div className="text-center py-10">
          <p>No programs found. Create your first program by clicking "Add Program" above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPrograms.map((program) => (
            <Card key={program.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{program.title}</CardTitle>
                    <CardDescription>{program.level}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingProgram(program)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteProgram(program.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">{program.description}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-2">Features:</h4>
                  <ul className="list-disc list-inside text-sm">
                    {program.features && program.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProgramsTab;
