import { supabase } from "@/integrations/supabase/client"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AuthUI() {
  return (
    <>
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
          <Auth
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
          <Auth
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
    </>
  )
}