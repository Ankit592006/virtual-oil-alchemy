import { useState } from "react";
import LabIntro from "@/components/LabIntro";
import LabWorkspace from "@/components/LabWorkspace";

const Index = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {!started ? (
        <LabIntro onStart={() => setStarted(true)} />
      ) : (
        <LabWorkspace />
      )}
    </div>
  );
};

export default Index;
