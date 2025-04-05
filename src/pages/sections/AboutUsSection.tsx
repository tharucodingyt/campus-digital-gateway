
import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/layout';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface HistoryMilestone {
  year: string;
  event: string;
}

interface LeadershipMember {
  id: number;
  name: string;
  position: string;
  image: string;
  message: string;
}

interface AdminTeamMember {
  name: string;
  position: string;
  image: string;
}

interface Department {
  name: string;
  count: string;
}

const AboutUsSection = () => {
  const { section } = useParams();
  const [loading, setLoading] = useState(true);
  const [historyMilestones, setHistoryMilestones] = useState<HistoryMilestone[]>([]);
  const [leadership, setLeadership] = useState<LeadershipMember[]>([]);
  const [adminTeam, setAdminTeam] = useState<AdminTeamMember[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [schoolInfo, setSchoolInfo] = useState({
    schoolName: "Campus Digital Gateway",
    tagline: "Empowering Young Minds Since 1995",
  });
  
  useEffect(() => {
    fetchSectionContent();
  }, [section]);

  const fetchSectionContent = async () => {
    setLoading(true);
    try {
      // Fetch content based on section
      const { data: aboutData, error } = await supabase
        .from('about_content')
        .select('*')
        .eq('status', 'published');
      
      if (error) {
        console.error("Error fetching about page content:", error);
        setLoading(false);
        return;
      }
      
      // Process data based on the section
      if (aboutData && aboutData.length > 0) {
        if (section === 'history') {
          const historyContent = aboutData.find(item => item.title === 'History');
          if (historyContent && historyContent.content) {
            try {
              const parsedHistory = JSON.parse(historyContent.content);
              if (Array.isArray(parsedHistory)) {
                setHistoryMilestones(parsedHistory);
              }
            } catch (e) {
              console.error('Failed to parse history content:', e);
            }
          }
        } else if (section === 'leadership') {
          const leadershipContent = aboutData.find(item => item.title === 'Leadership');
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
        } else if (section === 'teams') {
          const adminContent = aboutData.find(item => item.title === 'Admin Team');
          if (adminContent && adminContent.content) {
            try {
              const parsedAdminTeam = JSON.parse(adminContent.content);
              if (Array.isArray(parsedAdminTeam)) {
                setAdminTeam(parsedAdminTeam);
              }
            } catch (e) {
              console.error('Failed to parse admin team content:', e);
            }
          }
        } else if (section === 'faculty') {
          const departmentsContent = aboutData.find(item => item.title === 'Faculty');
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
        } else if (!section) {
          // Get general info when no specific section is provided
          const generalInfo = aboutData.find(item => item.title === 'General');
          if (generalInfo && generalInfo.content) {
            try {
              const parsedInfo = JSON.parse(generalInfo.content);
              setSchoolInfo({
                schoolName: parsedInfo.schoolName || schoolInfo.schoolName,
                tagline: parsedInfo.tagline || schoolInfo.tagline,
              });
            } catch (e) {
              console.error('Failed to parse general info content:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching section data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to About Us page if section is invalid
  const validSections = ['history', 'leadership', 'teams', 'faculty'];
  if (section && !validSections.includes(section)) {
    return <Navigate to="/about" replace />;
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-school-primary" />
          <span className="ml-2">Loading content...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {section === 'history' && (
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="section-heading text-center">History of {schoolInfo.schoolName}</h2>
            <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
              {schoolInfo.tagline}
            </p>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-school-accent"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {historyMilestones.map((milestone, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-center">
                      <div className="bg-school-primary text-white font-bold py-2 px-4 rounded-md z-10">
                        {milestone.year}
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {section === 'leadership' && (
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <h2 className="section-heading text-center mb-6">Messages from Leadership</h2>
            <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
              Messages from our Principal, Vice Principal, MD, and Chairman
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {leadership.map((leader) => (
                <div key={leader.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img
                        className="h-48 w-full md:h-full md:w-48 object-cover"
                        src={leader.image}
                        alt={leader.name}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-school-primary">{leader.name}</h3>
                      <p className="text-school-secondary font-medium mb-4">{leader.position}</p>
                      <p className="text-gray-600 italic">{leader.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {section === 'teams' && (
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="section-heading text-center mb-6">Our Teams</h2>
            <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
              Meet our administrative and support staff
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {adminTeam.map((member, index) => (
                <div key={index} className="bg-gray-50 rounded-lg overflow-hidden text-center shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-school-primary">{member.name}</h3>
                    <p className="text-gray-600">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {section === 'faculty' && (
        <section className="py-12 bg-school-accent">
          <div className="container-custom">
            <h2 className="section-heading text-center mb-6">Our Faculty</h2>
            <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
              Explore our teaching departments and faculty members
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-school-primary mb-2">{dept.name}</h3>
                  <p className="text-gray-600">{dept.count}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default AboutUsSection;
