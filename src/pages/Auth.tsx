import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Erreur lors de la vérification de la session:", error);
        toast.error("Erreur de connexion");
      }
      if (session) {
        navigate("/dashboard");
      }
      setIsLoading(false);
    };

    // Vérifie si nous sommes dans un processus de confirmation d'email
    const confirmEmail = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      
      if (type === 'email_confirmation' && token_hash) {
        setIsConfirming(true);
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: 'email_confirmation',
          });
          
          if (error) throw error;
          
          // Met à jour le statut de confirmation dans la table profiles
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ email_confirmed: true })
            .eq('id', (await supabase.auth.getUser()).data.user?.id);
          
          if (updateError) throw updateError;
          
          toast.success("Email confirmé avec succès !");
          navigate("/dashboard");
        } catch (error) {
          console.error("Erreur lors de la confirmation de l'email:", error);
          toast.error("Erreur lors de la confirmation de l'email");
        } finally {
          setIsConfirming(false);
        }
      }
    };

    checkSession();
    confirmEmail();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Changement d'état d'authentification:", event, session);
      if (event === 'PASSWORD_RECOVERY') {
        toast.info("Veuillez réinitialiser votre mot de passe");
      } else if (event === 'SIGNED_IN') {
        toast.success("Connexion réussie");
        navigate("/dashboard");
      } else if (event === 'SIGNED_OUT') {
        toast.info("Déconnexion réussie");
      } else if (event === 'USER_UPDATED') {
        toast.success("Profil mis à jour avec succès");
        navigate("/dashboard");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, searchParams]);

  if (isConfirming) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-dark to-[#1A1F2C] flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <h2 className="text-xl font-semibold text-primary-light">Confirmation de votre email en cours...</h2>
          <p className="text-primary-light/70">Veuillez patienter pendant que nous vérifions votre email.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-secondary-dark to-[#1A1F2C]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-dark to-[#1A1F2C] flex flex-col items-center justify-center p-4">
      <Button 
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-lg font-semibold flex items-center gap-2 bg-black/30 hover:bg-black/40 text-white"
      >
        <ArrowLeft className="w-6 h-6" />
        Retour
      </Button>

      <div className="w-full max-w-md bg-black/40 backdrop-blur-lg p-8 rounded-xl border border-primary/20">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
          Bienvenue
        </h1>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/20">
            <TabsTrigger 
              value="login" 
              className="text-white data-[state=inactive]:text-white data-[state=inactive]:bg-transparent"
            >
              Connexion
            </TabsTrigger>
            <TabsTrigger 
              value="signup"
              className="text-white data-[state=inactive]:text-white data-[state=inactive]:bg-transparent"
            >
              Inscription
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <SupabaseAuth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#9b87f5',
                      brandAccent: '#7E69AB',
                      inputText: 'white',
                      inputBackground: 'rgba(255, 255, 255, 0.1)',
                      inputBorder: 'rgba(255, 255, 255, 0.2)',
                      inputLabelText: 'white',
                      inputPlaceholder: 'rgba(255, 255, 255, 0.5)',
                    },
                  }
                },
                className: {
                  input: 'text-white',
                  label: 'text-white',
                  button: 'text-white bg-primary hover:bg-primary-dark',
                }
              }}
              providers={[]}
              view="sign_in"
              showLinks={true}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Mot de passe',
                    button_label: 'Se connecter',
                    loading_button_label: 'Connexion en cours...',
                    social_provider_text: 'Se connecter avec {{provider}}',
                    link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
                  },
                  sign_up: {
                    email_label: 'Email',
                    password_label: 'Mot de passe',
                    button_label: "S'inscrire",
                    loading_button_label: 'Inscription en cours...',
                    social_provider_text: "S'inscrire avec {{provider}}",
                    link_text: "Vous avez déjà un compte ? Connectez-vous",
                    confirmation_text: "Vérifiez vos emails pour confirmer votre inscription"
                  },
                  forgotten_password: {
                    email_label: 'Email',
                    button_label: 'Envoyer les instructions',
                    link_text: 'Mot de passe oublié ?',
                    confirmation_text: 'Vérifiez vos emails pour réinitialiser votre mot de passe'
                  }
                }
              }}
            />
          </TabsContent>
          <TabsContent value="signup">
            <SupabaseAuth
              supabaseClient={supabase}
              view="sign_up"
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#9b87f5',
                      brandAccent: '#7E69AB',
                      inputText: 'white',
                      inputBackground: 'rgba(255, 255, 255, 0.1)',
                      inputBorder: 'rgba(255, 255, 255, 0.2)',
                      inputLabelText: 'white',
                      inputPlaceholder: 'rgba(255, 255, 255, 0.5)',
                    },
                  }
                },
                className: {
                  input: 'text-white',
                  label: 'text-white',
                  button: 'text-white bg-primary hover:bg-primary-dark',
                }
              }}
              providers={[]}
              showLinks={true}
              localization={{
                variables: {
                  sign_up: {
                    email_label: 'Email',
                    password_label: 'Mot de passe',
                    button_label: "S'inscrire",
                    loading_button_label: 'Inscription en cours...',
                    social_provider_text: "S'inscrire avec {{provider}}",
                    link_text: "Vous avez déjà un compte ? Connectez-vous",
                    confirmation_text: "Vérifiez vos emails pour confirmer votre inscription"
                  }
                }
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}