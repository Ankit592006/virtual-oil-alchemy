import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface GroupInfo {
  id: string;
  project_title: string;
  institution: string;
  department: string;
  academic_year: string;
}

const GroupInfoManager = () => {
  const [info, setInfo] = useState<GroupInfo | null>(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    const { data, error } = await supabase
      .from("group_info")
      .select("*")
      .single();
    
    if (error && error.code !== 'PGRST116') {
      toast.error("Failed to fetch group info");
    } else if (data) {
      setInfo(data);
      setProjectTitle(data.project_title);
      setInstitution(data.institution);
      setDepartment(data.department);
      setAcademicYear(data.academic_year);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (info) {
        const { error } = await supabase
          .from("group_info")
          .update({
            project_title: projectTitle,
            institution,
            department,
            academic_year: academicYear,
          })
          .eq("id", info.id);

        if (error) throw error;
        toast.success("Group info updated!");
      } else {
        const { error } = await supabase
          .from("group_info")
          .insert([{
            project_title: projectTitle,
            institution,
            department,
            academic_year: academicYear,
          }]);

        if (error) throw error;
        toast.success("Group info created!");
      }
      
      fetchInfo();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Update Group Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="project-title">Project Title</Label>
          <Input
            id="project-title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            required
            placeholder="Biodiesel Production from Castor Oil"
          />
        </div>
        
        <div>
          <Label htmlFor="institution">Institution</Label>
          <Input
            id="institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            required
            placeholder="Your University Name"
          />
        </div>

        <div>
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            placeholder="Chemical Engineering"
          />
        </div>

        <div>
          <Label htmlFor="academic-year">Academic Year</Label>
          <Input
            id="academic-year"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            required
            placeholder="2024-2025"
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : info ? "Update Information" : "Save Information"}
        </Button>
      </form>
    </Card>
  );
};

export default GroupInfoManager;
