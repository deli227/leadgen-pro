import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className="min-h-screen bg-gradient-to-br from-secondary-dark to-[#1A1F2C] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/40 backdrop-blur-lg p-8 rounded-xl border border-primary/20">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
          Bienvenue
        </h1>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="signup">Inscription</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <SupabaseAuth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#646cff',
                      brandAccent: '#747bff',
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
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#646cff',
                      brandAccent: '#747bff',
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
                }
              }}
              providers={[]}
              localization={{
                variables: {
                  sign_up: {
                    email_label: 'Email',
                    password_label: 'Mot de passe',
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