import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

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
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Mot de passe',
                    button_label: 'Se connecter',
                    loading_button_label: 'Connexion en cours...',
                    social_provider_text: 'Se connecter avec {{provider}}',
                    link_text: "Vous avez déjà un compte ? Connectez-vous",
                  }
                },
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
              localization={{
                variables: {
                  sign_up: {
                    email_label: 'Email',
                    password_label: 'Mot de passe',
                    confirmation_text: 'Confirmer le mot de passe',
                    button_label: "S'inscrire",
                    loading_button_label: 'Inscription en cours...',
                    social_provider_text: "S'inscrire avec {{provider}}",
                    link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
                  }
                },
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}