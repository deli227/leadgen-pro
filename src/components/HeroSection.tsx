import { useEffect, useState } from "react";
import { HeroTitle } from "./hero/HeroTitle";
import { HeroButtons } from "./hero/HeroButtons";
import { HeroFeatures } from "./hero/HeroFeatures";
import { supabase } from "@/integrations/supabase/client";

export const HeroSection = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl('hero-background.mp4');
      setVideoUrl(publicUrl);
    };

    fetchVideoUrl();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {videoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.4)" }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black to-gray-900" />
      )}
      
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <HeroTitle />
        <HeroButtons />
        <HeroFeatures />
      </div>
    </section>
  );
};