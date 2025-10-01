import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { requestHighPrecisionLocation } from "@/lib/geolocation";
import { MapPin, Shield } from "lucide-react";

interface LocationModalProps {
  onLocationGranted: (location: {
    lat: number;
    lng: number;
    address: string;
    accuracy: number;
  }) => void;
}

export default function LocationModal({ onLocationGranted }: LocationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleEnableLocation = async () => {
    setIsLoading(true);
    try {
      const location = await requestHighPrecisionLocation();
      
      toast({
        title: "Location Enabled",
        description: `High-precision location enabled! Accuracy: ±${location.accuracy.toFixed(2)}m`,
      });

      onLocationGranted(location);
    } catch (error: any) {
      toast({
        title: "Location Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
      <div className="bg-card rounded-2xl shadow-cyan-glow-lg max-w-md w-full p-8 relative">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mb-6 pulse-animation">
            <MapPin className="text-4xl text-primary" size={40} />
          </div>
          
          <h2 className="text-3xl font-bold mb-4 gradient-text">Enable Precise Location</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            We need your exact location to provide ultra-fast delivery. We use high-precision GPS to ensure your delivery arrives exactly where you are.
          </p>

          <div className="bg-secondary bg-opacity-50 rounded-lg p-4 mb-6 text-sm">
            <div className="flex items-start space-x-3">
              <Shield className="text-primary mt-1" size={20} />
              <div className="text-left">
                <p className="font-semibold text-foreground mb-1">Your Privacy Matters</p>
                <p className="text-muted-foreground">We only use your location for delivery purposes and never share it with third parties.</p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleEnableLocation}
            disabled={isLoading}
            className="w-full py-6 bg-primary text-primary-foreground hover:shadow-cyan-glow-lg transition-all mb-3 text-lg font-bold"
            data-testid="button-enable-location"
          >
            <MapPin className="mr-2" size={20} />
            {isLoading ? "Getting Location..." : "Enable High-Precision Location"}
          </Button>
          
          <Button
            variant="ghost"
            className="w-full py-3 text-muted-foreground hover:text-foreground"
            data-testid="button-manual-location"
          >
            Enter address manually instead
          </Button>
        </div>
      </div>
    </div>
  );
}
