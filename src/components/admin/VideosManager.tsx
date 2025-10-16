import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Trash2, Upload } from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  is_youtube: boolean;
}

const VideosManager = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isYouTube, setIsYouTube] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast.error("Failed to fetch videos");
    } else {
      setVideos(data || []);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      let finalUrl = videoUrl;

      if (!isYouTube && file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("videos")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("videos")
          .getPublicUrl(filePath);

        finalUrl = publicUrl;
      }

      const { error: dbError } = await supabase
        .from("videos")
        .insert([{ title, description, video_url: finalUrl, is_youtube: isYouTube }]);

      if (dbError) throw dbError;

      toast.success("Video added successfully!");
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setFile(null);
      setIsYouTube(false);
      fetchVideos();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, videoUrl: string, isYouTube: boolean) => {
    try {
      if (!isYouTube) {
        const path = videoUrl.split("/").pop();
        if (path) {
          await supabase.storage.from("videos").remove([path]);
        }
      }

      const { error } = await supabase.from("videos").delete().eq("id", id);
      
      if (error) throw error;
      
      toast.success("Video deleted");
      fetchVideos();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Video</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <Label htmlFor="video-title">Title</Label>
            <Input
              id="video-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Production Process Overview"
            />
          </div>
          
          <div>
            <Label htmlFor="video-desc">Description</Label>
            <Input
              id="video-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Step-by-step biodiesel production"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="youtube"
              checked={isYouTube}
              onCheckedChange={(checked) => setIsYouTube(checked as boolean)}
            />
            <Label htmlFor="youtube">YouTube Video</Label>
          </div>

          {isYouTube ? (
            <div>
              <Label htmlFor="video-url">YouTube URL</Label>
              <Input
                id="video-url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="video-file">Video File</Label>
              <Input
                id="video-file"
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
            </div>
          )}

          <Button type="submit" disabled={loading}>
            <Upload className="mr-2 h-4 w-4" />
            {loading ? "Adding..." : "Add Video"}
          </Button>
        </form>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <Card key={video.id} className="p-4">
            <h3 className="font-semibold mb-1">{video.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
            <p className="text-xs text-muted-foreground mb-2">
              {video.is_youtube ? "YouTube Video" : "Uploaded Video"}
            </p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(video.id, video.video_url, video.is_youtube)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideosManager;
