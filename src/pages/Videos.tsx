import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Video {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  is_youtube: boolean;
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast.error("Failed to load videos");
    } else {
      setVideos(data || []);
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

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

        {videos.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden glass-effect hover:scale-105 transition-transform">
                <div className="aspect-video">
                  {video.is_youtube ? (
                    <iframe
                      src={getYouTubeEmbedUrl(video.video_url)}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={video.video_url}
                      controls
                      className="w-full h-full"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">{video.description}</p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 glass-effect text-center">
            <p className="text-lg text-muted-foreground">
              No videos yet. Login to the admin panel to add videos.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Videos;
