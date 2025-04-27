
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, ToggleLeft, ToggleRight } from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailReports, setEmailReports] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    farm: "",
  });
  
  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem("herdflow-user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setProfile({
        name: parsed.name || "",
        email: parsed.email || "",
        farm: parsed.farm || "My Farm",
      });
    }
  }, []);
  
  const saveProfile = () => {
    // Save profile data
    const userData = localStorage.getItem("herdflow-user");
    if (userData) {
      const parsed = JSON.parse(userData);
      const updated = { ...parsed, ...profile };
      localStorage.setItem("herdflow-user", JSON.stringify(updated));
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved",
      });
    }
  };
  
  const saveNotificationSettings = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated",
    });
  };
  
  return (
    <div>
      <h1 className="page-heading">Settings</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your personal and farm information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={profile.name} 
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profile.email} 
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farm">Farm Name</Label>
                  <Input 
                    id="farm" 
                    value={profile.farm} 
                    onChange={(e) => setProfile({...profile, farm: e.target.value})}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={saveProfile}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how HerdFlow AI looks for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Theme</Label>
                    <div className="text-sm text-muted-foreground">
                      Choose your preferred theme
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant={theme === 'light' ? 'default' : 'outline'}
                      size="icon" 
                      onClick={() => setTheme('light')}
                    >
                      <Sun className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant={theme === 'dark' ? 'default' : 'outline'}
                      size="icon" 
                      onClick={() => setTheme('dark')}
                    >
                      <Moon className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">System Preference</Label>
                    <div className="text-sm text-muted-foreground">
                      Follow your system's theme preference
                    </div>
                  </div>
                  <Button 
                    variant={theme === 'system' ? 'default' : 'outline'}
                    onClick={() => setTheme('system')}
                  >
                    Use System Theme
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how you receive notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive alerts about important events
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {notificationsEnabled ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                    <Switch
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Reports</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive weekly summary reports by email
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {emailReports ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                    <Switch
                      checked={emailReports}
                      onCheckedChange={setEmailReports}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={saveNotificationSettings}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
