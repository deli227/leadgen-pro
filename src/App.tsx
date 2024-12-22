import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import { Dashboard } from "./pages/Dashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Auth } from "./pages/Auth";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { toast } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Component to handle conversion tracking
const ConversionTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isSuccess = searchParams.get('success') === 'true';
    
    if (isSuccess && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-16817733892/vsRWCKC3nPgZEISCqdM-',
        'transaction_id': ''
      });
      console.log('Conversion event tracked');
    }
  }, [location]);

  return null;
};

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error getting session:", error);
          // Clear any invalid tokens
          await supabase.auth.signOut();
          toast.error("Session expirée, veuillez vous reconnecter");
        } else {
          console.log("Initial session:", session);
          setSession(session);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        toast.error("Erreur de connexion");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
      }
      
      if (event === 'SIGNED_OUT') {
        // Clear any stored tokens and query cache
        queryClient.clear();
        localStorage.removeItem('supabase.auth.token');
        toast.success("Déconnexion réussie");
      } else if (event === 'SIGNED_IN') {
        queryClient.invalidateQueries();
        toast.success("Connexion réussie");
      }
      
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ConversionTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/auth"
              element={
                session ? <Navigate to="/dashboard" /> : <Auth />
              }
            />
            <Route
              path="/dashboard"
              element={
                session ? <Dashboard /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="/admin-dashboard"
              element={<AdminDashboard />}
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;