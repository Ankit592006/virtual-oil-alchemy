import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Users, Mail, GraduationCap, UserCircle } from "lucide-react";

const Students = () => {
  // Add your group details here
  const groupInfo = {
    projectTitle: "Biodiesel Production from Castor Oil using Methanol",
    institution: "Your Institution Name",
    department: "Department of Chemistry",
    year: "2024-2025",
  };

  // Add your team members here
  const teamMembers = [
    {
      name: "Student Name 1",
      role: "Team Leader",
      email: "student1@example.com",
      responsibilities: "Project coordination and documentation",
    },
    {
      name: "Student Name 2",
      role: "Research Analyst",
      email: "student2@example.com",
      responsibilities: "Literature review and experimental design",
    },
    {
      name: "Student Name 3",
      role: "Lab Specialist",
      email: "student3@example.com",
      responsibilities: "Conducting experiments and data collection",
    },
    {
      name: "Student Name 4",
      role: "Data Analyst",
      email: "student4@example.com",
      responsibilities: "Data analysis and result interpretation",
    },
  ];

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
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-primary mb-2">Project Title</h3>
              <p className="text-muted-foreground">{groupInfo.projectTitle}</p>
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
              <p className="text-muted-foreground">{groupInfo.year}</p>
            </div>
          </div>
        </Card>

        {/* Team Members */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-secondary" />
            <h2 className="text-2xl font-bold">Team Members</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6 glass-effect hover:scale-105 transition-transform">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserCircle className="w-10 h-10 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">
                        {member.email}
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground">{member.responsibilities}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <Card className="p-8 glass-effect text-center">
          <h3 className="text-xl font-semibold mb-4">Customize This Page</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            To update the team information, edit the groupInfo and teamMembers arrays in the Students.tsx file.
            You can add or remove team members and customize all the details to match your actual project group.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Students;
