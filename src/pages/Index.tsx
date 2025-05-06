
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
      
      setIsLoading(false);
    };
    
    checkAuthStatus();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-farm-green-100 dark:bg-farm-green-700">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-farm-green-600 dark:text-farm-green-300">HerdFlow AI</h1>
        <p className="text-xl text-farm-brown-600 dark:text-farm-brown-200">
          {isLoading ? "Redirecting..." : "Welcome to HerdFlow"}
        </p>
      </div>
    </div>
  );
};

export default Index;
