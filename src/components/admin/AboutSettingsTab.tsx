
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AboutSettingsTab = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // History section data
  const [history, setHistory] = useState([
    { year: '1995', event: 'Founded with a vision to provide quality education' },
    { year: '2000', event: 'Expanded to include secondary education' },
    { year: '2005', event: 'Added science and technical streams' },
    { year: '2010', event: 'Opened new campus with modern facilities' },
    { year: '2015', event: 'Celebrated 20 years of educational excellence' },
    { year: '2020', event: 'Launched digital learning initiatives' },
  ]);
  
  // Leadership section data
  const [leadership, setLeadership] = useState([
    {
      id: 1,
      name: 'Dr. Robert Johnson',
      position: 'Principal',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
      message: 'Our mission is to provide a nurturing environment where students can develop intellectually, emotionally, and socially.'
    },
    {
      id: 2,
      name: 'Prof. Amanda Carter',
      position: 'Vice Principal',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
      message: 'Academic excellence is at the core of our philosophy.'
    },
    {
      id: 3,
      name: 'Mr. David Thompson',
      position: 'Managing Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      message: 'Our investment in quality infrastructure ensures that we remain at the forefront of educational excellence.'
    },
    {
      id: 4,
      name: 'Dr. Elizabeth Chen',
      position: 'Chairman',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
      message: 'Education is the foundation of society. Our commitment is to shape responsible citizens.'
    },
  ]);
  
  // Admin team data
  const [adminTeam, setAdminTeam] = useState([
    { name: 'Michael Robertson', position: 'Administrative Director', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7' },
    { name: 'Sarah Williams', position: 'Admissions Coordinator', image: 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6' },
    { name: 'James Parker', position: 'Finance Manager', image: 'https://images.unsplash.com/photo-1602459816722-c364d7797af7' },
    { name: 'Jessica Thompson', position: 'Student Counselor', image: 'https://images.unsplash.com/photo-1611432579699-484f7990b127' },
  ]);
  
  // Faculty departments data
  const [departments, setDepartments] = useState([
    { name: 'Science Department', count: '12 Faculty Members' },
    { name: 'Mathematics Department', count: '8 Faculty Members' },
    { name: 'Languages Department', count: '10 Faculty Members' },
    { name: 'Social Studies Department', count: '6 Faculty Members' },
    { name: 'Computer Science Department', count: '5 Faculty Members' },
    { name: 'Arts and Music Department', count: '7 Faculty Members' },
    { name: 'Physical Education Department', count: '4 Faculty Members' },
  ]);

  // Fetch content from database
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const { data: aboutContent, error } = await supabase
          .from('about_content')
          .select('*');
          
        if (error) throw error;
        
        if (aboutContent) {
          // Parse and set history
          const historyContent = aboutContent.find(item => item.title === 'History');
          if (historyContent && historyContent.content) {
            try {
              const parsedHistory = JSON.parse(historyContent.content);
              if (Array.isArray(parsedHistory)) {
                setHistory(parsedHistory);
              }
            } catch (e) {
              console.error('Failed to parse history content:', e);
            }
          }
          
          // Parse and set leadership
          const leadershipContent = aboutContent.find(item => item.title === 'Leadership');
          if (leadershipContent && leadershipContent.content) {
            try {
              const parsedLeadership = JSON.parse(leadershipContent.content);
              if (Array.isArray(parsedLeadership)) {
                setLeadership(parsedLeadership);
              }
            } catch (e) {
              console.error('Failed to parse leadership content:', e);
            }
          }
          
          // Parse and set admin team
          const adminContent = aboutContent.find(item => item.title === 'Admin Team');
          if (adminContent && adminContent.content) {
            try {
              const parsedAdmin = JSON.parse(adminContent.content);
              if (Array.isArray(parsedAdmin)) {
                setAdminTeam(parsedAdmin);
              }
            } catch (e) {
              console.error('Failed to parse admin content:', e);
            }
          }
          
          // Parse and set departments
          const departmentsContent = aboutContent.find(item => item.title === 'Faculty');
          if (departmentsContent && departmentsContent.content) {
            try {
              const parsedDepartments = JSON.parse(departmentsContent.content);
              if (Array.isArray(parsedDepartments)) {
                setDepartments(parsedDepartments);
              }
            } catch (e) {
              console.error('Failed to parse departments content:', e);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching about content:', error);
        toast({
          title: "Error",
          description: "Failed to fetch about page content",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [toast]);

  // Add new history milestone
  const addHistoryMilestone = () => {
    setHistory([...history, { year: '', event: '' }]);
  };

  // Remove history milestone
  const removeHistoryMilestone = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
  };

  // Update history milestone
  const updateHistoryMilestone = (index, field, value) => {
    const newHistory = [...history];
    newHistory[index] = { ...newHistory[index], [field]: value };
    setHistory(newHistory);
  };

  // Add new leadership member
  const addLeadershipMember = () => {
    setLeadership([
      ...leadership,
      {
        id: Date.now(),
        name: '',
        position: '',
        image: '',
        message: ''
      }
    ]);
  };

  // Remove leadership member
  const removeLeadershipMember = (id) => {
    setLeadership(leadership.filter(member => member.id !== id));
  };

  // Update leadership member
  const updateLeadershipMember = (id, field, value) => {
    setLeadership(leadership.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  // Add new admin team member
  const addAdminMember = () => {
    setAdminTeam([...adminTeam, { name: '', position: '', image: '' }]);
  };

  // Remove admin team member
  const removeAdminMember = (index) => {
    const newAdminTeam = [...adminTeam];
    newAdminTeam.splice(index, 1);
    setAdminTeam(newAdminTeam);
  };

  // Update admin team member
  const updateAdminMember = (index, field, value) => {
    const newAdminTeam = [...adminTeam];
    newAdminTeam[index] = { ...newAdminTeam[index], [field]: value };
    setAdminTeam(newAdminTeam);
  };

  // Add new department
  const addDepartment = () => {
    setDepartments([...departments, { name: '', count: '' }]);
  };

  // Remove department
  const removeDepartment = (index) => {
    const newDepartments = [...departments];
    newDepartments.splice(index, 1);
    setDepartments(newDepartments);
  };

  // Update department
  const updateDepartment = (index, field, value) => {
    const newDepartments = [...departments];
    newDepartments[index] = { ...newDepartments[index], [field]: value };
    setDepartments(newDepartments);
  };

  // Save settings
  const saveSettings = async (section) => {
    setSaving(true);
    
    try {
      let content;
      let title;
      
      switch (section) {
        case 'history':
          content = JSON.stringify(history);
          title = 'History';
          break;
        case 'leadership':
          content = JSON.stringify(leadership);
          title = 'Leadership';
          break;
        case 'admin':
          content = JSON.stringify(adminTeam);
          title = 'Admin Team';
          break;
        case 'faculty':
          content = JSON.stringify(departments);
          title = 'Faculty';
          break;
        default:
          throw new Error('Invalid section');
      }
      
      // Check if content exists
      const { data: existingContent } = await supabase
        .from('about_content')
        .select('id')
        .eq('title', title)
        .single();
      
      if (existingContent) {
        // Update existing content
        const { error } = await supabase
          .from('about_content')
          .update({
            content,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingContent.id);
        
        if (error) throw error;
      } else {
        // Insert new content
        const { error } = await supabase
          .from('about_content')
          .insert({
            title,
            content,
            status: 'published',
          });
        
        if (error) throw error;
      }
      
      toast({
        title: "Success",
        description: `${section.charAt(0).toUpperCase() + section.slice(1)} settings have been updated.`,
      });
    } catch (error) {
      console.error(`Error saving ${section} settings:`, error);
      toast({
        title: "Error",
        description: `Failed to save ${section} settings.`,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="history">
        <TabsList className="w-full">
          <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
          <TabsTrigger value="leadership" className="flex-1">Leadership</TabsTrigger>
          <TabsTrigger value="admin" className="flex-1">Administrative Team</TabsTrigger>
          <TabsTrigger value="faculty" className="flex-1">Faculty</TabsTrigger>
        </TabsList>
        
        {/* History Timeline Settings */}
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>History Timeline</CardTitle>
              <CardDescription>Configure the history milestones displayed on the About page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {history.map((milestone, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center border-b pb-4">
                  <div className="col-span-2">
                    <label htmlFor={`year-${index}`} className="text-sm font-medium block mb-1">
                      Year
                    </label>
                    <Input
                      id={`year-${index}`}
                      value={milestone.year}
                      onChange={(e) => updateHistoryMilestone(index, 'year', e.target.value)}
                    />
                  </div>
                  <div className="col-span-9">
                    <label htmlFor={`event-${index}`} className="text-sm font-medium block mb-1">
                      Event
                    </label>
                    <Input
                      id={`event-${index}`}
                      value={milestone.event}
                      onChange={(e) => updateHistoryMilestone(index, 'event', e.target.value)}
                    />
                  </div>
                  <div className="col-span-1 pt-7">
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => removeHistoryMilestone(index)}
                      disabled={history.length <= 1}
                    >
                      X
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={addHistoryMilestone}
                  className="mt-2"
                >
                  Add Milestone
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => saveSettings('history')}
                disabled={saving}
              >
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save History Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Leadership Settings */}
        <TabsContent value="leadership" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Leadership Team</CardTitle>
              <CardDescription>Configure the leadership team displayed on the About page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {leadership.map((leader) => (
                <div key={leader.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{leader.name || 'New Leader'}</h3>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeLeadershipMember(leader.id)}
                      disabled={leadership.length <= 1}
                    >
                      Remove
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor={`name-${leader.id}`} className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id={`name-${leader.id}`}
                        value={leader.name}
                        onChange={(e) => updateLeadershipMember(leader.id, 'name', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor={`position-${leader.id}`} className="text-sm font-medium">
                        Position
                      </label>
                      <Input
                        id={`position-${leader.id}`}
                        value={leader.position}
                        onChange={(e) => updateLeadershipMember(leader.id, 'position', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor={`image-${leader.id}`} className="text-sm font-medium">
                      Image URL
                    </label>
                    <Input
                      id={`image-${leader.id}`}
                      value={leader.image}
                      onChange={(e) => updateLeadershipMember(leader.id, 'image', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor={`message-${leader.id}`} className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id={`message-${leader.id}`}
                      value={leader.message}
                      onChange={(e) => updateLeadershipMember(leader.id, 'message', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={addLeadershipMember}
                >
                  Add Leadership Member
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => saveSettings('leadership')}
                disabled={saving}
              >
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Leadership Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Admin Team Settings */}
        <TabsContent value="admin" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Administrative Team</CardTitle>
              <CardDescription>Configure the administrative team displayed on the About page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {adminTeam.map((member, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">{member.name || 'New Member'}</h3>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removeAdminMember(index)}
                        disabled={adminTeam.length <= 1}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor={`admin-name-${index}`} className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id={`admin-name-${index}`}
                        value={member.name}
                        onChange={(e) => updateAdminMember(index, 'name', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor={`admin-position-${index}`} className="text-sm font-medium">
                        Position
                      </label>
                      <Input
                        id={`admin-position-${index}`}
                        value={member.position}
                        onChange={(e) => updateAdminMember(index, 'position', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor={`admin-image-${index}`} className="text-sm font-medium">
                        Image URL
                      </label>
                      <Input
                        id={`admin-image-${index}`}
                        value={member.image}
                        onChange={(e) => updateAdminMember(index, 'image', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button 
                  variant="outline" 
                  onClick={addAdminMember}
                >
                  Add Team Member
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => saveSettings('admin')}
                disabled={saving}
              >
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Admin Team Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Faculty Settings */}
        <TabsContent value="faculty" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Departments</CardTitle>
              <CardDescription>Configure the faculty departments displayed on the About page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {departments.map((dept, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center border-b pb-4">
                  <div className="col-span-5">
                    <label htmlFor={`dept-name-${index}`} className="text-sm font-medium block mb-1">
                      Department Name
                    </label>
                    <Input
                      id={`dept-name-${index}`}
                      value={dept.name}
                      onChange={(e) => updateDepartment(index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="col-span-6">
                    <label htmlFor={`dept-count-${index}`} className="text-sm font-medium block mb-1">
                      Faculty Count
                    </label>
                    <Input
                      id={`dept-count-${index}`}
                      value={dept.count}
                      onChange={(e) => updateDepartment(index, 'count', e.target.value)}
                    />
                  </div>
                  <div className="col-span-1 pt-7">
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => removeDepartment(index)}
                      disabled={departments.length <= 1}
                    >
                      X
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={addDepartment}
                  className="mt-2"
                >
                  Add Department
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => saveSettings('faculty')}
                disabled={saving}
              >
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Faculty Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AboutSettingsTab;
