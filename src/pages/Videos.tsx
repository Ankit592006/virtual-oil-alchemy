import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Upload, Video as VideoIcon } from "lucide-react";

const Videos = () => {
  // Placeholder for custom videos - you can add your own videos here
  const videoPlaceholders = [
    { id: 1, title: "Introduction to Biodiesel Production", description: "Overview of the process" },
    { id: 2, title: "Mixing Raw Materials", description: "Combining castor oil with methanol" },
    { id: 3, title: "Transesterification Reaction", description: "Chemical reaction in progress" },
    { id: 4, title: "Product Separation", description: "Separating biodiesel from glycerol" },
    { id: 5, title: "Quality Analysis", description: "Testing the final product" },
    { id: 6, title: "Safety Procedures", description: "Laboratory safety guidelines" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Product Videos</h1>
          <p className="text-lg text-muted-foreground">
            Video demonstrations of the biodiesel production process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoPlaceholders.map((video) => (
            <Card key={video.id} className="overflow-hidden glass-effect hover:scale-105 transition-transform">
              <div className="aspect-video bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <VideoIcon className="w-16 h-16 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Upload your video here</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{video.title}</h3>
                <p className="text-sm text-muted-foreground">{video.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-12 p-8 glass-effect text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-secondary" />
          <h3 className="text-xl font-semibold mb-2">Add Your Videos</h3>
          <p className="text-muted-foreground mb-4">
            Upload custom videos of your biodiesel production process
          </p>
          <p className="text-sm text-muted-foreground">
            To add your videos, place them in the public folder and update this page with video tags
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Videos;
