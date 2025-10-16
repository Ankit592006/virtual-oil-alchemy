-- Create storage buckets for photos and videos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('photos', 'photos', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('videos', 'videos', true);

-- Create photos table
CREATE TABLE public.photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create videos table
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  is_youtube BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT,
  responsibilities TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create group_info table
CREATE TABLE public.group_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_title TEXT NOT NULL,
  institution TEXT NOT NULL,
  department TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_info ENABLE ROW LEVEL SECURITY;

-- Create policies - Everyone can view
CREATE POLICY "Anyone can view photos" ON public.photos FOR SELECT USING (true);
CREATE POLICY "Anyone can view videos" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Anyone can view team members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Anyone can view group info" ON public.group_info FOR SELECT USING (true);

-- Only authenticated users can insert/update/delete
CREATE POLICY "Authenticated users can insert photos" ON public.photos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update photos" ON public.photos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete photos" ON public.photos FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert videos" ON public.videos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update videos" ON public.videos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete videos" ON public.videos FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert team members" ON public.team_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update team members" ON public.team_members FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete team members" ON public.team_members FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can update group info" ON public.group_info FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert group info" ON public.group_info FOR INSERT TO authenticated WITH CHECK (true);

-- Storage policies for photos bucket
CREATE POLICY "Anyone can view photos" ON storage.objects FOR SELECT USING (bucket_id = 'photos');
CREATE POLICY "Authenticated users can upload photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'photos');
CREATE POLICY "Authenticated users can update photos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'photos');
CREATE POLICY "Authenticated users can delete photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'photos');

-- Storage policies for videos bucket
CREATE POLICY "Anyone can view videos" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
CREATE POLICY "Authenticated users can upload videos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'videos');
CREATE POLICY "Authenticated users can update videos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'videos');
CREATE POLICY "Authenticated users can delete videos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'videos');

-- Insert default group info
INSERT INTO public.group_info (project_title, institution, department, academic_year)
VALUES ('Biodiesel Production from Castor Oil', 'Your University Name', 'Chemical Engineering', '2024-2025');