import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface NavigationProps {
  userLocation: {
    lat: number;
    lng: number;
    address: string;
    accuracy: number;
  } | null;
}

export default function Navigation({ userLocation }: NavigationProps) {
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="logo-glow">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 15L85 40L85 75L15 75L15 40L50 15Z" fill="hsl(190 100% 40%)" opacity="0.3"/>
                <path d="M50 20L80 42L80 70L20 70L20 42L50 20Z" fill="hsl(190 100% 50%)" opacity="0.5"/>
                <circle cx="50" cy="50" r="22" stroke="hsl(190 100% 70%)" strokeWidth="3" fill="hsl(197 59% 10%)"/>
                <line x1="50" y1="50" x2="50" y2="35" stroke="hsl(190 100% 70%)" strokeWidth="3" strokeLinecap="round"/>
                <line x1="50" y1="50" x2="62" y2="50" stroke="hsl(190 100% 70%)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="text-2xl font-black gradient-text">11MIN</div>
              <div className="text-xs text-muted-foreground -mt-1">Fast Delivery</div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
            <a href="#tracking" className="text-foreground hover:text-primary transition-colors">Track Order</a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
            <a href="#dashboard" className="text-foreground hover:text-primary transition-colors">Dashboard</a>
            {user && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground" data-testid="text-username">
                  {user.username}
                </span>
                <Button 
                  onClick={handleLogout} 
                  variant="ghost" 
                  size="sm"
                  className="text-foreground hover:text-primary"
                  disabled={logoutMutation.isPending}
                  data-testid="button-logout"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>

          <Button variant="ghost" className="md:hidden text-foreground" data-testid="button-menu">
            <Menu size={24} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
