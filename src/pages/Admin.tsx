
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboardTab from "@/components/admin/AdminDashboardTab";
import AdminProgramsTab from "@/components/admin/AdminProgramsTab";
import AdminEventsTab from "@/components/admin/AdminEventsTab";
import AboutSettingsTab from "@/components/admin/AboutSettingsTab";
import AdminAdmissionsTab from "@/components/admin/AdminAdmissionsTab";
import AdminContactMessagesTab from "@/components/admin/AdminContactMessagesTab";

const Admin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "dashboard");

  // Update active tab when URL param changes
  useEffect(() => {
    if (tabParam && ["dashboard", "programs", "events", "about", "admissions", "messages"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Update URL when active tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  return (
    <AdminLayout 
      title="Admin Dashboard" 
      subtitle="Manage your school's content and settings"
    >
      <Tabs 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="about">About Page</TabsTrigger>
          <TabsTrigger value="admissions">Admissions</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4">
          <AdminDashboardTab />
        </TabsContent>
        
        <TabsContent value="programs" className="space-y-4">
          <AdminProgramsTab />
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          <AdminEventsTab />
        </TabsContent>
        
        <TabsContent value="about" className="space-y-4">
          <AboutSettingsTab />
        </TabsContent>
        
        <TabsContent value="admissions" className="space-y-4">
          <AdminAdmissionsTab />
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-4">
          <AdminContactMessagesTab />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Admin;
