import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Users, Mail, GraduationCap, UserCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GroupInfo {
  project_title: string;
  institution: string;
  department: string;
  academic_year: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string | null;
  responsibilities: string[] | null;
}

const Students = () => {
  const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetchGroupInfo();
    fetchTeamMembers();
  }, []);

  const fetchGroupInfo = async () => {
    const { data, error } = await supabase
      .from("group_info")
      .select("*")
      .single();
    
    if (error && error.code !== 'PGRST116') {
      toast.error("Failed to load group info");
    } else if (data) {
      setGroupInfo(data);
    }
  };

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("created_at", { ascending: true });
    
    if (error) {
      toast.error("Failed to load team members");
    } else {
      setTeamMembers(data || []);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Student Details</h1>
          <p className="text-lg text-muted-foreground">
            Meet the team behind this biodiesel production project
          </p>
        </div>

        {/* Project Information */}
        <Card className="mb-8 p-8 glass-effect">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold">Project Information</h2>
          </div>
          {groupInfo ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-primary mb-2">Project Title</h3>
                <p className="text-muted-foreground">{groupInfo.project_title}</p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Institution</h3>
                <p className="text-muted-foreground">{groupInfo.institution}</p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Department</h3>
                <p className="text-muted-foreground">{groupInfo.department}</p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Academic Year</h3>
                <p className="text-muted-foreground">{groupInfo.academic_year}</p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Loading group information...</p>
          )}
        </Card>

        {/* Team Members */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-secondary" />
            <h2 className="text-2xl font-bold">Team Members</h2>
          </div>
          {teamMembers.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id} className="p-6 glass-effect hover:scale-105 transition-transform">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserCircle className="w-10 h-10 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                      {member.email && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">
                            {member.email}
                          </a>
                        </div>
                      )}
                      {member.responsibilities && member.responsibilities.length > 0 && (
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          {member.responsibilities.map((resp, i) => (
                            <li key={i}>{resp}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No team members added yet. Login to admin panel to add members.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Students;
