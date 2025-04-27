
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("herdflow-user");
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-farm-green-100 dark:bg-farm-green-700">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-farm-green-600 dark:text-farm-green-300">HerdFlow AI</h1>
        <p className="text-xl text-farm-brown-600 dark:text-farm-brown-200">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default Index;
