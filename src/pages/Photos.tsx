import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Photo {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
}

const Photos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast.error("Failed to load photos");
    } else {
      setPhotos(data || []);
    }
  };

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

        {photos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden glass-effect hover:scale-105 transition-transform">
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{photo.title}</h3>
                  <p className="text-sm text-muted-foreground">{photo.description}</p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 glass-effect text-center">
            <p className="text-lg text-muted-foreground">
              No photos yet. Login to the admin panel to add photos.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Photos;
