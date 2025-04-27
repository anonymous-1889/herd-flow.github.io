
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export function AppLayout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="page-container">
          <Outlet />
        </div>
      </main>
      <Toaster />
      <Sonner />
    </div>
  );
}
