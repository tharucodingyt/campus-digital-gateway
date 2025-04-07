
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboardTab from "@/components/admin/AdminDashboardTab";
import AdminProgramsTab from "@/components/admin/AdminProgramsTab";
import AdminEventsTab from "@/components/admin/AdminEventsTab";
import AboutSettingsTab from "@/components/admin/AboutSettingsTab";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <AdminLayout 
      title="Admin Dashboard" 
      subtitle="Manage your school's content and settings"
    >
      <Tabs 
        defaultValue="dashboard" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="about">About Page</TabsTrigger>
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
      </Tabs>
    </AdminLayout>
  );
};

export default Admin;
