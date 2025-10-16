import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Upload } from "lucide-react";

interface Photo {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
}

const PhotosManager = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast.error("Failed to fetch photos");
    } else {
      setPhotos(data || []);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setLoading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("photos")
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from("photos")
        .insert([{ title, description, image_url: publicUrl }]);

      if (dbError) throw dbError;

      toast.success("Photo uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
      fetchPhotos();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      const path = imageUrl.split("/").pop();
      if (path) {
        await supabase.storage.from("photos").remove([path]);
      }

      const { error } = await supabase.from("photos").delete().eq("id", id);
      
      if (error) throw error;
      
      toast.success("Photo deleted");
      fetchPhotos();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Upload New Photo</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <Label htmlFor="photo-title">Title</Label>
            <Input
              id="photo-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Biodiesel Production Setup"
            />
          </div>
          
          <div>
            <Label htmlFor="photo-desc">Description</Label>
            <Input
              id="photo-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Complete laboratory setup"
            />
          </div>

          <div>
            <Label htmlFor="photo-file">Image File</Label>
            <Input
              id="photo-file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <Button type="submit" disabled={loading}>
            <Upload className="mr-2 h-4 w-4" />
            {loading ? "Uploading..." : "Upload Photo"}
          </Button>
        </form>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden">
            <img
              src={photo.image_url}
              alt={photo.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-1">{photo.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{photo.description}</p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(photo.id, photo.image_url)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PhotosManager;
