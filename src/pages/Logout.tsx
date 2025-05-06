
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Logout() {
  const { toast } = useToast();
  
  useEffect(() => {
    const signOut = async () => {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    };
    
    signOut();
  }, [toast]);
  
  // Redirect to login page
  return <Navigate to="/login" replace />;
}
