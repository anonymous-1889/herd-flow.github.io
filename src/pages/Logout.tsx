
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Logout() {
  const { toast } = useToast();
  
  useEffect(() => {
    // Clear user session
    localStorage.removeItem("herdflow-user");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  }, [toast]);
  
  // Redirect to login page
  return <Navigate to="/login" replace />;
}
