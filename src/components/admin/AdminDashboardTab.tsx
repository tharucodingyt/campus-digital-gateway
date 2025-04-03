
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Users, BookOpen, Calendar } from "lucide-react";

const AdminDashboardTab = () => {
  // This would typically fetch real data from your backend
  const stats = [
    {
      title: "Total Programs",
      value: "12",
      change: "+2 this month",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Active Events",
      value: "8",
      change: "+3 this week",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Registered Users",
      value: "246",
      change: "+12% from last month",
      icon: <Users className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="p-2 bg-gray-100 rounded-md">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 flex items-center">
                {stat.change}
                <ArrowUpRight className="h-3 w-3 ml-1 text-green-500" />
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions taken in the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-blue-100 p-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New Event Created</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-green-100 p-2">
                  <BookOpen className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Program Updated</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-purple-100 p-2">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New User Registered</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="cursor-pointer rounded-lg bg-gray-100 p-4 text-center hover:bg-gray-200 transition-colors">
                <BookOpen className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Add Program</p>
              </div>
              <div className="cursor-pointer rounded-lg bg-gray-100 p-4 text-center hover:bg-gray-200 transition-colors">
                <Calendar className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Create Event</p>
              </div>
              <div className="cursor-pointer rounded-lg bg-gray-100 p-4 text-center hover:bg-gray-200 transition-colors">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Manage Users</p>
              </div>
              <div className="cursor-pointer rounded-lg bg-gray-100 p-4 text-center hover:bg-gray-200 transition-colors">
                <ArrowUpRight className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">View Website</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardTab;
