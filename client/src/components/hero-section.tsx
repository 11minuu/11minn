import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Crosshair, Globe, CheckCircle, Edit } from "lucide-react";

interface HeroSectionProps {
  userLocation: {
    lat: number;
    lng: number;
    address: string;
    accuracy: number;
  } | null;
}

export default function HeroSection({ userLocation }: HeroSectionProps) {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-8 logo-glow">
          <svg width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 15L85 40L85 75L15 75L15 40L50 15Z" fill="hsl(190 100% 40%)" opacity="0.3"/>
            <path d="M50 20L80 42L80 70L20 70L20 42L50 20Z" fill="hsl(190 100% 50%)" opacity="0.5"/>
            <circle cx="50" cy="50" r="22" stroke="hsl(190 100% 70%)" strokeWidth="3" fill="hsl(197 59% 10%)"/>
            <line x1="50" y1="50" x2="50" y2="35" stroke="hsl(190 100% 70%)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="50" y1="50" x2="62" y2="50" stroke="hsl(190 100% 70%)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        <h1 className="text-7xl md:text-8xl font-black mb-4">
          <span className="gradient-text">11 MIN</span>
        </h1>
        <p className="text-2xl md:text-3xl font-light mb-3 text-accent">Fast DELIVERY</p>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Anywhere. Anytime. Anything. Ultra-precise delivery to your exact location in just 11 minutes.
        </p>

        {userLocation && (
          <div className="mb-8 inline-flex items-center space-x-3 bg-secondary px-6 py-3 rounded-full" data-testid="location-status">
            <CheckCircle className="text-primary" size={24} />
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Delivering to</div>
              <div className="font-semibold">{userLocation.address}</div>
            </div>
            <button className="text-primary hover:text-accent transition-colors">
              <Edit size={20} />
            </button>
          </div>
        )}

        <Button className="px-10 py-6 bg-primary text-primary-foreground hover:shadow-cyan-glow-lg transition-all inline-flex items-center space-x-3 hover-lift text-xl font-bold" data-testid="button-start-delivery">
          <span>Start Your Delivery</span>
          <ArrowRight size={24} />
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="bg-card rounded-xl p-6 hover-lift">
            <div className="w-14 h-14 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Zap className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">11 Minute Guarantee</h3>
            <p className="text-muted-foreground">Lightning-fast delivery or your money back</p>
          </div>

          <div className="bg-card rounded-xl p-6 hover-lift">
            <div className="w-14 h-14 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Crosshair className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Centimeter Precision</h3>
            <p className="text-muted-foreground">High-accuracy GPS tracking to your exact spot</p>
          </div>

          <div className="bg-card rounded-xl p-6 hover-lift">
            <div className="w-14 h-14 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Globe className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Deliver Everywhere</h3>
            <p className="text-muted-foreground">Coverage in every corner of the city</p>
          </div>
        </div>
      </div>
    </section>
  );
}
