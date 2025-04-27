
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Settings, 
  Calendar, 
  Users, 
  Database, 
  LogOut, 
  Plus, 
  FileChartLine 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: FileText },
    { name: "Cattle Entry", href: "/cattle-entry", icon: Plus },
    { name: "Livestock Management", href: "/livestock", icon: Database },
    { name: "Feeding Schedule", href: "/feeding-schedule", icon: Calendar },
    { name: "Reports", href: "/reports", icon: FileChartLine },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className={cn(
      "flex flex-col h-full bg-sidebar transition-all duration-300 border-r border-sidebar-border",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
          {collapsed ? (
            <span className="font-bold text-2xl text-sidebar-foreground">HF</span>
          ) : (
            <span className="font-bold text-2xl text-sidebar-foreground">HerdFlow AI</span>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className={cn("ml-auto text-sidebar-foreground", collapsed ? "hidden" : "")}
        >
          {collapsed ? <Users /> : <Users />}
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-2">
        <Link to="/logout" className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
          collapsed ? "justify-center" : ""
        )}>
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
}
