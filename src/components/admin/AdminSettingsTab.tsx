
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save } from "lucide-react";

const AdminSettingsTab = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  const [generalSettings, setGeneralSettings] = useState({
    schoolName: "Campus Digital Gateway",
    tagline: "Empowering Young Minds Since 1995",
    phoneNumber: "+1 (555) 123-4567",
    email: "info@campusdigital.edu",
    address: "123 Education Way, Knowledge City, CA 90210",
  });

  const [socialSettings, setSocialSettings] = useState({
    facebookUrl: "https://facebook.com/campusdigital",
    twitterUrl: "https://twitter.com/campusdigital",
    instagramUrl: "https://instagram.com/campusdigital",
    youtubeUrl: "https://youtube.com/campusdigital",
    linkedinUrl: "https://linkedin.com/school/campusdigital",
  });

  const [footerSettings, setFooterSettings] = useState({
    copyrightText: "© 2025 Campus Digital Gateway. All rights reserved.",
    aboutText: "We are a leading educational institution dedicated to providing quality education and building future leaders."
  });

  const handleSaveSettings = (settingsType: string) => {
    setSaving(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setSaving(false);
      
      toast({
        title: "Settings saved",
        description: `${settingsType} settings have been updated successfully.`,
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="w-full">
          <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
          <TabsTrigger value="social" className="flex-1">Social Media</TabsTrigger>
          <TabsTrigger value="footer" className="flex-1">Footer</TabsTrigger>
          <TabsTrigger value="seo" className="flex-1">SEO</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Update your school's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="schoolName" className="text-sm font-medium">
                  School Name
                </label>
                <Input
                  id="schoolName"
                  value={generalSettings.schoolName}
                  onChange={(e) =>
                    setGeneralSettings({ ...generalSettings, schoolName: e.target.value })
                  }
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="tagline" className="text-sm font-medium">
                  Tagline
                </label>
                <Input
                  id="tagline"
                  value={generalSettings.tagline}
                  onChange={(e) =>
                    setGeneralSettings({ ...generalSettings, tagline: e.target.value })
                  }
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  value={generalSettings.phoneNumber}
                  onChange={(e) =>
                    setGeneralSettings({ ...generalSettings, phoneNumber: e.target.value })
                  }
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={generalSettings.email}
                  onChange={(e) =>
                    setGeneralSettings({ ...generalSettings, email: e.target.value })
                  }
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>
                <Textarea
                  id="address"
                  value={generalSettings.address}
                  onChange={(e) =>
                    setGeneralSettings({ ...generalSettings, address: e.target.value })
                  }
                  rows={2}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSaveSettings('General')}
                disabled={saving}
              >
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {saving ? "Saving..." : "Save Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="social" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Configure your social media links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="facebook" className="text-sm font-medium">
                  Facebook URL
                </label>
                <Input
                  id="facebook"
                  value={socialSettings.facebookUrl}
                  onChange={(e) =>
                    setSocialSettings({ ...socialSettings, facebookUrl: e.target.value })
                  }
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="twitter" className="text-sm font-medium">
                  Twitter URL
                </label>
                <Input
                  id="twitter"
                  value={socialSettings.twitterUrl}
                  onChange={(e) =>
                    setSocialSettings({ ...socialSettings, twitterUrl: e.target.value })
                  }
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="instagram" className="text-sm font-medium">
                  Instagram URL
                </label>
                <Input
                  id="instagram"
                  value={socialSettings.instagramUrl}
                  onChange={(e) =>
                    setSocialSettings({ ...socialSettings, instagramUrl: e.target.value })
                  }
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="youtube" className="text-sm font-medium">
                  YouTube URL
                </label>
                <Input
                  id="youtube"
                  value={socialSettings.youtubeUrl}
                  onChange={(e) =>
                    setSocialSettings({ ...socialSettings, youtubeUrl: e.target.value })
                  }
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="linkedin" className="text-sm font-medium">
                  LinkedIn URL
                </label>
                <Input
                  id="linkedin"
                  value={socialSettings.linkedinUrl}
                  onChange={(e) =>
                    setSocialSettings({ ...socialSettings, linkedinUrl: e.target.value })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSaveSettings('Social media')}
                disabled={saving}
              >
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {saving ? "Saving..." : "Save Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="footer" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Footer Settings</CardTitle>
              <CardDescription>Configure the information displayed in your website footer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="copyright" className="text-sm font-medium">
                  Copyright Text
                </label>
                <Input
                  id="copyright"
                  value={footerSettings.copyrightText}
                  onChange={(e) =>
                    setFooterSettings({ ...footerSettings, copyrightText: e.target.value })
                  }
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="footerAbout" className="text-sm font-medium">
                  About Text
                </label>
                <Textarea
                  id="footerAbout"
                  value={footerSettings.aboutText}
                  onChange={(e) =>
                    setFooterSettings({ ...footerSettings, aboutText: e.target.value })
                  }
                  rows={3}
                />
                <p className="text-xs text-gray-500">
                  This text appears in the "About Us" section of the footer.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSaveSettings('Footer')}
                disabled={saving}
              >
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {saving ? "Saving..." : "Save Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Configure search engine optimization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="metaTitle" className="text-sm font-medium">
                  Meta Title
                </label>
                <Input
                  id="metaTitle"
                  placeholder="Campus Digital Gateway - Excellence in Education"
                />
                <p className="text-xs text-gray-500">
                  Appears in browser tabs and search engine results.
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="metaDescription" className="text-sm font-medium">
                  Meta Description
                </label>
                <Textarea
                  id="metaDescription"
                  placeholder="Campus Digital Gateway is a premier educational institution dedicated to academic excellence and holistic development."
                  rows={3}
                />
                <p className="text-xs text-gray-500">
                  A brief description of your school that appears in search engine results.
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="keywords" className="text-sm font-medium">
                  Keywords
                </label>
                <Textarea
                  id="keywords"
                  placeholder="education, school, learning, academic excellence, campus"
                  rows={2}
                />
                <p className="text-xs text-gray-500">
                  Comma-separated keywords related to your institution.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSaveSettings('SEO')}
                disabled={saving}
              >
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {saving ? "Saving..." : "Save Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettingsTab;
