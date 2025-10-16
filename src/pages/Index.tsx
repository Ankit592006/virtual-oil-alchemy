import { useState } from "react";
import Navbar from "@/components/Navbar";
import LabIntro from "@/components/LabIntro";
import LabWorkspace from "@/components/LabWorkspace";

const Index = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {!started ? (
        <LabIntro onStart={() => setStarted(true)} />
      ) : (
        <LabWorkspace />
      )}
    </div>
  );
};

export default Index;
