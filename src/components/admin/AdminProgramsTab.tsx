
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, Search } from "lucide-react";

// Mock data for programs
const initialPrograms = [
  {
    id: "1",
    name: "Elementary Education",
    level: "Elementary",
    description: "Comprehensive elementary education for grades K-5.",
    features: ["Core curriculum", "Arts integration", "Physical education"],
  },
  {
    id: "2",
    name: "Middle School STEM",
    level: "Middle School",
    description: "Focused STEM program for middle school students with advanced math and science.",
    features: ["Advanced Math", "Science Labs", "Technology Integration"],
  },
  {
    id: "3",
    name: "High School College Prep",
    level: "High School",
    description: "College preparatory program for high school students aiming for university admission.",
    features: ["AP Courses", "College Counseling", "Research Projects"],
  },
];

const AdminProgramsTab = () => {
  const [programs, setPrograms] = useState(initialPrograms);
  const [isAddingProgram, setIsAddingProgram] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProgram, setEditingProgram] = useState<null | {
    id: string;
    name: string;
    level: string;
    description: string;
    features: string[];
  }>(null);

  const [newProgram, setNewProgram] = useState({
    name: "",
    level: "",
    description: "",
    features: "",
  });

  const handleAddProgram = () => {
    const features = newProgram.features
      .split(",")
      .map((feature) => feature.trim())
      .filter((feature) => feature !== "");

    const program = {
      id: Date.now().toString(),
      name: newProgram.name,
      level: newProgram.level,
      description: newProgram.description,
      features,
    };

    setPrograms([...programs, program]);
    setNewProgram({
      name: "",
      level: "",
      description: "",
      features: "",
    });
    setIsAddingProgram(false);
  };

  const handleEditProgram = () => {
    if (!editingProgram) return;

    const updatedPrograms = programs.map((program) =>
      program.id === editingProgram.id ? editingProgram : program
    );

    setPrograms(updatedPrograms);
    setEditingProgram(null);
  };

  const handleDeleteProgram = (id: string) => {
    setPrograms(programs.filter((program) => program.id !== id));
  };

  const filteredPrograms = programs.filter((program) =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                value={newProgram.name}
                onChange={(e) =>
                  setNewProgram({ ...newProgram, name: e.target.value })
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
                value={editingProgram.name}
                onChange={(e) =>
                  setEditingProgram({ ...editingProgram, name: e.target.value })
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
                value={editingProgram.features.join(", ")}
                onChange={(e) => {
                  const features = e.target.value
                    .split(",")
                    .map((feature) => feature.trim())
                    .filter((feature) => feature !== "");
                  setEditingProgram({ ...editingProgram, features });
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPrograms.map((program) => (
          <Card key={program.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{program.name}</CardTitle>
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
                  {program.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProgramsTab;
