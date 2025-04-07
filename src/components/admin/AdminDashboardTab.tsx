
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Users, BookOpen, Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboardTab = () => {
  const [stats, setStats] = useState({
    totalPrograms: "0",
    activeEvents: "0",
    registeredUsers: "0",
    loading: true
  });
  
  useEffect(() => {
    async function fetchStats() {
      try {
        // Get program count
        const { count: programCount } = await supabase
          .from('programs')
          .select('*', { count: 'exact', head: true });
        
        // Get active events count (events with future dates)
        const { count: eventCount } = await supabase
          .from('news_events')
          .select('*', { count: 'exact', head: true })
          .eq('is_event', true)
          .gte('event_date', new Date().toISOString());
        
        // Get users count
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        setStats({
          totalPrograms: programCount?.toString() || "0",
          activeEvents: eventCount?.toString() || "0",
          registeredUsers: userCount?.toString() || "0",
          loading: false
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    }
    
    fetchStats();
  }, []);

  // Process stats to display
  const displayStats = [
    {
      title: "Total Programs",
      value: stats.totalPrograms,
      change: stats.loading ? "Loading..." : `${stats.totalPrograms} total`,
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Active Events",
      value: stats.activeEvents,
      change: stats.loading ? "Loading..." : `${stats.activeEvents} upcoming`,
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Registered Users",
      value: stats.registeredUsers,
      change: stats.loading ? "Loading..." : `Total registrations`,
      icon: <Users className="h-5 w-5" />,
    },
  ];

  // Recent activity from the database
  const [recentActivity, setRecentActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    async function fetchRecentActivity() {
      try {
        // Get most recent events/updates
        const { data: recentEvents } = await supabase
          .from('news_events')
          .select('title, created_at, is_event')
          .order('created_at', { ascending: false })
          .limit(3);
        
        // Get most recent programs
        const { data: recentPrograms } = await supabase
          .from('programs')
          .select('title, created_at')
          .order('created_at', { ascending: false })
          .limit(3);
        
        // Combine and sort by date
        const combinedActivity = [
          ...(recentEvents || []).map(event => ({
            type: event.is_event ? 'event' : 'news',
            title: event.title,
            timestamp: event.created_at,
          })),
          ...(recentPrograms || []).map(program => ({
            type: 'program',
            title: program.title,
            timestamp: program.created_at,
          }))
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 3);
        
        setRecentActivity(combinedActivity);
        setLoadingActivity(false);
      } catch (error) {
        console.error("Error fetching recent activity:", error);
        setLoadingActivity(false);
      }
    }
    
    fetchRecentActivity();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {displayStats.map((stat, index) => (
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
              {stats.loading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500 flex items-center">
                    {stat.change}
                    <ArrowUpRight className="h-3 w-3 ml-1 text-green-500" />
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest additions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingActivity ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`mr-4 rounded-full p-2 ${
                      activity.type === 'event' ? 'bg-blue-100' : 
                      activity.type === 'program' ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      {activity.type === 'event' ? (
                        <Calendar className={`h-4 w-4 ${activity.type === 'event' ? 'text-blue-600' : ''}`} />
                      ) : activity.type === 'program' ? (
                        <BookOpen className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No recent activity found</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => window.location.href = '/admin?tab=programs'} 
                className="cursor-pointer rounded-lg bg-gray-100 p-4 text-center hover:bg-gray-200 transition-colors"
              >
                <BookOpen className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Add Program</p>
              </div>
              <div 
                onClick={() => window.location.href = '/admin?tab=events'} 
                className="cursor-pointer rounded-lg bg-gray-100 p-4 text-center hover:bg-gray-200 transition-colors"
              >
                <Calendar className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Create Event</p>
              </div>
              <div 
                onClick={() => window.location.href = '/admin?tab=about'} 
                className="cursor-pointer rounded-lg bg-gray-100 p-4 text-center hover:bg-gray-200 transition-colors"
              >
                <ArrowUpRight className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Edit About Page</p>
              </div>
              <div 
                onClick={() => window.location.href = '/'}
                className="cursor-pointer rounded-lg bg-gray-100 p-4 text-center hover:bg-gray-200 transition-colors"
              >
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
