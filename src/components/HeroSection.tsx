import { useEffect, useState } from "react";
import { HeroTitle } from "./hero/HeroTitle";
import { HeroButtons } from "./hero/HeroButtons";
import { HeroFeatures } from "./hero/HeroFeatures";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const HeroSection = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const { data: { publicUrl } } = supabase.storage
          .from('videos')
          .getPublicUrl('hero-background.mp4');
        
        // Verify if the video exists by making a HEAD request
        const response = await fetch(publicUrl, { method: 'HEAD' });
        if (response.ok) {
          setVideoUrl(publicUrl);
          console.log("Video URL loaded:", publicUrl);
        } else {
          console.error("Video not found at URL:", publicUrl);
          toast.error("Erreur lors du chargement de la vidéo");
        }
      } catch (error) {
        console.error("Error fetching video URL:", error);
        toast.error("Erreur lors du chargement de la vidéo");
      } finally {
        setIsVideoLoading(false);
      }
    };

    fetchVideoUrl();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {isVideoLoading ? (
        <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-900" />
      ) : videoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.5)" }}
        >
          <source src={videoUrl} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-900" />
      )}
      
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <HeroTitle />
        <HeroButtons />
        <HeroFeatures />
      </div>
    </section>
  );
};