
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export function AuthGuard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("herdflow-user");
    setIsAuthenticated(!!user);
  }, []);

  // If authentication state is still loading
  if (isAuthenticated === null) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
}
