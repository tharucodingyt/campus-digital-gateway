
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminProgramsTab from "@/components/admin/AdminProgramsTab";
import AdminEventsTab from "@/components/admin/AdminEventsTab";
import AdminDashboardTab from "@/components/admin/AdminDashboardTab";
import AdminUsersTab from "@/components/admin/AdminUsersTab";
import AdminSettingsTab from "@/components/admin/AdminSettingsTab";

const Admin = () => {
  return (
    <AdminLayout 
      title="Admin Dashboard" 
      subtitle="Manage your school website content"
    >
      <Tabs defaultValue="dashboard">
        <TabsList className="grid grid-cols-5 w-full mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="events">Events/News</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <AdminDashboardTab />
        </TabsContent>
        
        <TabsContent value="programs">
          <AdminProgramsTab />
        </TabsContent>
        
        <TabsContent value="events">
          <AdminEventsTab />
        </TabsContent>
        
        <TabsContent value="users">
          <AdminUsersTab />
        </TabsContent>
        
        <TabsContent value="settings">
          <AdminSettingsTab />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Admin;
