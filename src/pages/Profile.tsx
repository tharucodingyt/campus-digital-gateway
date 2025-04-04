import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

interface ProfileData {
  full_name?: string;
  avatar_url?: string;
}

const Profile = () => {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  async function fetchProfile() {
    try {
      setLoading(true);
      
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single() as any;

      if (error) {
        console.error('Error fetching profile:', error);
      } else if (data) {
        setProfileData({
          full_name: data.full_name || "",
          avatar_url: data.avatar_url || "",
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profileData.full_name,
          avatar_url: profileData.avatar_url,
          updated_at: new Date().toISOString(),
        }) as any;

      if (error) {
        toast({
          title: "Error updating profile",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message || "An error occurred while updating your profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  if (!isLoading && !user) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
      </div>

      <Tabs defaultValue="info">
        <TabsList className="w-full mb-8">
          <TabsTrigger value="info" className="flex-1">Profile Information</TabsTrigger>
          <TabsTrigger value="password" className="flex-1">Change Password</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile information here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-gray-100"
                />
                <p className="text-sm text-gray-500">Your email cannot be changed.</p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={profileData.full_name || ""}
                  onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="avatar" className="block text-sm font-medium">
                  Avatar URL
                </label>
                <Input
                  id="avatar"
                  type="text"
                  value={profileData.avatar_url || ""}
                  onChange={(e) => setProfileData({ ...profileData, avatar_url: e.target.value })}
                  placeholder="Enter URL for your avatar image"
                />
              </div>
              
              {profileData.avatar_url && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={profileData.avatar_url}
                    alt="Avatar preview"
                    className="w-24 h-24 rounded-full object-cover border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={updateProfile} 
                disabled={loading}
                className="w-full"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="password">
          <PasswordChangeCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const PasswordChangeCard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  async function updatePassword() {
    if (passwords.password !== passwords.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (passwords.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password should be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase.auth.updateUser({
        password: passwords.password,
      });

      if (error) {
        toast({
          title: "Error updating password",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Password updated",
          description: "Your password has been updated successfully.",
        });
        setPasswords({ password: "", confirmPassword: "" });
      }
    } catch (error: any) {
      toast({
        title: "Error updating password",
        description: error.message || "An error occurred while updating your password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Update your password here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            New Password
          </label>
          <Input
            id="password"
            type="password"
            value={passwords.password}
            onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
            placeholder="Enter your new password"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Confirm New Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={passwords.confirmPassword}
            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
            placeholder="Confirm your new password"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={updatePassword} 
          disabled={loading}
          className="w-full"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Profile;
