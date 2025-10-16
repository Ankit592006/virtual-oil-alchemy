import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Plus, X } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string | null;
  responsibilities: string[] | null;
}

const TeamManager = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast.error("Failed to fetch team members");
    } else {
      setMembers(data || []);
    }
  };

  const handleAddResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
  };

  const handleRemoveResponsibility = (index: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index] = value;
    setResponsibilities(newResponsibilities);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const filteredResponsibilities = responsibilities.filter(r => r.trim() !== "");
      
      const { error } = await supabase
        .from("team_members")
        .insert([{
          name,
          role,
          email: email || null,
          responsibilities: filteredResponsibilities,
        }]);

      if (error) throw error;

      toast.success("Team member added!");
      setName("");
      setRole("");
      setEmail("");
      setResponsibilities([""]);
      fetchMembers();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("team_members").delete().eq("id", id);
      if (error) throw error;
      toast.success("Member deleted");
      fetchMembers();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Add Team Member</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="member-name">Name</Label>
            <Input
              id="member-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <Label htmlFor="member-role">Role</Label>
            <Input
              id="member-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              placeholder="Project Lead"
            />
          </div>

          <div>
            <Label htmlFor="member-email">Email</Label>
            <Input
              id="member-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Responsibilities</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddResponsibility}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {responsibilities.map((resp, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={resp}
                  onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                  placeholder="Project coordination"
                />
                {responsibilities.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveResponsibility(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Team Member"}
          </Button>
        </form>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {members.map((member) => (
          <Card key={member.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                {member.email && (
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                )}
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(member.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            {member.responsibilities && member.responsibilities.length > 0 && (
              <ul className="list-disc list-inside text-sm">
                {member.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamManager;
