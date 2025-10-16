import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Upload, ImagePlus } from "lucide-react";

const Photos = () => {
  // Placeholder for custom photos - you can add your own images here
  const photoPlaceholders = [
    { id: 1, title: "Biodiesel Production Setup", description: "Complete laboratory setup" },
    { id: 2, title: "Raw Materials", description: "Castor oil and methanol" },
    { id: 3, title: "Reaction Process", description: "Transesterification in progress" },
    { id: 4, title: "Product Separation", description: "Biodiesel and glycerol layers" },
    { id: 5, title: "Final Product", description: "Pure biodiesel sample" },
    { id: 6, title: "Quality Testing", description: "Laboratory analysis" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Product Photos</h1>
          <p className="text-lg text-muted-foreground">
            Visual documentation of the biodiesel production process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photoPlaceholders.map((photo) => (
            <Card key={photo.id} className="overflow-hidden glass-effect hover:scale-105 transition-transform">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-center">
                  <ImagePlus className="w-16 h-16 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Upload your photo here</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{photo.title}</h3>
                <p className="text-sm text-muted-foreground">{photo.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-12 p-8 glass-effect text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Add Your Photos</h3>
          <p className="text-muted-foreground mb-4">
            Upload custom photos of your biodiesel production process
          </p>
          <p className="text-sm text-muted-foreground">
            To add your photos, place them in the src/assets folder and update this page
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Photos;
