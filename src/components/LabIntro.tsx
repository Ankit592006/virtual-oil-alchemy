import { Button } from "@/components/ui/button";
import { Beaker, FlaskConical, TestTube } from "lucide-react";
import labHero from "@/assets/lab-hero.jpg";

interface LabIntroProps {
  onStart: () => void;
}

const LabIntro = ({ onStart }: LabIntroProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={labHero} 
          alt="Chemistry Laboratory" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-background" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
              Virtual Biodiesel Lab
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow-md max-w-3xl mx-auto">
              Experience realistic chemistry as you produce biodiesel from castor oil
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transesterification Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn the chemical reaction that converts vegetable oils into biodiesel fuel using methanol and sodium hydroxide catalyst
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="glass-effect rounded-2xl p-8 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <TestTube className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Step 1: Prepare Reactants</h3>
              <p className="text-muted-foreground">
                Measure and add castor oil, methanol, and NaOH catalyst to the reaction vessel
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                <FlaskConical className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Step 2: Mix & React</h3>
              <p className="text-muted-foreground">
                Stir the mixture at controlled temperature to initiate the transesterification reaction
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <Beaker className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Step 3: Separate Products</h3>
              <p className="text-muted-foreground">
                Allow the mixture to settle and separate biodiesel from glycerol byproduct
              </p>
            </div>
          </div>

          {/* Chemical Equation */}
          <div className="glass-effect rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center">Chemical Equation</h3>
            <div className="text-center font-mono text-lg">
              <div className="mb-2">Triglyceride + 3 Methanol → 3 Biodiesel + Glycerol</div>
              <div className="text-sm text-muted-foreground mt-4">
                (Castor Oil) + CH₃OH + NaOH → Fatty Acid Methyl Esters + C₃H₈O₃
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <Button 
              onClick={onStart}
              size="lg"
              className="text-lg px-12 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Enter Laboratory
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabIntro;
