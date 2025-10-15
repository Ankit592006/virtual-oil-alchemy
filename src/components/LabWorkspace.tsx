import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Beaker, Droplet, FlaskConical, Play, RotateCcw, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Chemical {
  id: string;
  name: string;
  formula: string;
  color: string;
  amount: number;
}

const LabWorkspace = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [isReacting, setIsReacting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const chemicals: Chemical[] = [
    { id: "castor", name: "Castor Oil", formula: "Triglyceride", color: "bg-amber-300", amount: 0 },
    { id: "ethanol", name: "Ethanol", formula: "C₂H₅OH", color: "bg-blue-200", amount: 0 },
    { id: "naoh", name: "Sodium Hydroxide", formula: "NaOH", color: "bg-gray-200", amount: 0 },
  ];

  const [beakerContents, setBeakerContents] = useState<Chemical[]>([]);

  const steps = [
    { title: "Add Castor Oil", description: "Pour 100ml of castor oil into the reaction vessel" },
    { title: "Add Ethanol", description: "Add 30ml of ethanol to the mixture" },
    { title: "Add NaOH Catalyst", description: "Carefully add 1g of sodium hydroxide" },
    { title: "Mix & React", description: "Stir the mixture and observe the reaction" },
    { title: "Separate Products", description: "Wait for biodiesel and glycerol to separate" },
  ];

  const addChemical = (chemical: Chemical) => {
    if (step >= 3) return;

    const newContents = [...beakerContents, chemical];
    setBeakerContents(newContents);
    setStep(step + 1);

    toast({
      title: `${chemical.name} Added`,
      description: `${chemical.formula} has been added to the reaction vessel`,
    });
  };

  const startReaction = () => {
    if (step !== 3) return;

    setIsReacting(true);
    toast({
      title: "Reaction Started",
      description: "Transesterification is in progress...",
    });

    setTimeout(() => {
      setStep(4);
      setIsReacting(false);
      toast({
        title: "Reaction Complete",
        description: "The mixture is now separating into layers",
      });
    }, 3000);
  };

  const finishExperiment = () => {
    setCompleted(true);
    toast({
      title: "Experiment Complete!",
      description: "You have successfully produced biodiesel from castor oil",
    });
  };

  const reset = () => {
    setStep(0);
    setBeakerContents([]);
    setIsReacting(false);
    setCompleted(false);
  };

  return (
    <div className="min-h-screen py-8 px-6 lab-gradient-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Biodiesel Production Lab</h1>
          <p className="text-muted-foreground">Follow the steps to complete the transesterification process</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{step}/5 steps</span>
          </div>
          <Progress value={(step / 5) * 100} className="h-2" />
        </div>

        {/* Main Workspace */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chemicals Panel */}
          <Card className="p-6 glass-effect">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Droplet className="w-5 h-5" />
              Chemicals
            </h2>
            <div className="space-y-3">
              {chemicals.map((chemical, index) => (
                <Button
                  key={chemical.id}
                  onClick={() => addChemical(chemical)}
                  disabled={step !== index || step >= 3 || completed}
                  variant="outline"
                  className="w-full justify-start h-auto py-4"
                >
                  <div className={`w-8 h-8 rounded-full ${chemical.color} mr-3 flex-shrink-0`} />
                  <div className="text-left">
                    <div className="font-semibold">{chemical.name}</div>
                    <div className="text-xs text-muted-foreground">{chemical.formula}</div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-primary/5 rounded-lg">
              <h3 className="font-semibold mb-2">Current Step:</h3>
              <p className="text-sm">{steps[step]?.description}</p>
            </div>
          </Card>

          {/* Reaction Vessel */}
          <Card className="p-6 glass-effect lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FlaskConical className="w-5 h-5" />
              Reaction Vessel
            </h2>

            {!completed ? (
              <div className="relative">
                {/* Beaker */}
                <div className="relative mx-auto w-64 h-96 border-4 border-foreground/20 rounded-b-3xl overflow-hidden bg-background/50 beaker-glow">
                  {/* Beaker contents */}
                  <div className="absolute bottom-0 w-full space-y-0">
                    {beakerContents.map((chemical, index) => (
                      <div
                        key={index}
                        className={`w-full ${chemical.color} animate-liquid-flow opacity-80`}
                        style={{
                          height: `${100 / 3}px`,
                          animationDelay: `${index * 0.3}s`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Reaction effects */}
                  {isReacting && (
                    <>
                      <div className="absolute inset-0 bg-accent/20 animate-glow-pulse" />
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute bottom-0 w-3 h-3 bg-accent/60 rounded-full animate-bubble-up"
                          style={{
                            left: `${20 + i * 10}%`,
                            animationDelay: `${i * 0.3}s`,
                          }}
                        />
                      ))}
                    </>
                  )}

                  {/* Separation layers */}
                  {step === 4 && (
                    <div className="absolute bottom-0 w-full">
                      <div className="w-full h-32 bg-gradient-to-t from-amber-200 to-amber-300 opacity-70" />
                      <div className="w-full h-20 bg-secondary/40 opacity-70" />
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-foreground/30 animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="mt-8 flex justify-center gap-4">
                  {step === 3 && !isReacting && (
                    <Button
                      onClick={startReaction}
                      size="lg"
                      className="bg-secondary hover:bg-secondary/90"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Reaction
                    </Button>
                  )}

                  {step === 4 && (
                    <Button
                      onClick={finishExperiment}
                      size="lg"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Complete Experiment
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-secondary/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-secondary" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Experiment Complete!</h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                  You have successfully produced biodiesel through the transesterification of castor oil with ethanol using NaOH as a catalyst.
                </p>
                <div className="glass-effect p-6 rounded-xl max-w-md mx-auto mb-8">
                  <h4 className="font-semibold mb-4">Products Obtained:</h4>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span>Biodiesel (FAEE)</span>
                      <span className="font-mono">~90ml</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Glycerol (byproduct)</span>
                      <span className="font-mono">~10ml</span>
                    </div>
                  </div>
                </div>
                <Button onClick={reset} size="lg" variant="outline">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Start New Experiment
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Process Steps */}
        {!completed && (
          <Card className="mt-8 p-6 glass-effect">
            <h2 className="text-xl font-semibold mb-4">Process Steps</h2>
            <div className="grid md:grid-cols-5 gap-4">
              {steps.map((s, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    index < step
                      ? "border-secondary bg-secondary/10"
                      : index === step
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted/30"
                  }`}
                >
                  <div className="font-semibold mb-1">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.description}</div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LabWorkspace;
