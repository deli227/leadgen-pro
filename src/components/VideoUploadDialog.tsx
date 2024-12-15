import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const VideoUploadDialog = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifier si le fichier est une vidéo
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier vidéo",
        variant: "destructive",
      });
      return;
    }

    // Vérifier la taille du fichier (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "Erreur",
        description: "La vidéo ne doit pas dépasser 100MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      toast({
        title: "Succès",
        description: "La vidéo a été téléchargée avec succès",
      });

      // Mettre à jour le chemin de la vidéo dans HeroSection
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath);

      // Vous pouvez maintenant utiliser publicUrl comme source de votre vidéo
      console.log("URL de la vidéo:", publicUrl);
      
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du téléchargement",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="w-4 h-4" />
          Ajouter une vidéo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Télécharger une vidéo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className={`
                flex flex-col items-center justify-center w-full h-32
                border-2 border-dashed rounded-lg
                cursor-pointer
                hover:bg-gray-50 dark:hover:bg-gray-800
                transition-colors
                ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  {isUploading ? 'Téléchargement en cours...' : 'Cliquez pour sélectionner une vidéo'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  MP4, WebM ou Ogg (Max. 100MB)
                </p>
              </div>
            </label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};