import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { User, Session } from "@supabase/supabase-js";
import PhotosManager from "@/components/admin/PhotosManager";
import VideosManager from "@/components/admin/VideosManager";
import TeamManager from "@/components/admin/TeamManager";
import GroupInfoManager from "@/components/admin/GroupInfoManager";

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your content</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="team">Team Members</TabsTrigger>
            <TabsTrigger value="info">Group Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="photos">
            <PhotosManager />
          </TabsContent>
          
          <TabsContent value="videos">
            <VideosManager />
          </TabsContent>
          
          <TabsContent value="team">
            <TeamManager />
          </TabsContent>
          
          <TabsContent value="info">
            <GroupInfoManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
